import { Component, OnInit } from '@angular/core';
import { DepartamentosService, MunicipiosService,ObjectService } from 'src/app/services/services.index';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import {
  FormGroup,
  FormBuilder,
  Validators
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import {
  IDepartamentos,
  IEstados,
  IMunicipios,Municipios
} from 'src/app/services/interface.index';

@Component({
  selector: 'app-municipios',
  templateUrl: './municipios.component.html',
  styleUrls: ['./municipios.component.scss']
})
export class MunicipiosComponent implements OnInit {
  mDepartamentos:IDepartamentos[];
  mEstado: IEstados[];
  submitted = false;
  mMunicipios: IMunicipios[];
  mForma: FormGroup;
  mMunicipiosSelect: IMunicipios;
  mFormaEstado: string;
  public loading = false;
  Pkey: number;
  constructor(
    private modalService: NgbModal,
    private service: MunicipiosService,
    private serviceDepartamentos: DepartamentosService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private state: ObjectService,
  ) { 
    this.mDepartamentos=[];
    this.mForma = this.generarFormulario();
    this.mMunicipios=[];
    this.mMunicipiosSelect = Municipios.empy();
    this.mFormaEstado = '4';
    this.mEstado = this.state.Estados();
    this.Pkey=0;
  }

  ngOnInit(): void {
    this.getAll();
    this.getAllDepartamentos();
  }



  get f() { return this.mForma.controls; }

  generarFormulario() {
    return this.formBuilder.group({
      Nombre: ['', Validators.required],
      Estado:  ['', Validators.required],
      TCDepartamentoId:  ['', Validators.required],
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
      this.toastr.error(error.message, "Municipios");
    });
  }

  getAll() {
    this.loading = true;
    this.service.AllPage().then(data => {
      this.mMunicipios = data;
     this.loading = false;
    }).catch(error => {
      this.toastr.error(error.message, "Municipios");
      this.loading = false;
    });
  }

  
  getAllDepartamentos() {
    this.loading = true;
    this.serviceDepartamentos.AllPage().then(data => {
      this.mDepartamentos = data;
     this.loading = false;
    }).catch(error => {
      this.toastr.error(error.message, "Departamentos");
      this.loading = false;
    });
  }


  onSubmit() {
    this.submitted = true;
    if (this.mForma.invalid) {
      return;
    } else {
      this.mMunicipiosSelect = this.mForma.value as IMunicipios;
      if (this.mFormaEstado === '1') {
        this.guardar();
      } else if (this.mFormaEstado === '3') {
        this.actualizar(this.Pkey);
      }
    }
  }


  guardar() {
    this.loading = true;
    this.service.New(this.mMunicipiosSelect).then(data => {
      this.toastr.success(data.message, "Municipios");
      this.mFormaEstado = '4';
      this.mMunicipios.unshift(data);
      this.loading = false;
   //   this.modalRef.close();
   this.getDismissReason('');
    }).catch(error => {
      this.loading = false;
      this.toastr.error(error.message, "Municipios");
    });
  }

  actualizar(pKey: number) {
    this.loading = true;
    this.service.Update(this.mMunicipiosSelect, pKey).then(data => {
      this.toastr.success(data.message, "Municipios");
      this.getDismissReason('');
      this.mMunicipios = this.mMunicipios.map((object: IMunicipios) => {
        if (object.id === pKey) {
          return object = data;
        } else {
          return object;
        }
      });

      this.loading = false;
    }).catch(error => {
      this.loading = false;
      this.toastr.error(error.message, "Municipios");
    });
  }

  
  eliminar(pKey: number) {
    this.loading = true;
    this.service.Delete(pKey).then(data => {
      this.toastr.success(data.message, "Municipios");
        this.mMunicipios = this.mMunicipios.filter((object: IMunicipios) => object.id !== pKey);
      this.loading = false;
    }).catch(error => {
      this.loading = false;
      this.toastr.error(error.message, "Municipios");
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
