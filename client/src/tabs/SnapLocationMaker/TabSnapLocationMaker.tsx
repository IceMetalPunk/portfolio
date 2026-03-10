import { Link } from 'react-router';
import './TabSnapLocationMaker.css';
import Screenshot from '../../assets/porject_samples/snaplocation_screenshot.png';
import CounterEarth from '../../assets/porject_samples/Counter-Earth.png';
import { LightboxImage } from '../../util/LightboxImage';

export const TabSnapLocationMaker = () => {
  return (
    <>
      <p>
        Intended to be used from the GitHub Pages link:{' '}
        <Link
          to='https://icemetalpunk.github.io/SnapLocationMaker/'
          target='_blank'
        >
          Marvel Snap Location Maker
        </Link>
        .
      </p>
      <p>
        This small utility was made for fans of the mobile game Marvel Snap who
        are interested in creating custom cards. Online tools already existed
        for making standard cards, but none existed for making Location cards,
        so I made one.
      </p>
      <p>
        It uses HTML5 Canvas, with Javascript for interactivity, with explicit
        touch screen support and FileReader for using local images wihout
        uploading to any server.
      </p>
      <section className='image-gallery'>
        <LightboxImage
          title='GUI Screenshot'
          src={Screenshot}
          caption='Background images can be custom loaded from disk, rescaled, and dragged to position. Everything is composited via Canvas, with a download generated dynamically when ready.'
        />
        <LightboxImage
          title='Resulting Download: Counter-Earth'
          src={CounterEarth}
          caption='This is the image that results from the example screenshot.'
        />
        <LightboxImage
          title='Another Example: Quiet Council'
          src='https://www.dropbox.com/scl/fi/7nv3z3y5kzbcmxg40i6c5/The-Quiet-Council.png?rlkey=21i4xi9p60lmgm4etzoyvfzw5&dl=1'
          caption='A previously-created location using the tool, with one of the other possible fonts that can be chosen.'
        />
      </section>
    </>
  );
};
