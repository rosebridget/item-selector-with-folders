import { Component, inject, Input, OnInit } from '@angular/core';
import { FolderRow } from '../folder-row/folder-row';
import { Folder } from '../models/folder';
import { Equipment as EquipmentService } from '../services/equipment';

@Component({
  selector: 'app-item-selector',
  imports: [FolderRow],
  templateUrl: './item-selector.html',
  styleUrl: './item-selector.css',
})
export class ItemSelector implements OnInit {
  @Input() selectedIds!: Set<number>;
  folders: Folder[] = [];
  equipmentService = inject(EquipmentService);

  ngOnInit() {
    this.equipmentService.getAllItemSelectorData().subscribe((folders) => {
      this.folders = folders;
    });
  }
}
