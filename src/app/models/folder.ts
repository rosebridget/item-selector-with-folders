import { Item } from './item';

export interface Folder {
  id: number;
  title: string;
  folders?: Folder[];
  items: Item[];
}
