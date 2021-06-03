import { Component, OnInit } from '@angular/core';
import { ClientesService,MunicipiosService,ObjectService } from 'src/app/services/services.index';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import {
  FormGroup,
  FormBuilder,
  Validators
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import {
  IEstados,
  IClientes,Clientes, IMunicipios
} from 'src/app/services/interface.index';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.scss']
})
export class ClientesComponent implements OnInit {
  mMunicipios:IMunicipios[];
  mEstado: IEstados[];
  submitted = false;
  mClientes: IClientes[];
  mForma: FormGroup;
  mClientesSelect: IClientes;
  mFormaEstado: string;
  public loading = false;
  Pkey: number;
  constructor(
    private modalService: NgbModal,
    private service: ClientesService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private state: ObjectService,
    private serviceMunicipios: MunicipiosService,
  ) { 
    this.mMunicipios=[];
    this.mForma = this.generarFormulario();
    this.mClientes=[];
    this.mClientesSelect = Clientes.empy();
    this.mFormaEstado = '4';
    this.mEstado = this.state.Estados();
    this.Pkey=0;
  }

  ngOnInit(): void {
    this.getAll();
    this.getAllMunicipios();
  }



  get f() { return this.mForma.controls; }

  generarFormulario() {
    return this.formBuilder.group({
      Nombres: ['', Validators.required],
      Apellidos: ['', Validators.required],
      Telefono: ['', Validators.required],
      Nacimiento: ['', Validators.required],
      EstadoCivil: ['', Validators.required],
      Escolaridad: ['', Validators.required],
      Estado:  ['', Validators.required],
      TCMunicipioId:  ['', Validators.required],
    });
  }

  nuevo(content: any) {
    this.modalService.open(content, { size: 'lg' });
    this.mFormaEstado ="1";
  }
  ver(content: any, pkey: number) {
    this.getXId(pkey);
    this.modalService.open(content, { size: 'lg',centered: true  });
    this.mFormaEstado = '2';
    this.mForma.disable();
  }


  
  modificar(content: any, pkey: number) {
    this.Pkey = pkey;
    this.mForma.enable();
    this.getXId(this.Pkey);
    this.modalService.open(content, { size: 'lg',centered: true  });
    this.mFormaEstado = '3';
  }


  getXId(pkey:number) {
    this.loading = true;
    this.service.AllXId(pkey).then(data => {
      this.mForma.setValue({
         Nombres: data[0].Nombres,
         Apellidos: data[0].Apellidos,
         Telefono: data[0].Telefono,
         Nacimiento: data[0].Nacimiento,
         EstadoCivil: data[0].EstadoCivil,
         Escolaridad: data[0].Escolaridad,
        Estado: data[0].Estado,
        TCMunicipioId: data[0].TCMunicipioId
      });
      this.loading = false;
    }).catch((error: { message: string | undefined; }) => {
      this.loading = false;
      this.toastr.error(error.message, "Clientes");
    });
  }

  getAll() {
    this.loading = true;
    this.service.AllPage().then(data => {
      this.mClientes = data;
     this.loading = false;
    }).catch(error => {
      this.toastr.error(error.message, "Clientes");
      this.loading = false;
    });
  }


    
  getAllMunicipios() {
    this.loading = true;
    this.serviceMunicipios.AllPage().then(data => {
      this.mMunicipios = data;
     this.loading = false;
    }).catch(error => {
      this.toastr.error(error.message, "Municipios");
      this.loading = false;
    });
  }


  onSubmit() {
    this.submitted = true;
    if (this.mForma.invalid) {
      return;
    } else {
      this.mClientesSelect = this.mForma.value as IClientes;
      if (this.mFormaEstado === '1') {
        this.guardar();
      } else if (this.mFormaEstado === '3') {
        this.actualizar(this.Pkey);
      }
    }
  }


  guardar() {
    this.loading = true;
    this.service.New(this.mClientesSelect).then(data => {
      this.toastr.success(data.message, "Clientes");
      this.mFormaEstado = '4';
      this.mClientes.unshift(data);
      this.loading = false;
   //   this.modalRef.close();
   this.getDismissReason('');
    }).catch(error => {
      this.loading = false;
      this.toastr.error(error.message, "Clientes");
    });
  }

  actualizar(pKey: number) {
    this.loading = true;
    this.service.Update(this.mClientesSelect, pKey).then(data => {
      this.toastr.success(data.message, "Clientes");
      this.getDismissReason('');
      this.mClientes = this.mClientes.map((object: IClientes) => {
        if (object.id === pKey) {
          return object = data;
        } else {
          return object;
        }
      });

      this.loading = false;
    }).catch(error => {
      this.loading = false;
      this.toastr.error(error.message, "Clientes");
    });
  }

  
  eliminar(pKey: number) {
    this.loading = true;
    this.service.Delete(pKey).then(data => {
      this.toastr.success(data.message, "Clientes");
        this.mClientes = this.mClientes.filter((object: IClientes) => object.id !== pKey);
      this.loading = false;
    }).catch(error => {
      this.loading = false;
      this.toastr.error(error.message, "Clientes");
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }


}
