export interface IDetalle {
    id: number;
    TCVehiculoId:number;
    TCCotizacionId:number;
    Descripcion:string;
    Estado:string;
    Created_At:Date;
}


export class Detalle {
    static empy() {
      return {
          id: 0,
          TCVehiculoId: 0,
          TCCotizacionId: 0,
          Descripcion: '',
          Estado: '',
          Created_At: undefined,
      } as unknown as IDetalle;
    }
  }