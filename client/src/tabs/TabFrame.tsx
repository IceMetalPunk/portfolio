import type { JSX, ReactNode } from 'react';
import { ProjectCard } from './ProjectCard';
import classNames from 'classnames';
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
    <section
      id='main-tab-content'
      className={classNames({
        'has-project': repoName && description,
      })}
    >
      <div className='tab-header'>
        {repoName && description ? (
          <ProjectCard
            projectName={projectName}
            repoName={repoName}
            projectIcon={projectIcon}
            description={description}
          />
        ) : (
          <div>
            <h5 className='basic-title'>
              {projectIcon} {projectName}
            </h5>
          </div>
        )}
      </div>
      <div className='tab-body'>{children}</div>
    </section>
  );
};
