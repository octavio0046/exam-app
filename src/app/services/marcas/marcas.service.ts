import { Injectable } from '@angular/core';
//import { ConfigService } from '../CF/config/config.service';
import { HttpClient } from '@angular/common/http';
import { getHeaders } from '../CF/misc/headers';
import { map } from 'rxjs/operators';
import { ServicesModule } from '../services.module';

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
    console.log("ruta",this.mUrl + this.mService)
    return await this.httpClient.get(this.mUrl + this.mService, {
      headers: getHeaders()
    }).pipe(
      map((data: any) => {
        console.log("resp",data)
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



  async AllXId(pKey: any) {
    return await this.httpClient.get(this.mUrl + this.mService + '/' + pKey, {
      headers: getHeaders()
    }).pipe(
      map((data: any) => {
        return data;
      })).toPromise();
  }


  async Update(pObj: any, pKey: number) {
    const jObj = JSON.stringify(pObj);
    return await this.httpClient.put(this.mUrl + this.mService + '/' + pKey, jObj,
      { headers: getHeaders() })
      // tslint:disable-next-line: arrow-return-shorthand
      .pipe(map((data: any) => { return data; }))
      .toPromise();
  }


  async Delete(pKey: number) {
    return await this.httpClient.delete(this.mUrl + this.mService + '/' + pKey,
      { headers: getHeaders() }).pipe(
        map((data: any) => {
          return data;
        })).toPromise();
  }

}
