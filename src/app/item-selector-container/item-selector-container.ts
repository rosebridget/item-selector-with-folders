import { Component } from '@angular/core';
import { ItemSelector } from '../item-selector/item-selector';

@Component({
  selector: 'app-item-selector-container',
  imports: [ItemSelector],
  templateUrl: './item-selector-container.html',
  styleUrl: './item-selector-container.css',
})
export class ItemSelectorContainer {}
