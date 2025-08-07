import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

import { ItemSelectorContainer } from './item-selector-container';

describe('ItemSelectorContainer', () => {
  let component: ItemSelectorContainer;
  let fixture: ComponentFixture<ItemSelectorContainer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ItemSelectorContainer],
      providers: [provideHttpClient(), provideHttpClientTesting()],
    }).compileComponents();

    fixture = TestBed.createComponent(ItemSelectorContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display "Clear selection" button', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const button = compiled.querySelector('button');
    expect(button?.textContent?.trim()).toBe('Clear selection');
  });

  it('should start with no items selected', () => {
    expect(component.selectedIds.size).toBe(0);
  });
});
