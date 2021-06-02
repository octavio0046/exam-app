import { Injectable } from '@angular/core';
//import { ConfigService } from '../CF/config/config.service';
import { HttpClient } from '@angular/common/http';
import { getHeaders } from '../CF/misc/headers';
import { map } from 'rxjs/operators';
import { ServicesModule } from '../services.module';
import { IMarcas } from './marcas.interface';

@Injectable({
  providedIn: ServicesModule
})
export class MarcasService {

  private mService = 'marcas';

  private mUrl = 'http://localhost:3000/';
  constructor(
    private httpClient: HttpClient,

  ) { }



  async AllPage() {
    console.log(this.mUrl + this.mService)
    return await this.httpClient.get(this.mUrl + this.mService, {
      headers: getHeaders()
    }).pipe(
      map((data: any) => {
        return data;
      })).toPromise();
  }


  async New(pDatos: IMarcas) {
    const lDatos = JSON.stringify(pDatos);
    return await this.httpClient.post(this.mUrl + this.mService, lDatos, {
      headers: getHeaders()
    }).pipe(
      map((data: any) => {
        return data;
      })).toPromise();
  }


}
