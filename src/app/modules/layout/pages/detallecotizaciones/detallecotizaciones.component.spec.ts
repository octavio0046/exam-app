import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetallecotizacionesComponent } from './detallecotizaciones.component';

describe('DetallecotizacionesComponent', () => {
  let component: DetallecotizacionesComponent;
  let fixture: ComponentFixture<DetallecotizacionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetallecotizacionesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetallecotizacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
