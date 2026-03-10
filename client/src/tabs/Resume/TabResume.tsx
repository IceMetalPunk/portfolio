import './TabResume.css';
import Resume from '../../assets/resume.pdf';
import { Link } from 'react-router';

export const TabResume = () => {
  return (
    <>
      <Link to={Resume} target='_blank'>
        View Full PDF
      </Link>
      <br />
      <iframe src={Resume} width={600} height={600}></iframe>
    </>
  );
};
