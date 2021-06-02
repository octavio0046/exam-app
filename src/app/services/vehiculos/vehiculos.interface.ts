export interface IVehiculos {
    id: number;
    TCMarcaId:number;
    Precio:string;
    Color:string;
    Tipo:string;
    Traccion:string;
    TCConcesionarioId:number;
    Estado:string;
    Created_At:Date;
}


export class Vehiculos {
    static empy() {
      return {
          id: 0,
          TCMarcaId: 0,
          Precio: '',
          Color: '',
          Tipo: '',
          Traccion: '',
          TCConcesionarioId: 0,
          Estado: '',
          Created_At: undefined,
      } as unknown as IVehiculos;
    }
  }