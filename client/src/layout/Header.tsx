import HeaderLogo from '../assets/Portfolio_Logo.png';
import { useEffect, useCallback } from 'react';

export const Header = () => {
  const resizeHeader = useCallback(() => {
    const scrollAmount =
      document.documentElement.scrollTop || document.body.scrollTop;
    const headerSize = scrollAmount > 50 ? '50px' : '150px';
    document.documentElement.style.setProperty('--header-height', headerSize);
  }, []);
  useEffect(() => {
    document.addEventListener('scroll', resizeHeader);
    () => document.removeEventListener('scroll', resizeHeader);
  }, []);
  useEffect(resizeHeader, []);

  return (
    <header>
      <img src={HeaderLogo} />
    </header>
  );
};
