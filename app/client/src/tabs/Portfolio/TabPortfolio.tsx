import './TabPortfolio.css';
import { Link } from 'react-router';

export const TabPortfolio = () => {
  return (
    <>
      <p>
        The majority of web development I've done has been for other employers
        (Fiserv, Snider's Formal Wear, etc.), and therefore I do not own it to
        put it on my portfolio. This website itself was made from scratch by me,
        and should serve as an additional example of my skillset on the frontend
        and backend, collectively.
      </p>
      <p>
        Use the ☰ button in the top-left corner to navigate to all my projects'
        details pages.
      </p>
      <p>
        This site was created with Node + Typescript + Express for the backend,
        Postgres (hosted by Supabase) for the data store, and Vite + React +
        Typescript for the frontend.
      </p>
      <p>
        For a list of all my experience, including those projects I can't list
        here, please see <Link to='/resume'>my resumé</Link>.
      </p>
    </>
  );
};
