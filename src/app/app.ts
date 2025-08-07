import { Component } from '@angular/core';
import { ItemSelectorContainer } from './item-selector-container/item-selector-container';

@Component({
  selector: 'app-root',
  imports: [ItemSelectorContainer],
  templateUrl: './app.html',
})
export class App {}
