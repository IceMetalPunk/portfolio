import './GithubCard.css';
interface GithubCardProps {
  projectName: string;
  repoName: string;
  description?: string;
}
export const GithubCard = ({
  projectName,
  repoName,
  description,
}: GithubCardProps) => {
  return (
    <div className='github-card'>
      <div className='title'>{projectName}</div>
      <a target='_blank' href={`https://github.com/IceMetalPunk/${repoName}`}>
        <img src='github-mark.svg' /> View on GitHub
      </a>
      {description && (
        <>
          <br />
          {description}
        </>
      )}
    </div>
  );
};
