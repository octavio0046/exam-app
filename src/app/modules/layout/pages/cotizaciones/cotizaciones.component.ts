import { Component, OnInit } from '@angular/core';
import { AgentesService, ClientesService, CotizacionesService,ObjectService } from 'src/app/services/services.index';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import {
  FormGroup,
  FormBuilder,
  Validators
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import {
  IEstados,
  ICotizaciones,Cotizaciones, IAgentes, IClientes
} from 'src/app/services/interface.index';

@Component({
  selector: 'app-cotizaciones',
  templateUrl: './cotizaciones.component.html',
  styleUrls: ['./cotizaciones.component.scss']
})
export class CotizacionesComponent implements OnInit {
  mClientes:IClientes[];
  mAgentes:IAgentes[];
  mEstado: IEstados[];
  submitted = false;
  mCotizaciones: ICotizaciones[];
  mForma: FormGroup;
  mCotizacionesSelect: ICotizaciones;
  mFormaEstado: string;
  public loading = false;
  Pkey: number;
  constructor(
    private modalService: NgbModal,
    private service: CotizacionesService,
    private serviceAgentes: AgentesService,
    private serviceClientess: ClientesService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private state: ObjectService,
  ) { 
    this.mAgentes=[];
    this.mClientes=[];
    this.mForma = this.generarFormulario();
    this.mCotizaciones=[];
    this.mCotizacionesSelect = Cotizaciones.empy();
    this.mFormaEstado = '4';
    this.mEstado = this.state.Estados();
    this.Pkey=0;
  }

  ngOnInit(): void {
    this.getAll();
    this.getAllAgentes();
    this.getAllClientess();
  }



  get f() { return this.mForma.controls; }

  generarFormulario() {
    return this.formBuilder.group({
      Vencimiento: ['', Validators.required],
      TCAgenteId: ['', Validators.required],
      TCClienteId: ['', Validators.required],
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
      console.log(data)
      this.mForma.setValue({
        Vencimiento: data[0].Vencimiento,
        TCAgenteId: data[0].TCAgenteId,
        TCClienteId: data[0].TCClienteId,
        Estado: data[0].Estado
      });
      this.loading = false;
    }).catch((error: { message: string | undefined; }) => {
      this.loading = false;
      this.toastr.error(error.message, "Cotizaciones");
    });
  }

  getAll() {
    this.loading = true;
    this.service.AllPage().then(data => {
      console.log(data)
      this.mCotizaciones = data;
     this.loading = false;
    }).catch(error => {
      this.toastr.error(error.message, "Cotizaciones");
      this.loading = false;
    });
  }


  getAllAgentes() {
    this.loading = true;
    this.serviceAgentes.AllPage().then(data => {
      this.mAgentes = data;
     this.loading = false;
    }).catch(error => {
      this.toastr.error(error.message, "Agentes");
      this.loading = false;
    });
  }

  getAllClientess() {
    this.loading = true;
    this.serviceClientess.AllPage().then(data => {
      this.mClientes = data;
     this.loading = false;
    }).catch(error => {
      this.toastr.error(error.message, "Agentes");
      this.loading = false;
    });
  }



  onSubmit() {
    this.submitted = true;
    if (this.mForma.invalid) {
      return;
    } else {
      this.mCotizacionesSelect = this.mForma.value as ICotizaciones;
      if (this.mFormaEstado === '1') {
        this.guardar();
      } else if (this.mFormaEstado === '3') {
        this.actualizar(this.Pkey);
      }
    }
  }


  guardar() {
    this.loading = true;
    this.service.New(this.mCotizacionesSelect).then(data => {
      this.toastr.success(data.message, "Cotizaciones");
      this.mFormaEstado = '4';
      this.mCotizaciones.unshift(data);
      this.loading = false;
   //   this.modalRef.close();
   this.getDismissReason('');
    }).catch(error => {
      this.loading = false;
      this.toastr.error(error.message, "Cotizaciones");
    });
  }

  actualizar(pKey: number) {
    this.loading = true;
    this.service.Update(this.mCotizacionesSelect, pKey).then(data => {
      this.toastr.success(data.message, "Cotizaciones");
      this.getDismissReason('');
      this.mCotizaciones = this.mCotizaciones.map((object: ICotizaciones) => {
        if (object.id === pKey) {
          return object = data;
        } else {
          return object;
        }
      });

      this.loading = false;
    }).catch(error => {
      this.loading = false;
      this.toastr.error(error.message, "Cotizaciones");
    });
  }

  
  eliminar(pKey: number) {
    this.loading = true;
    this.service.Delete(pKey).then(data => {
      this.toastr.success(data.message, "Cotizaciones");
        this.mCotizaciones = this.mCotizaciones.filter((object: ICotizaciones) => object.id !== pKey);
      this.loading = false;
    }).catch(error => {
      this.loading = false;
      this.toastr.error(error.message, "Cotizaciones");
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
