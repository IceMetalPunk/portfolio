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
    <section id='main-tab-content'>
      <div className='tab-header'>
        <ProjectCard
          projectName={projectName}
          repoName={repoName}
          description={description}
        />
      </div>
      <div className='tab-body'>{children}</div>
    </section>
  );
};
