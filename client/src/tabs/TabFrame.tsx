import type { JSX, ReactNode } from 'react';
import { ProjectCard } from './ProjectCard';
import './TabFrame.css';

interface TabFrameProps {
  projectName: string;
  repoName?: string;
  description?: string;
  projectIcon?: ReactNode;
  children: JSX.Element;
}

export const TabFrame = ({
  projectName,
  repoName,
  description,
  children,
  projectIcon,
}: TabFrameProps) => {
  return (
    <section id='main-tab-content'>
      <div className='tab-header'>
        <ProjectCard
          projectName={projectName}
          repoName={repoName}
          projectIcon={projectIcon}
          description={description}
        />
      </div>
      <div className='tab-body'>{children}</div>
    </section>
  );
};
