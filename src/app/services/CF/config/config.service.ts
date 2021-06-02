import { Injectable } from '@angular/core';
//import { HttpClient } from '@angular/common/http';
//import { map } from 'rxjs/operators';
//import { environment } from '../../../../environments/environment';
import { ServicesModule } from '../../services.module';

@Injectable({ providedIn: ServicesModule })
export class ConfigService {
  //public mCfgStatic: IConfigStatic = null;
  public mCfgStatic: any;
  constructor(
    //  private httpClient: HttpClient
  ) {

  }

  loadAppConfigStatic() {
    // let lFileConfig = '';
    // if (environment.production) {
    //   lFileConfig = 'assets/config.json';
    // } else {
    //   lFileConfig = 'assets/config.dev.json';
    // }
    // return this.httpClient.get(lFileConfig).pipe(
    //   map((response: any) => {
    //     return response;
    //   })
    // ).toPromise().then(data => {
    //   this.mCfgStatic = data;
    // });
  }

}
