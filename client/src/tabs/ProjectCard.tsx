import './ProjectCard.css';
import Card from 'react-bootstrap/Card';
import { useMemo, type ReactNode } from 'react';
import { FaGithub } from 'react-icons/fa';
import { TbExternalLink } from 'react-icons/tb';

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
  const linkNode: ReactNode | null = useMemo(() => {
    if (!repoName) {
      return null;
    }
    if (URL.canParse(repoName)) {
      return (
        <a target='_blank' href={repoName}>
          <TbExternalLink className='icon-github' /> View Project Page
        </a>
      );
    } else {
      return (
        <a target='_blank' href={`https://github.com/IceMetalPunk/${repoName}`}>
          <FaGithub className='icon-github' /> View on GitHub
        </a>
      );
    }
  }, [repoName]);
  return (
    <Card className='project-card'>
      <Card.Header as='h5'>
        {projectIcon} {projectName}
      </Card.Header>
      <Card.Body>
        <Card.Title as='h6'>{linkNode}</Card.Title>
        <Card.Text>{description}</Card.Text>
      </Card.Body>
    </Card>
  );
};
