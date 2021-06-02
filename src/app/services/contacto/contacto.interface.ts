export interface IContactoRs {
    count: number;
    rows: IContacto[];
  }
  export interface IContactoResponse {
    success: boolean;
    message: string;
    response: {
      count: number;
      rows: IContacto[];
    };
  }
  export interface IContactoById {
    success: boolean;
    message: string;
    response: IContacto;
  }
  export interface IContacto {
    id: string,
    Nombre?: string;
    Email?: string;
    Mensaje?: string;
    Condiciones?: Boolean;
    ADEmpresaId:string;
  }
  
  export class Contacto {
    static empy() {
      return {
        id: '',
        Nombre: '',
        Email: '',
        Mensaje: '',
        ADEmpresaId:'',
        Condiciones: false,
      } as IContacto;
    }
  }
  
  
  
  
  