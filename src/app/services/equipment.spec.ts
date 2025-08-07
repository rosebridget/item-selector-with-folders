import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

import { Equipment } from './equipment';

describe('Equipment', () => {
  let service: Equipment;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(Equipment);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
