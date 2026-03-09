import { LightboxImage } from '../../util/LightboxImage';
import './TabEubert2.css';
// TODO: Lightbox gallery?
export const TabEubert2 = () => {
  return (
    <>
      <p>
        Made in 2020 with GameMaker Studio, for an itch.io Weekly Game Jam with
        the theme "Nothing Stays Forever". A potential theme was "retro", so I
        combined the two in an homage to Q*Bert with the twist of "trying to
        sabotage a sequel out of misguided nostalgia for the original".
      </p>
      <p>
        I did everything for this including all the art (except some cutscene
        clipart), and it's the first time I made game art that wasn't just flat
        2D geometric shapes. It was <em>isometric</em> geometric shapes this
        time!
      </p>
      <section className='image-gallery'>
        <LightboxImage
          title='Menu Screen'
          src='https://img.itch.zone/aW1nLzQwMDA4MjYucG5n/315x250%23c/gxg5hZ.png'
        />
        <LightboxImage
          title='Main Game'
          src='https://img.itch.zone/aW1hZ2UvNzIxNTcyLzQwMDA4NDYucG5n/original/e86HmJ.png'
        />
        <LightboxImage
          title='Configurable Controls'
          src='https://img.itch.zone/aW1hZ2UvNzIxNTcyLzQwMDA4MzMucG5n/original/E%2BjBht.png'
          caption='Eubert 2 Must Die has fully configurable input mapping across keyboard, mouse, and gamepad input types.'
        />
      </section>
    </>
  );
};
