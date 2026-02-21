import './ProjectCard.css';
import Card from 'react-bootstrap/Card';
import type { ReactNode } from 'react';
import { FaGithub } from 'react-icons/fa';

interface ProjectCardProps {
  projectName: string;
  repoName?: string;
  projectIcon?: ReactNode;
  description?: string;
}
export const ProjectCard = ({
  projectName,
  repoName,
  description,
  projectIcon,
}: ProjectCardProps) => {
  return (
    <Card className='project-card'>
      <Card.Header as='h5'>
        {projectIcon} {projectName}
      </Card.Header>
      <Card.Body>
        <Card.Title as='h6'>
          {repoName && (
            <a
              target='_blank'
              href={`https://github.com/IceMetalPunk/${repoName}`}
            >
              <FaGithub className='icon-github' /> View on GitHub
            </a>
          )}
        </Card.Title>
        <Card.Text>{description}</Card.Text>
      </Card.Body>
    </Card>
  );
};
