import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

import { ItemSelector } from './item-selector';

describe('ItemSelector', () => {
  let component: ItemSelector;
  let fixture: ComponentFixture<ItemSelector>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ItemSelector],
      providers: [provideHttpClient(), provideHttpClientTesting()],
    }).compileComponents();

    fixture = TestBed.createComponent(ItemSelector);
    component = fixture.componentInstance;
    component.selectedIds = new Set<number>();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
