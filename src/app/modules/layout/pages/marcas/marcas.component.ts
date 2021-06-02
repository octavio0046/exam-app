import { Component, OnInit } from '@angular/core';
import { IMarcas } from 'src/app/services/marcas/marcas.interface';
import { MarcasService } from 'src/app/services/services.index';

@Component({
  selector: 'app-marcas',
  templateUrl: './marcas.component.html',
  styleUrls: ['./marcas.component.scss']
})
export class MarcasComponent implements OnInit {

  mMarcas: IMarcas[];
  constructor(
    private service: MarcasService,
  ) { 
    this.mMarcas=[];
  }

  ngOnInit(): void {
    this.getAll();
  }



  getAll() {
   // this.loading = true;
    this.service.AllPage().then(data => {
      this.mMarcas = data;
      console.log("marcas",this.mMarcas)
      // this.loading = false;
    }).catch(error => {
     // this.toastr.error(error.message, Entidades.Personas);
//this.loading = false;
    });
  }

}
