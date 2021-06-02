export interface IClientes {
    id: number;
    Telefono:string;
    TCMunicipioId:number;
    Nombres:string;
    Apellidos:string;
    Nacimiento:string;
    EstadoCivil:string;
    Escolaridad:string;
    Estado:string;
    Created_At:Date;
}


export class Clientes {
    static empy() {
      return {
          id: 0,
          Telefono: '',
          TCMunicipioId:0,
          Nombres: '',
          Apellidos: '',
          Nacimiento: '',
          EstadoCivil: '',
          Escolaridad: '',
          Estado: '',
          Created_At: undefined,
      } as unknown as IClientes;
    }
  }