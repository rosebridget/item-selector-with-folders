import { Item } from './item';

export interface Folder {
  id: number;
  title: string;
  childFolders?: Folder[];
  items: Item[];
}
