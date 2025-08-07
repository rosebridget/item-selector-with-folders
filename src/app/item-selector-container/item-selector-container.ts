import { Component, inject, OnInit } from '@angular/core';
import { ItemSelector } from '../item-selector/item-selector';
import { Equipment as EquipmentService } from '../services/equipment';

@Component({
  selector: 'app-item-selector-container',
  imports: [ItemSelector],
  templateUrl: './item-selector-container.html',
  styleUrl: './item-selector-container.css',
})
export class ItemSelectorContainer {
  folders: any = [];
  equipmentService = inject(EquipmentService);

  ngOnInit() {
    this.equipmentService.getAllItemSelectorData().subscribe((folders) => {
      this.folders = folders;
    });
  }

  logFolders() {
    console.log('HERE', this.folders);
  }
}
