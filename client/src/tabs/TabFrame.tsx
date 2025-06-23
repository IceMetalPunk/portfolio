import type { JSX } from 'react';
import { ProjectCard } from './ProjectCard';

interface TabFrameProps {
  projectName: string;
  repoName?: string;
  description?: string;
  children: JSX.Element;
}

export const TabFrame = ({
  projectName,
  repoName,
  description,
  children,
}: TabFrameProps) => {
  return (
    <>
      <ProjectCard
        projectName={projectName}
        repoName={repoName}
        description={description}
      />
      <br />
      {children}
    </>
  );
};
