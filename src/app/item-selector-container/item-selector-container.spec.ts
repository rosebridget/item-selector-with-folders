import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemSelectorContainer } from './item-selector-container';

describe('ItemSelectorContainer', () => {
  let component: ItemSelectorContainer;
  let fixture: ComponentFixture<ItemSelectorContainer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ItemSelectorContainer]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ItemSelectorContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
