
import { Injectable } from '@angular/core';
//import { ConfigService } from '../CF/config/config.service';
import { HttpClient } from '@angular/common/http';
import { getHeaders } from '../CF/misc/headers';
import { map } from 'rxjs/operators';
import { ServicesModule } from '../services.module';

@Injectable({
  providedIn: ServicesModule
})
export class ConcesionarioService {

  private mService = 'concesionarios';

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


  async New(pDatos: any) {
    const lDatos = JSON.stringify(pDatos);
    console.log("ldatos",lDatos)
    return await this.httpClient.post(this.mUrl + this.mService, lDatos, {
      headers: getHeaders()
    }).pipe(
      map((data: any) => {
        return data;
      })).toPromise();
  }


}
