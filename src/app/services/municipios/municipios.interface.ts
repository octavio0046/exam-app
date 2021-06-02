export interface IMunicipios {
    id: number;
    Nombre:string;
    TCDepartamentoI:number;
    Estado:string;
    Created_At:Date;
}


export class Municipios {
    static empy() {
      return {
          id: 0,
          Nombre: '',
          TCDepartamentoI: 0,
          Estado: '',
          Created_At: undefined,
      } as unknown as IMunicipios;
    }
  }