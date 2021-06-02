import { Component, OnInit } from '@angular/core';
import { MarcasService,ObjectService,DepartamentosService } from 'src/app/services/services.index';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import {
  FormGroup,
  FormBuilder,
  Validators
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import {
  IEstados,
  IDepartamentos,Departamentos
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
  constructor(
    private modalService: NgbModal,
    private service: DepartamentosService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private state: ObjectService,
  ) { 
    this.mForma = this.generarFormulario();
    this.mDepartamentos=[];
    this.mDepartamentosSelect = Departamentos.empy();
    this.mFormaEstado = '4';
    this.mEstado = this.state.Estados();
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


  getAll() {
    this.loading = true;
    this.service.AllPage().then(data => {
      this.mDepartamentos = data;
      console.log("marcas",this.mDepartamentos)
     this.loading = false;
    }).catch(error => {
      this.toastr.error(error.message, "Departametnos");
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
    //    this.actualizar(this.Pkey);
      }
    }
  }


  guardar() {
    this.loading = true;
    this.service.New(this.mDepartamentosSelect).then(data => {
      this.toastr.success(data.message, "Departamentos");
      this.mFormaEstado = '4';
      this.mDepartamentos.unshift(data.response);
      this.loading = false;
   //   this.modalRef.close();
   this.getDismissReason('');
    }).catch(error => {
      this.loading = false;
      this.toastr.error(error.message, "Departamentos");
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
