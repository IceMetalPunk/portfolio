import { Route, Routes } from 'react-router';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Header } from './layout/Header';
import { Sidebar } from './layout/Sidebar';
import { TabFrame } from './tabs/TabFrame';
import { TAB_ROUTES, type TabInfo } from './util/constants';
import { useMemo } from 'react';

function App() {
  const copyrightDateString: string = useMemo(() => {
    const currentYear: number = new Date().getFullYear();
    if (currentYear > 2026) {
      return `2026-${currentYear}`;
    }
    return '2026';
  }, []);

  return (
    <>
      <Header />
      <main>
        <Sidebar />
        <Routes>
          {Object.entries(TAB_ROUTES).map(([path, info]: [string, TabInfo]) => {
            return (
              <Route
                key={path}
                path={path}
                element={
                  <TabFrame
                    projectName={info.projectName}
                    repoName={info.repoName}
                    projectIcon={info.projectIcon}
                    description={info.description}
                  >
                    {info.tab}
                  </TabFrame>
                }
              />
            );
          })}
        </Routes>
      </main>
      <footer>&copy; {copyrightDateString} Kevin Burns</footer>
    </>
  );
}

export default App;
