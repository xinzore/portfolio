const fs = require("fs");
const path = require("path");
const https = require("https");

const rootDir = path.resolve(__dirname, "..");
const projectsDir = path.join(rootDir, "src", "projelerim");

const extractRepo = (url) => {
  const match = url.match(/github\.com\/([^/]+)\/([^/#?]+)/i);
  if (!match) return null;
  const owner = match[1];
  const repo = match[2].replace(/\.git$/, "");
  return { owner, repo };
};

const fetchJson = (url, token) =>
  new Promise((resolve, reject) => {
    const headers = {
      "User-Agent": "portfolio-techstacks",
      Accept: "application/vnd.github+json",
    };
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }
    https
      .get(url, { headers }, (res) => {
        let data = "";
        res.on("data", (chunk) => {
          data += chunk;
        });
        res.on("end", () => {
          if (res.statusCode && res.statusCode >= 400) {
            return reject(
              new Error(`GitHub API ${res.statusCode}: ${data}`)
            );
          }
          try {
            resolve(JSON.parse(data));
          } catch (error) {
            reject(error);
          }
        });
      })
      .on("error", reject);
  });

const formatTechstacks = (languages) => {
  const entries = Object.entries(languages || {});
  const total = entries.reduce((sum, [, value]) => sum + value, 0);
  if (!total) return [];

  return entries
    .sort((a, b) => b[1] - a[1])
    .map(([name, value]) => {
      const percent = Math.round((value / total) * 100);
      return `${name} ${percent}%`;
    });
};

const updateProjects = async () => {
  const token = process.env.GITHUB_TOKEN || "";
  const files = fs
    .readdirSync(projectsDir)
    .filter((file) => file.endsWith(".json"));

  for (const file of files) {
    const filePath = path.join(projectsDir, file);
    const data = JSON.parse(fs.readFileSync(filePath, "utf8"));

    if (!data.githubLink) continue;
    const repo = extractRepo(data.githubLink);
    if (!repo) continue;

    const apiUrl = `https://api.github.com/repos/${repo.owner}/${repo.repo}/languages`;
    const languages = await fetchJson(apiUrl, token);
    const techstacks = formatTechstacks(languages);

    if (techstacks.length) {
      data.techstacks = techstacks;
      fs.writeFileSync(filePath, `${JSON.stringify(data, null, 2)}\n`, "utf8");
      console.log(`Updated ${file}`);
    }
  }
};

updateProjects().catch((error) => {
  console.error(error);
  process.exit(1);
});
