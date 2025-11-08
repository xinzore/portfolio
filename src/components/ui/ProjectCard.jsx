import React from "react";
import { FaArrowRight } from "react-icons/fa6";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const ProjectCard = ({ projectData }) => {
  const isLoading = !projectData;

  const {
    category = "",
    title = "",
    description = "",
    techstacks = [],
    link = "#",
  } = projectData || {};

  if (isLoading) {
    return (
      <Card className="flex flex-col w-full h-[380px] sm:w-[300px]">
        <CardHeader>
          <Skeleton className="mb-2 h-4 w-20" />
          <Skeleton className="h-7 w-48" />
        </CardHeader>
        <CardContent className="flex-1 overflow-hidden pb-10">
          <Skeleton className="mb-4 h-4 w-full" />
          <Skeleton className="mb-4 h-4 w-5/6" />
          <Skeleton className="mb-4 h-4 w-4/6" />
          <div className={`flex flex-wrap gap-2 mt-4`}>
            {[...Array(3)].map((_, index) => (
              <Skeleton key={index} className="h-6 w-16 " />
            ))}
          </div>
        </CardContent>
        <CardFooter className="flex items-end justify-end mt-auto">
          <Skeleton className="h-10 w-32 rounded-md" />
        </CardFooter>
      </Card>
    );
  }

  return (
    <Card className="flex flex-col w-full h-[380px] sm:w-[300px]">
      <CardHeader>
        <code className="text-xs">{category}</code>
        <h1 className="text-xl  line-clamp-1 font-JetBrains">{title}</h1>
      </CardHeader>
      <CardContent className="flex-1 overflow-hidden pb-10">
        <p className="mb-4 text-xs line-clamp-5 text-justify font-Roboto opacity-75 ">
          {description}
        </p>
        <div
          className={`flex flex-wrap gap-1 font-JetBrains `}
        >
          {techstacks &&
            techstacks.map((tech, index) => (
              <Badge
                key={index}
                className="flex justify-center whitespace-nowrap text-center text-xs "
              >
                {tech}
              </Badge>
            ))}
        </div>
      </CardContent>
      <CardFooter className="flex items-end justify-end mt-auto">
        <a href={link} target="_blank" rel="noopener noreferrer">
          <Button>
            Projeyi Gör <FaArrowRight className="ml-2" size="14px" />
          </Button>
        </a>
      </CardFooter>
    </Card>
  );
};

export default ProjectCard;
