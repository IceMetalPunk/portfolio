import { Route, Routes } from 'react-router';
import './App.css';
import { Header } from './layout/Header';
import { Sidebar } from './layout/Sidebar';
import { TabFrame } from './tabs/TabFrame';
import { TAB_ROUTES, type TabInfo } from './util/constants';

function App() {
  return (
    <>
      <Header />
      <main>
        <Sidebar />
        <Routes>
          {Object.entries(TAB_ROUTES).map(([path, info]: [string, TabInfo]) => {
            return (
              <Route
                path={path}
                element={
                  <TabFrame
                    projectName={info.projectName}
                    repoName={info.repoName}
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
    </>
  );
}

export default App;
