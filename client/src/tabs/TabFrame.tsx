import type { JSX } from 'react';
import { GithubCard } from './GithubCard';

export const TabFrame = ({
  projectName,
  repoName,
  description,
  children,
}: {
  projectName: string;
  repoName: string;
  description?: string;
  children: JSX.Element;
}) => {
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
