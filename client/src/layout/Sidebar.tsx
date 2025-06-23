import { useState } from 'react';

export const Sidebar = () => {
  const [sidebarWidth, setSidebarWidth] = useState<number>(0);
  return (
    <section
      id='sidebar'
      style={{ width: `${sidebarWidth}px` }}
      onMouseOver={() => setSidebarWidth(100)}
      onMouseOut={() => setSidebarWidth(0)}
    >
      Sidebar Here
    </section>
  );
};
