import { NgModule } from '@angular/core';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxLoadingModule } from 'ngx-loading';
@NgModule({
  declarations: [
    FooterComponent,
    HeaderComponent,
    SidebarComponent
  ],
  imports: [
    BrowserAnimationsModule,
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxLoadingModule.forRoot({})
  ],
  exports: [
    SidebarComponent,
    FooterComponent,
    HeaderComponent]
})
export class SharedModule { }
