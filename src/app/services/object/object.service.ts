import { Injectable } from '@angular/core';
import {
  IEstados,
} from 'src/app/services/interface.index';

@Injectable({
  providedIn: 'root',
})
export class ObjectService {
  constructor() { }


  Estados(): IEstados[] {
    return [
      {
        id: 1,
        Nombre: 'Activo',
      },
      {
        id: 2,
        Nombre: 'Inactivo',
      },
    ];
  }



}
