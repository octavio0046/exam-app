import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutRoutingModule } from './layout-routing.module';
import { HomeComponent } from './pages/home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ServicesModule } from 'src/app/services/services.module';
import { NgxLoadingModule } from 'ngx-loading';
import { MarcasComponent } from './pages/marcas/marcas.component';
import { VehiculosComponent } from './pages/vehiculos/vehiculos.component';
import { ClientesComponent } from './pages/clientes/clientes.component';
import { DepartamentosComponent } from './pages/departamentos/departamentos.component';
import { CotizacionesComponent } from './pages/cotizaciones/cotizaciones.component';
import { ConcesionarioComponent } from './pages/concesionario/concesionario.component';
import { DetallecotizacionesComponent } from './pages/detallecotizaciones/detallecotizaciones.component';
import { AgentesComponent } from './pages/agentes/agentes.component';
import { MunicipiosComponent } from './pages/municipios/municipios.component';

@NgModule({
  declarations: [
    HomeComponent,
    MarcasComponent,
    VehiculosComponent,
    ClientesComponent,
    DepartamentosComponent,
    CotizacionesComponent,
    ConcesionarioComponent,
    DetallecotizacionesComponent,
    AgentesComponent,
    MunicipiosComponent
  ],
  imports: [
    CommonModule,
    LayoutRoutingModule,
    FormsModule,
    ServicesModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxLoadingModule.forRoot({}),
  ],
  providers: [

  ],
  
})
export class LayoutModule { }
