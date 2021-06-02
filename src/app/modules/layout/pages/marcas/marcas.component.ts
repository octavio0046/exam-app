import { Component, OnInit } from '@angular/core';
import { MarcasService,ObjectService } from 'src/app/services/services.index';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import {
  FormGroup,
  FormBuilder,
  Validators
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import {
  IEstados,
  IMarcas,Marcas
} from 'src/app/services/interface.index';

@Component({
  selector: 'app-marcas',
  templateUrl: './marcas.component.html',
  styleUrls: ['./marcas.component.scss']
})
export class MarcasComponent implements OnInit {
  mEstado: IEstados[];
  submitted = false;
  mMarcas: IMarcas[];
  mForma: FormGroup;
  mMarcasSelect: IMarcas;
  mFormaEstado: string;
  public loading = false;
  constructor(
    private modalService: NgbModal,
    private service: MarcasService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private state: ObjectService,
  ) { 
    this.mForma = this.generarFormulario();
    this.mMarcas=[];
    this.mMarcasSelect = Marcas.empy();
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
      this.mMarcas = data;
      console.log("marcas",this.mMarcas)
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
      this.mMarcasSelect = this.mForma.value as IMarcas;
      if (this.mFormaEstado === '1') {
        this.guardar();
      } else if (this.mFormaEstado === '3') {
    //    this.actualizar(this.Pkey);
      }
    }
  }


  guardar() {
    this.loading = true;
    this.service.New(this.mMarcasSelect).then(data => {
      this.toastr.success(data.message, "Marcas");
      this.mFormaEstado = '4';
      this.mMarcas.unshift(data.response);
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
