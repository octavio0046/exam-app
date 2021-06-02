export interface IAgentes {
    id: number;
    Telefono:string;
    TCConcesionarioId:number;
    Nombres:string;
    Apellidos:string;
    Nacimiento:string;
    Estado:string;
    Created_At:Date;
}


export class Agentes {
    static empy() {
      return {
          id: 0,
          Telefono: '',
          TCConcesionarioId: 0,
          Nombres: '',
          Apellidos: '',
          Nacimiento: '',
          Estado: '',
          Created_At: undefined,
      } as unknown as IAgentes;
    }
  }