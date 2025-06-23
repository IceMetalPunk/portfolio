import type { JSX } from 'react';
import { TabSynthiaNova } from '../tabs/SynthiaNova/TabSynthiaNova';

export interface TabInfo {
  projectName: string;
  repoName?: string;
  description: string;
  tab: JSX.Element;
}

export const TAB_ROUTES = {
  '/': {
    projectName: 'Synthia Nova',
    repoName: 'SynthiaNova',
    description:
      'A multi-model AI framework for inspiring, writing, and producing songs in a way similar to the human songwriting process.',
    tab: <TabSynthiaNova />,
  },
  'synthia-nova': {
    projectName: 'Synthia Nova Test',
    repoName: 'SynthiaNova',
    description:
      'TESTING: A multi-model AI framework for inspiring, writing, and producing songs in a way similar to the human songwriting process.',
    tab: <TabSynthiaNova />,
  },
};
