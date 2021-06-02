export interface IConcesionario {
    id: number;
    Nombre:string;
    TCMunicipioId:number;
    Razon:string;
    Estado:string;
    Created_At:Date;
}


export class Concesionario {
    static empy() {
      return {
          id: 0,
          Nombre:'',
          TCMunicipioId: 0,
          Razon: '',
          Estado: '',
          Created_At: undefined,
      } as unknown as IConcesionario;
    }
  }