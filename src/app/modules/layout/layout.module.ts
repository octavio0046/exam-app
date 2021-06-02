import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutRoutingModule } from './layout-routing.module';
import { HomeComponent } from './pages/home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ServicesModule } from 'src/app/services/services.module';
import { NgxLoadingModule } from 'ngx-loading';
import { MarcasComponent } from './pages/marcas/marcas.component';
@NgModule({
  declarations: [
    HomeComponent,
    MarcasComponent
  ],
  imports: [
    CommonModule,
    LayoutRoutingModule,
    FormsModule,
    ServicesModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxLoadingModule.forRoot({})
  ]
})
export class LayoutModule { }
