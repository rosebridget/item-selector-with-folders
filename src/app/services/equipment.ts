import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, catchError } from 'rxjs';
import { TitleCasePipe } from '@angular/common';
import { environment } from '../../environments/environment';
import {
  EquipmentFolderRow,
  EquipmentItemRow,
  EquipmentResponse,
} from '../models/equipment-response';
import { Folder } from '../models/folder';
import { Item } from '../models/item';

@Injectable({
  providedIn: 'root',
})
export class Equipment {
  private http = inject(HttpClient);
  private titleCasePipe = new TitleCasePipe();

  getAllItemSelectorData(): Observable<Folder[]> {
    return this.http
      .get<EquipmentResponse>(`${environment.apiUrl}/equipment`)
      .pipe(
        map((response) => this.mapDataToFolders(response)),
        catchError((error) => {
          console.error('Error fetching equipment data:', error);
          throw error;
        })
      );
  }

  private mapDataToFolders(data: EquipmentResponse) {
    const { folders, items }: EquipmentResponse = data;
    const folderMap = new Map<number, Folder>();

    // add folders to map
    folders.data.forEach((row: EquipmentFolderRow) => {
      const [id, title] = row;
      folderMap.set(id, {
        id,
        title: this.titleCasePipe.transform(title),
        childFolders: [],
        items: [],
      });
    });

    // add child folders to parent's child folder array
    folders.data.forEach((row: EquipmentFolderRow) => {
      const [id, , parentId] = row;
      if (parentId !== null) {
        const parentFolder = folderMap.get(parentId);
        if (parentFolder && parentFolder.childFolders) {
          const childFolder = folderMap.get(id);
          if (childFolder) {
            parentFolder.childFolders.push(childFolder);
          }
        }
      }
    });

    // add items to folders, make sure the first letter of
    // each word in the item title is capitalized
    items.data.forEach((row: EquipmentItemRow) => {
      const [id, title, folderId] = row;
      const folder = folderMap.get(folderId);
      if (folder && folder.items) {
        folder.items.push({
          id,
          title: this.titleCasePipe.transform(title),
        });
      }
    });

    // sort them alphabetically by title
    folderMap.forEach((folder) => {
      folder?.childFolders?.sort((a: Folder, b: Folder) =>
        a.title.localeCompare(b.title)
      );
      folder?.items?.sort((a: Item, b: Item) => a.title.localeCompare(b.title));
    });

    // return only the top level folders
    const rootFolders = folders.data
      .filter((row: EquipmentFolderRow) => row[2] === null) // folders without a parent_id
      .map((row: EquipmentFolderRow) => folderMap.get(row[0])) // create array with the root folders
      .filter((folder: Folder | undefined) => folder !== undefined); // filter out undefined

    return rootFolders;
  }
}
