import type { JSX, ReactNode } from 'react';
import { TabSynthiaNova } from '../tabs/SynthiaNova/TabSynthiaNova';
import { LiaMicrophoneAltSolid } from 'react-icons/lia';

export interface TabInfo {
  projectName: string;
  repoName?: string;
  description: string;
  projectIcon?: ReactNode;
  tab: JSX.Element;
}

export const TAB_ROUTES: Record<string, TabInfo> = {
  '/': {
    projectName: 'Synthia Nova',
    repoName: 'SynthiaNova',
    projectIcon: <LiaMicrophoneAltSolid />,
    description:
      'A multi-model AI framework for inspiring, writing, and producing songs in a way similar to the human songwriting process.',
    tab: <TabSynthiaNova />,
  },
  'synthia-nova': {
    projectName: 'Synthia Nova Test',
    repoName: 'SynthiaNova',
    projectIcon: <LiaMicrophoneAltSolid />,
    description:
      'TESTING: A multi-model AI framework for inspiring, writing, and producing songs in a way similar to the human songwriting process.',
    tab: <TabSynthiaNova />,
  },
};
