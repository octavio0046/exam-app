import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LayoutComponent } from './pages/layout/layout.component';
import { MarcasComponent } from './pages/marcas/marcas.component';

const routes: Routes = [{
  path: '', component: LayoutComponent,
  children: [{
    path: 'marcas', component: MarcasComponent
  }]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
