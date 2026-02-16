
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

export interface Project {
  id: string;
  title: string;
  company: string;
  period: string;
  description: string;
  image: string;
  tags: string[];
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  isError?: boolean;
}

export enum Section {
  HERO = 'hero',
  JOURNEY = 'journey',
  ARSENAL = 'arsenal',
  CONTACT = 'contact',
}

// Added the Artist interface used by components/ArtistCard.tsx to resolve the compilation error
export interface Artist {
  id: string;
  name: string;
  genre: string;
  day: string;
  image: string;
  description?: string;
}
