import type { JSX } from 'react';
import { GithubCard } from './GithubCard';

interface TabFrameProps {
  projectName: string;
  repoName: string;
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
      <GithubCard
        projectName={projectName}
        repoName={repoName}
        description={description}
      />
      <br />
      {children}
    </>
  );
};
