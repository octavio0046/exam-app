export interface ICotizaciones {
    id: number;
    TCAgenteId:number;
    TCClienteId:number;
    Vencimiento:string;
    Estado:string;
    Created_At:Date;
}


export class Cotizaciones {
    static empy() {
      return {
          id: 0,
          TCAgenteId: 0,
          TCClienteId: 0,
          Vencimiento: '',
          Estado: '',
          Created_At: undefined,
      } as unknown as ICotizaciones;
    }
  }