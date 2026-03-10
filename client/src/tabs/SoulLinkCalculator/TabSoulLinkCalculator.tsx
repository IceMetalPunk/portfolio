import './TabSoulLinkCalculator.css';
import Screenshot from '../../assets/porject_samples/soullink_calculator_screenshot.png';
import { LightboxImage } from '../../util/LightboxImage';

export const TabSoulLinkCalculator = () => {
  return (
    <>
      <p>
        Intended to be used from GitHub Pages:{' '}
        <a
          href='https://icemetalpunk.github.io/SoulLinkCalculator'
          target='_blank'
        >
          Soul Link Calculator
        </a>
      </p>
      <p>
        As explained on the page itself, a Pokémon Soul Link is a specific type
        of challenge people attempt to make their playthroughs of Pokémon games
        more difficult and more collaborative. One particular rule poses a
        combinatorics problem that can make exploring every option nearly
        impossible, so this tool does the math, calculating all possible teams
        for you to track as you play through the games. It even has a feature
        where you can require or exclude any specific pairs you want from the
        calculated teams, allowing you to focus only on teams including your
        desired Pokémon.
      </p>
      <p>
        This uses Web Workers to offload the calculations, which are fairly
        intense (exponential time complexity), without blocking the render
        thread. It stores every entry in Local Storage as an auto-save
        mechanism, while allowing you to export and import to and from JSON for
        more robust save data.
      </p>
      <section className='image-gallery'>
        <LightboxImage
          title='Screenshot'
          src={Screenshot}
          caption='An example with four pairs caught, showing the GUI and the calculations of all possible teams.'
        />
      </section>
    </>
  );
};
