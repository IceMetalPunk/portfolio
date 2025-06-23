import './ProjectCard.css';
interface ProjectCardProps {
  projectName: string;
  repoName?: string;
  description?: string;
}
export const ProjectCard = ({
  projectName,
  repoName,
  description,
}: ProjectCardProps) => {
  return (
    <div className='project-card'>
      <div className='title'>{projectName}</div>
      {repoName && (
        <a target='_blank' href={`https://github.com/IceMetalPunk/${repoName}`}>
          <img src='github-mark.svg' /> View on GitHub
        </a>
      )}
      {description && (
        <>
          <br />
          {description}
        </>
      )}
    </div>
  );
};
