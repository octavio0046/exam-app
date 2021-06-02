


import { Component, OnInit } from '@angular/core';
import { ConcesionarioService,MunicipiosService,ObjectService } from 'src/app/services/services.index';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import {
  FormGroup,
  FormBuilder,
  Validators
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import {
  IEstados,
  IConcesionario,Concesionario, IMunicipios,Municipios
} from 'src/app/services/interface.index';

@Component({
  selector: 'app-concesionario',
  templateUrl: './concesionario.component.html',
  styleUrls: ['./concesionario.component.scss']
})
export class ConcesionarioComponent implements OnInit {
  mMunicipio: IMunicipios[];
  mEstado: IEstados[];
  submitted = false;
  mConcesionarios: IConcesionario[];
  mForma: FormGroup;
  mConcesionarioSelect: IConcesionario;
  mFormaEstado: string;
  public loading = false;
  constructor(
    private modalService: NgbModal,
    private service: ConcesionarioService,
    private serviceMunicipios: MunicipiosService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private state: ObjectService,
  ) { 
    this.mForma = this.generarFormulario();
    this.mConcesionarios=[];
    this.mConcesionarioSelect = Concesionario.empy();
    this.mFormaEstado = '4';
    this.mEstado = this.state.Estados();
    this.mMunicipio=[];
  }

  ngOnInit(): void {
    this.getAll();
    this.getAllMunicipios();
  }



  get f() { return this.mForma.controls; }

  generarFormulario() {
    return this.formBuilder.group({
      TCMunicipioId: ['', Validators.required],
      Razon: ['', Validators.required],
      Estado:  ['', Validators.required],
    });
  }

  nuevo(content: any) {
    this.modalService.open(content, { size: 'lg' });
    this.mFormaEstado ="1";
  }


  getAll() {
    this.loading = true;
    this.service.AllPage().then(data => {
      this.mConcesionarios = data;
      console.log("concesionario",this.mConcesionarios)
     this.loading = false;
    }).catch(error => {
      this.toastr.error(error.message, "Marcas");
      this.loading = false;
    });
  }


  getAllMunicipios() {
    this.loading = true;
    this.serviceMunicipios.AllPage().then(data => {
      this.mMunicipio = data;
      console.log("municipios",this.mMunicipio)
     this.loading = false;
    }).catch(error => {
      this.toastr.error(error.message, "Marcas");
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
    //    this.actualizar(this.Pkey);
      }
    }
  }


  guardar() {
    this.loading = true;
    this.service.New(this.mConcesionarioSelect).then(data => {
      this.toastr.success(data.message, "Marcas");
      this.mFormaEstado = '4';
      this.mConcesionarios.unshift(data.response);
      this.loading = false;
   //   this.modalRef.close();
   this.getDismissReason('');
    }).catch(error => {
      this.loading = false;
      this.toastr.error(error.message, "Marcas");
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
