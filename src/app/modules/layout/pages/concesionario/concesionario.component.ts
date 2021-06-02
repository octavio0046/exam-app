import { Component, OnInit } from '@angular/core';
import { MunicipiosService, ConcesionarioService,ObjectService } from 'src/app/services/services.index';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import {
  FormGroup,
  FormBuilder,
  Validators
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import {
  IMunicipios,
  IEstados,
  IConcesionario,Concesionario
} from 'src/app/services/interface.index';

@Component({
  selector: 'app-concesionario',
  templateUrl: './concesionario.component.html',
  styleUrls: ['./concesionario.component.scss']
})
export class ConcesionarioComponent implements OnInit {
  mMunicipios:IMunicipios[];
  mEstado: IEstados[];
  submitted = false;
  mConcesionario: IConcesionario[];
  mForma: FormGroup;
  mConcesionarioSelect: IConcesionario;
  mFormaEstado: string;
  public loading = false;
  Pkey: number;
  constructor(
    private modalService: NgbModal,
    private service: ConcesionarioService,
    private serviceMunicipios: MunicipiosService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private state: ObjectService,
  ) { 
    this.mMunicipios=[];
    this.mForma = this.generarFormulario();
    this.mConcesionario=[];
    this.mConcesionarioSelect = Concesionario.empy();
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
      Nombre: ['', Validators.required],
      Razon: ['', Validators.required],
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
         Nombre: data[0].Nombre,
         Razon: data[0].Razon,
         TCMunicipioId: data[0].Razon,
        Estado: data[0].Estado
      });
      this.loading = false;
    }).catch((error: { message: string | undefined; }) => {
      this.loading = false;
      this.toastr.error(error.message, "Concesionario");
    });
  }

  getAll() {
    this.loading = true;
    this.service.AllPage().then(data => {
      this.mConcesionario = data;
     this.loading = false;
    }).catch(error => {
      this.toastr.error(error.message, "Concesionario");
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
      this.mConcesionarioSelect = this.mForma.value as IConcesionario;
      if (this.mFormaEstado === '1') {
        this.guardar();
      } else if (this.mFormaEstado === '3') {
        this.actualizar(this.Pkey);
      }
    }
  }


  guardar() {
    this.loading = true;
    this.service.New(this.mConcesionarioSelect).then(data => {
      this.toastr.success(data.message, "Concesionario");
      this.mFormaEstado = '4';
      this.mConcesionario.unshift(data);
      this.loading = false;
   //   this.modalRef.close();
   this.getDismissReason('');
    }).catch(error => {
      this.loading = false;
      this.toastr.error(error.message, "Concesionario");
    });
  }

  actualizar(pKey: number) {
    this.loading = true;
    this.service.Update(this.mConcesionarioSelect, pKey).then(data => {
      this.toastr.success(data.message, "Concesionario");
      this.getDismissReason('');
      this.mConcesionario = this.mConcesionario.map((object: IConcesionario) => {
        if (object.id === pKey) {
          return object = data;
        } else {
          return object;
        }
      });

      this.loading = false;
    }).catch(error => {
      this.loading = false;
      this.toastr.error(error.message, "Concesionario");
    });
  }

  
  eliminar(pKey: number) {
    this.loading = true;
    this.service.Delete(pKey).then(data => {
      this.toastr.success(data.message, "Concesionario");
        this.mConcesionario = this.mConcesionario.filter((object: IConcesionario) => object.id !== pKey);
      this.loading = false;
    }).catch(error => {
      this.loading = false;
      this.toastr.error(error.message, "Concesionario");
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
