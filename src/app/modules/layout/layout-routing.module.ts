import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AgentesComponent } from './pages/agentes/agentes.component';
import { ClientesComponent } from './pages/clientes/clientes.component';
import { ConcesionarioComponent } from './pages/concesionario/concesionario.component';
import { CotizacionesComponent } from './pages/cotizaciones/cotizaciones.component';
import { DepartamentosComponent } from './pages/departamentos/departamentos.component';
import { DetallecotizacionesComponent } from './pages/detallecotizaciones/detallecotizaciones.component';
import { HomeComponent } from './pages/home/home.component';
import { LayoutComponent } from './pages/layout/layout.component';
import { MarcasComponent } from './pages/marcas/marcas.component';
import { MunicipiosComponent } from './pages/municipios/municipios.component';
import { VehiculosComponent } from './pages/vehiculos/vehiculos.component';

const routes: Routes = [{
  path: '', component: LayoutComponent,
  children: [{
    path: 'marcas', component: MarcasComponent
  },
  {
    path: 'vehiculos', component: VehiculosComponent
  },
  {
    path: 'clientes', component: ClientesComponent
  },
  {
    path: 'departamentos', component: DepartamentosComponent
  },
  {
    path: 'cotizaciones', component: CotizacionesComponent
  },
  {
    path: 'detalle', component: DetallecotizacionesComponent
  },
  {
    path: 'concesionario', component: ConcesionarioComponent
  },
  {
    path: 'agentes', component: AgentesComponent
  },
  {
    path: 'municipios', component: MunicipiosComponent
  },
  {
    path: 'detalle/:id', component: DetallecotizacionesComponent
  }
]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
