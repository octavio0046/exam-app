import { TestBed } from '@angular/core/testing';

import { ConcesionarioService } from './concesionario.service';

describe('ConcesionarioService', () => {
  let service: ConcesionarioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConcesionarioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
