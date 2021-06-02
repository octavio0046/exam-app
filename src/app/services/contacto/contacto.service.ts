import { Injectable } from '@angular/core';
//import { ConfigService } from '../CF/config/config.service';
import { HttpClient } from '@angular/common/http';
import { getHeaders } from '../CF/misc/headers';
import { map } from 'rxjs/operators';
import { ServicesModule } from '../services.module';

@Injectable({
  providedIn: ServicesModule
})
export class ContactoService {
  /* Nombre de recurso ha obtener en la API */
  private mService = 'Subscriptor';
  /* Url obtenida del servicio de configuracion */
  // private mUrl = this.configService.mCfgStatic.UrlAPI;

  private mUrl = 'https://api.smartdevs.com.gt/desav1.1/';
  constructor(
    private httpClient: HttpClient,
    //private configService: ConfigService
  ) { }


  async New(pDatos: any) {
    const lDatos = JSON.stringify(pDatos);
    return await this.httpClient.post(this.mUrl + this.mService+'/Contactanos', lDatos, {
      headers: getHeaders()
    }).pipe(
      map((data: any) => {
        return data;
      })).toPromise();
  }

  async NewSuscription(pDatos: any) {
    const lDatos = JSON.stringify(pDatos);
    return await this.httpClient.post(this.mUrl + this.mService+'/Subscribete ', lDatos, {
      headers: getHeaders()
    }).pipe(
      map((data: any) => {
        return data;
      })).toPromise();
  }
}
