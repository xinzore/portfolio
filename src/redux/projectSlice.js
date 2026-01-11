// src/redux/projectSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const projectModules = import.meta.glob("../projelerim/*.json", {
  eager: true,
});

const toTime = (value) => {
  const time = Date.parse(value);
  return Number.isNaN(time) ? 0 : time;
};

const buildProjects = () => {
  const projects = Object.entries(projectModules).map(([path, module]) => {
    const data = module?.default ?? module;
    const fileName = path.split("/").pop() || "";
    const fallbackId = fileName.replace(/\.json$/, "");

    return {
      id: data?.id ?? fallbackId,
      category: data?.category ?? "",
      title: data?.title ?? "",
      description: data?.description ?? "",
      techstacks: Array.isArray(data?.techstacks) ? data.techstacks : [],
      link: data?.link ?? "#",
      date: data?.date ?? "",
      githubLink: data?.githubLink ?? "",
    };
  });

  return projects.sort((a, b) => toTime(b.date) - toTime(a.date));
};

// Async thunk to fetch projects
export const fetchProjects = createAsyncThunk(
  "projects/fetchProjects",
  async () => {
    return buildProjects();
  }
);

const projectSlice = createSlice({
  name: "projects",
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProjects.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProjects.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchProjects.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default projectSlice.reducer;
