import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FolderRow } from './folder-row';

describe('FolderRow', () => {
  let component: FolderRow;
  let fixture: ComponentFixture<FolderRow>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FolderRow]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FolderRow);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
