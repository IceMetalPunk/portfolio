import type { JSX, ReactNode } from 'react';
import { TabSynthiaNova } from '../tabs/SynthiaNova/TabSynthiaNova';
import { LiaMicrophoneAltSolid } from 'react-icons/lia';
import { GiCardRandom, GiOBrick, GiTotem, GiBeveledStar } from 'react-icons/gi';
import { CgPokemon } from 'react-icons/cg';
import { LuBrain } from 'react-icons/lu';
import { IoCubeOutline } from 'react-icons/io5';
import {
  TbGhost2,
  TbCubePlus,
  TbBrandMinecraft,
  TbBrandAppleArcade,
} from 'react-icons/tb';
import { MdOutlineContactPage } from 'react-icons/md';
import { RiPagesLine } from 'react-icons/ri';

import { TabSnapLocationMaker } from '../tabs/SnapLocationMaker/TabSnapLocationMaker';
import { TabSoulLinkCalculator } from '../tabs/SoulLinkCalculator/TabSoulLinkCalculator';
import { TabEnliven } from '../tabs/Enliven/TabEnliven';
import { TabNeonite } from '../tabs/Neonite/TabNeonite';
import { TabNeonite2 } from '../tabs/Neonite 2/TabNeonite2';
import { TabSophiasSpirits } from '../tabs/Sophias Spirits/TabSophiasSpirits';
import { TabTotemEssentials } from '../tabs/Totem Essentials/TabTotemEssentials';
import { TabRedPlus } from '../tabs/RedPlus/TabRedPlus';
import { TabRedPlusPlus } from '../tabs/RedPlusPlus/TabRedPlusPlus';
import { TabStarChess } from '../tabs/Star Chess/TabStarChess';
import { TabPortfolio } from '../tabs/Portfolio/TabPortfolio';
import { TabResume } from '../tabs/Resume/TabResume';
import { TabEubert2 } from '../tabs/Eubert2/TabEubert2';

export interface TabInfo {
  projectName: string;
  repoName?: string;
  description?: string;
  projectIcon?: ReactNode;
  tab: JSX.Element;
}

export const TAB_ROUTES: Record<string, TabInfo> = {
  '/': {
    projectName: 'Portfolio',
    repoName: 'portfolio',
    projectIcon: <MdOutlineContactPage />,
    description:
      'This website for my portfolio, serving as an added example of my full stack development skillset.',
    tab: <TabPortfolio />,
  },
  resume: {
    projectName: 'Resumé',
    projectIcon: <RiPagesLine />,
    tab: <TabResume />,
  },
  'synthia-nova': {
    projectName: 'Synthia Nova',
    repoName: 'SynthiaNova',
    projectIcon: <LiaMicrophoneAltSolid />,
    description:
      'A multi-model AI framework for inspiring, writing, and producing songs in a way similar to the human songwriting process.',
    tab: <TabSynthiaNova />,
  },
  'snap-location-maker': {
    projectName: 'Marvel Snap Location Maker',
    repoName: 'SnapLocationMaker',
    projectIcon: <GiCardRandom />,
    description:
      'A simple webpage for creating and downloading custom Location images for the game Marvel Snap, as a companion for the many custom card makers out there.',
    tab: <TabSnapLocationMaker />,
  },
  'soul-link-calculator': {
    projectName: 'Pokémon Soul Link Calculator',
    repoName: 'SoulLinkCalculator',
    projectIcon: <CgPokemon />,
    description:
      'A utility for players of Pokémon Soul Link challenges, which calculates all possible combinations of valid teams from every Pokémon the two players have caught.',
    tab: <TabSoulLinkCalculator />,
  },
  'totem-essentials': {
    projectName: 'Totem Essentials',
    repoName: 'TotemEssentials',
    projectIcon: <GiTotem />,
    description:
      'A Minecraft 1.12 mod that extends the idea of totems to 32 unique totems with unique abilities and its own crafting system.',
    tab: <TabTotemEssentials />,
  },
  'red-plus': {
    projectName: 'RedPlus',
    repoName: 'RedPlus',
    projectIcon: <TbBrandMinecraft />,
    description:
      'A Minecraft 1.7.10 mod that adds many tweaks, items, and blocks useful for redstone and farming.',
    tab: <TabRedPlus />,
  },
  'red-plus-plus': {
    projectName: 'RedPlusPlus',
    repoName: 'RedPlusPlus',
    projectIcon: <TbCubePlus />,
    description:
      'A Minecraft 1.12 mod that adds a handful of tweaks and items useful for redstone and farming.',
    tab: <TabRedPlusPlus />,
  },
  'star-chess': {
    projectName: 'Star Chess',
    repoName: 'StarChess',
    projectIcon: <GiBeveledStar />,
    description:
      'Developed in 2013, this digital board game evokes the strategy of chess in a totally new format.',
    tab: <TabStarChess />,
  },
  enliven: {
    projectName: 'Enliven',
    repoName: 'Enliven',
    projectIcon: <LuBrain />,
    description:
      "Game jam entry 2011, 5th place of 56: A puzzle game where you must route cables to get electricity from sources to organs to power Frankenstein's monster.",
    tab: <TabEnliven />,
  },
  neonite: {
    projectName: 'Neonite',
    repoName: 'Neonite',
    projectIcon: <GiOBrick />,
    description:
      'Game jam entry 2010: An arcade game where blocks of opposing colors are launched to destroy each other in collisions, trying to fend off the oncoming wall for as long as possible.',
    tab: <TabNeonite />,
  },
  'neonite-2': {
    projectName: 'Neonite 2',
    repoName: 'Neonite-2',
    projectIcon: <IoCubeOutline />,
    description:
      'A sequel to Neonite, developed around 2012/2013, that adds more power-ups, a helpful HUD, improved graphics, and online highscores.',
    tab: <TabNeonite2 />,
  },
  'sophias-spirits': {
    projectName: "Sophia's Spirits",
    repoName: 'Sophias-Spirits',
    projectIcon: <TbGhost2 />,
    description:
      'Game jam entry 2011, 2nd place of 36: A puzzle platformer where the screen wraps, but quadrants can be swapped around independently, letting you rearrange the level itself to try and get to the exit door.',
    tab: <TabSophiasSpirits />,
  },
  'eubert-2-must-die': {
    projectName: 'Eubert 2 Must Die',
    repoName: 'https://icemetalpunk.itch.io/eubert-2-must-die',
    projectIcon: <TbBrandAppleArcade />,
    description:
      'Itch.io Weekly Game Jam entry in August 2020: An arcade-style homae to Q*Bert following the themes of "retro" and "nothing stays forever".',
    tab: <TabEubert2 />,
  },
};
