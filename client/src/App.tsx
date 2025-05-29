import './App.css';
import { TabSynthiaNova } from './tabs/SynthiaNova/TabSynthiaNova';
import { TabFrame } from './tabs/TabFrame';

function App() {
  return (
    <>
      <TabFrame
        projectName='Synthia Nova'
        repoName='SynthiaNova'
        description='A multi-model AI framework for inspiring, writing, and producing songs in a way similar to the human songwriting process.'
      >
        <TabSynthiaNova />
      </TabFrame>
    </>
  );
}

export default App;
