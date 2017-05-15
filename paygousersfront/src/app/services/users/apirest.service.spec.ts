import { TestBed, inject } from '@angular/core/testing';

import { ApirestService } from './apirest.service';

describe('ApirestService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ApirestService]
    });
  });

  it('should be created', inject([ApirestService], (service: ApirestService) => {
    expect(service).toBeTruthy();
  }));
});
