export interface IMarcas {
    id: number;
    Nombre:string;
    Estado:string;
    Created_At:Date;
}


export class Marcas {
    static empy() {
      return {
          id: 0,
          Nombre: '',
          Estado: '',
          Created_At: undefined,
      } as unknown as IMarcas;
    }
  }