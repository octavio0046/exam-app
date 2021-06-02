import { Component, OnInit } from '@angular/core';
import {  DepartamentosService,ObjectService } from 'src/app/services/services.index';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import {
  FormGroup,
  FormBuilder,
  Validators
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import {
  IEstados,
  IDepartamentos, Departamentos
} from 'src/app/services/interface.index';

@Component({
  selector: 'app-departamentos',
  templateUrl: './departamentos.component.html',
  styleUrls: ['./departamentos.component.scss']
})
export class DepartamentosComponent implements OnInit {
  mEstado: IEstados[];
  submitted = false;
  mDepartamentos: IDepartamentos[];
  mForma: FormGroup;
  mDepartamentosSelect: IDepartamentos;
  mFormaEstado: string;
  public loading = false;
  Pkey: number;
  constructor(
    private modalService: NgbModal,
    private service:  DepartamentosService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private state: ObjectService,
  ) { 
    this.mForma = this.generarFormulario();
    this.mDepartamentos=[];
    this.mDepartamentosSelect =  Departamentos.empy();
    this.mFormaEstado = '4';
    this.mEstado = this.state.Estados();
    this.Pkey=0;
  }

  ngOnInit(): void {
    this.getAll();
  }



  get f() { return this.mForma.controls; }

  generarFormulario() {
    return this.formBuilder.group({
      Nombre: ['', Validators.required],
      Estado:  ['', Validators.required],
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
         Nombre: data[0].Nombre,
        Estado: data[0].Estado
      });
      this.loading = false;
    }).catch((error: { message: string | undefined; }) => {
      this.loading = false;
      this.toastr.error(error.message, " Departamentos");
    });
  }

  getAll() {
    this.loading = true;
    this.service.AllPage().then(data => {
      this.mDepartamentos = data;
     this.loading = false;
    }).catch(error => {
      this.toastr.error(error.message, " Departamentos");
      this.loading = false;
    });
  }


  onSubmit() {
    this.submitted = true;
    if (this.mForma.invalid) {
      return;
    } else {
      this.mDepartamentosSelect = this.mForma.value as IDepartamentos;
      if (this.mFormaEstado === '1') {
        this.guardar();
      } else if (this.mFormaEstado === '3') {
        this.actualizar(this.Pkey);
      }
    }
  }


  guardar() {
    this.loading = true;
    this.service.New(this.mDepartamentosSelect).then(data => {
      this.toastr.success(data.message, " Departamentos");
      this.mFormaEstado = '4';
      this.mDepartamentos.unshift(data);
      this.loading = false;
   //   this.modalRef.close();
   this.getDismissReason('');
    }).catch(error => {
      this.loading = false;
      this.toastr.error(error.message, " Departamentos");
    });
  }

  actualizar(pKey: number) {
    this.loading = true;
    this.service.Update(this.mDepartamentosSelect, pKey).then(data => {
      this.toastr.success(data.message, " Departamentos");
      this.getDismissReason('');
      this.mDepartamentos = this.mDepartamentos.map((object: IDepartamentos) => {
        if (object.id === pKey) {
          return object = data;
        } else {
          return object;
        }
      });

      this.loading = false;
    }).catch((error: { message: string | undefined; }) => {
      this.loading = false;
      this.toastr.error(error.message, " Departamentos");
    });
  }

  
  eliminar(pKey: number) {
    this.loading = true;
    this.service.Delete(pKey).then(data => {
      console.log(data)
      this.toastr.success(data.message, " Departamentos");
        this.mDepartamentos = this.mDepartamentos.filter((object: IDepartamentos) => object.id !== pKey);
      this.loading = false;
    }).catch(error => {
      this.loading = false;
      this.toastr.error(error.message, " Departamentos");
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
