import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FolderRow } from './folder-row';
import { Folder } from '../models/folder';

describe('FolderRow', () => {
  let component: FolderRow;
  let fixture: ComponentFixture<FolderRow>;

  const mockFolder: Folder = {
    id: 1,
    title: 'Test Folder',
    childFolders: [],
    items: [
      { id: 10, title: 'Test Item 1' },
      { id: 11, title: 'Test Item 2' },
    ],
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FolderRow],
    }).compileComponents();

    fixture = TestBed.createComponent(FolderRow);
    component = fixture.componentInstance;
    component.folder = mockFolder;
    component.selectedIds = new Set<number>();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display folder title', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Test Folder');
  });

  it('should start expanded', () => {
    expect(component.isExpanded).toBe(true);
  });
});
