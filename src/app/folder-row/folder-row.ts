import {
  Component,
  Input,
  AfterViewChecked,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { Folder } from '../models/folder';

@Component({
  selector: 'app-folder-row',
  imports: [],
  templateUrl: './folder-row.html',
  styleUrl: './folder-row.css',
})
export class FolderRow implements AfterViewChecked {
  @Input() folder!: Folder;
  @Input() level: number = 0;
  @Input() selectedIds!: Set<number>;
  @ViewChild('folderCheckbox') folderCheckbox!: ElementRef<HTMLInputElement>;

  isExpanded = true;

  toggleExpand() {
    this.isExpanded = !this.isExpanded;
  }

  onFolderCheckboxChange(event: Event) {
    const checked = (event.target as HTMLInputElement).checked;
    this.setFolderSelection(this.folder, checked);
  }

  setFolderSelection(folder: Folder, checked: boolean) {
    if (checked) {
      // add child items and child folders' items to selected ids
      folder.items?.forEach((item) => this.selectedIds.add(item.id));
      folder.childFolders?.forEach((childFolder) =>
        this.setFolderSelection(childFolder, true)
      );
    } else {
      // remove child items and child folders' items from selected ids
      folder.items?.forEach((item) => this.selectedIds.delete(item.id));
      folder.childFolders?.forEach((childFolder) =>
        this.setFolderSelection(childFolder, false)
      );
    }
  }

  onItemCheckboxChange(itemId: number, event: Event) {
    // add or remove single item from selected ids
    const checked = (event.target as HTMLInputElement).checked;
    if (checked) {
      this.selectedIds.add(itemId);
    } else {
      this.selectedIds.delete(itemId);
    }
  }

  isFolderIndeterminate(): boolean {
    // conditions for a folder to be indeterminate:
    // true: some of the child items (and child items of child folders) are checked
    // false: all are checked

    return (
      this.areSomeChildItemsChecked(this.folder) && !this.isFolderChecked()
    );
  }

  // helper for isFolderIndeterminate
  private areSomeChildItemsChecked(folder: Folder): boolean {
    // some direct items are selected
    const someItemsSelected = folder.items?.some((item) =>
      this.selectedIds.has(item.id)
    );

    // some child folders are checked
    const someChildrenChecked: boolean =
      folder.childFolders?.some((child) =>
        this.areSomeChildItemsChecked(child)
      ) || false;
    return someItemsSelected || someChildrenChecked;
  }

  // check if a folder is checked (all its items and child folders' items are selected)
  isFolderChecked(): boolean {
    // All direct items are selected
    const allItemsSelected = this.folder.items?.every((item) =>
      this.selectedIds.has(item.id)
    );

    // All child folders are checked
    const allChildrenChecked =
      this.folder.childFolders?.every((child) =>
        this.isChildFolderChecked(child)
      ) || false;

    return allItemsSelected && allChildrenChecked;
  }

  // helper for isFolderChecked: checks if all items in a child folder are selected
  private isChildFolderChecked(folder: Folder): boolean {
    // all direct items are selected
    const allItemsSelected =
      folder.items?.every((item) => this.selectedIds.has(item.id)) || false;

    // All child folders are checked
    const allChildrenChecked: boolean =
      folder.childFolders?.every((child) => this.isChildFolderChecked(child)) ||
      false;

    return allItemsSelected && allChildrenChecked;
  }

  private previousIndeterminateState: boolean | null = null;

  ngAfterViewChecked() {
    // used to update indeterminate state
    if (this.folderCheckbox) {
      const currentState = this.isFolderIndeterminate();
      if (this.previousIndeterminateState !== currentState) {
        this.folderCheckbox.nativeElement.indeterminate = currentState;
        this.previousIndeterminateState = currentState;
      }
    }
  }
}
