import { Component, OnInit } from '@angular/core';
import { AgentesService,ConcesionarioService,ObjectService } from 'src/app/services/services.index';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import {
  FormGroup,
  FormBuilder,
  Validators
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import {
  IEstados,
  IAgentes,Agentes, IConcesionario
} from 'src/app/services/interface.index';

@Component({
  selector: 'app-agentes',
  templateUrl: './agentes.component.html',
  styleUrls: ['./agentes.component.scss']
})
export class AgentesComponent implements OnInit {
  mConcesionarios:IConcesionario[];
  mEstado: IEstados[];
  submitted = false;
  mAgentes: IAgentes[];
  mForma: FormGroup;
  mAgentesSelect: IAgentes;
  mFormaEstado: string;
  public loading = false;
  Pkey: number;
  constructor(
    private modalService: NgbModal,
    private service: AgentesService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private state: ObjectService,
    private serviceConcesionarios: ConcesionarioService,
  ) { 
    this.mConcesionarios=[];
    this.mForma = this.generarFormulario();
    this.mAgentes=[];
    this.mAgentesSelect = Agentes.empy();
    this.mFormaEstado = '4';
    this.mEstado = this.state.Estados();
    this.Pkey=0;
  }

  ngOnInit(): void {
    this.getAll();
    this.getAllConcesionarios();
  }



  get f() { return this.mForma.controls; }

  generarFormulario() {
    return this.formBuilder.group({
      Nombres: ['', Validators.required],
      Apellidos: ['', Validators.required],
      Telefono: ['', Validators.required],
      Nacimiento: ['', Validators.required],
      Estado:  ['', Validators.required],
      TCConcesionarioId:  ['', Validators.required],
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
        Estado: data[0].Estado,
        TCConcesionarioId: data[0].Estado
      });
      this.loading = false;
    }).catch((error: { message: string | undefined; }) => {
      this.loading = false;
      this.toastr.error(error.message, "Agentes");
    });
  }

  getAll() {
    this.loading = true;
    this.service.AllPage().then(data => {
      this.mAgentes = data;
     this.loading = false;
    }).catch(error => {
      this.toastr.error(error.message, "Agentes");
      this.loading = false;
    });
  }


    
  getAllConcesionarios() {
    this.loading = true;
    this.serviceConcesionarios.AllPage().then(data => {
      this.mConcesionarios = data;
     this.loading = false;
    }).catch(error => {
      this.toastr.error(error.message, "Concesionarios");
      this.loading = false;
    });
  }


  onSubmit() {
    this.submitted = true;
    if (this.mForma.invalid) {
      return;
    } else {
      this.mAgentesSelect = this.mForma.value as IAgentes;
      if (this.mFormaEstado === '1') {
        this.guardar();
      } else if (this.mFormaEstado === '3') {
        this.actualizar(this.Pkey);
      }
    }
  }


  guardar() {
    this.loading = true;
    this.service.New(this.mAgentesSelect).then(data => {
      this.toastr.success(data.message, "Agentes");
      this.mFormaEstado = '4';
      this.mAgentes.unshift(data);
      this.loading = false;
   //   this.modalRef.close();
   this.getDismissReason('');
    }).catch(error => {
      this.loading = false;
      this.toastr.error(error.message, "Agentes");
    });
  }

  actualizar(pKey: number) {
    this.loading = true;
    this.service.Update(this.mAgentesSelect, pKey).then(data => {
      this.toastr.success(data.message, "Agentes");
      this.getDismissReason('');
      this.mAgentes = this.mAgentes.map((object: IAgentes) => {
        if (object.id === pKey) {
          return object = data;
        } else {
          return object;
        }
      });

      this.loading = false;
    }).catch(error => {
      this.loading = false;
      this.toastr.error(error.message, "Agentes");
    });
  }

  
  eliminar(pKey: number) {
    this.loading = true;
    this.service.Delete(pKey).then(data => {
      this.toastr.success(data.message, "Agentes");
        this.mAgentes = this.mAgentes.filter((object: IAgentes) => object.id !== pKey);
      this.loading = false;
    }).catch(error => {
      this.loading = false;
      this.toastr.error(error.message, "Agentes");
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
