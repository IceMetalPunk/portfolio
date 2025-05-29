import './GithubCard.css';
export const GithubCard = ({
  projectName,
  repoName,
  description,
}: {
  projectName: string;
  repoName: string;
  description?: string;
}) => {
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
