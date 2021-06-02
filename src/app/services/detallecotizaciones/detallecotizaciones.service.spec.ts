import { TestBed } from '@angular/core/testing';

import { DetallecotizacionesService } from './detallecotizaciones.service';

describe('DetallecotizacionesService', () => {
  let service: DetallecotizacionesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DetallecotizacionesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
