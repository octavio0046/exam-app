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
  ICotizaciones,Cotizaciones, IAgentes, IClientes, IRptFecha
} from 'src/app/services/interface.index';
import { Router } from '@angular/router';
interface Post {
  startDate: Date;
  endDate: Date;
}
import { formatDate, DatePipe } from '@angular/common';

@Component({
  selector: 'app-cotizaciones',
  templateUrl: './cotizaciones.component.html',
  styleUrls: ['./cotizaciones.component.scss']
})
export class CotizacionesComponent implements OnInit {
  post: Post = {
    startDate: new Date(Date.now()),
    endDate: new Date(Date.now())
  }
  mClientes:IClientes[];
  mAgentes:IAgentes[];
  mEstado: IEstados[];
  submitted = false;
  submitted2 = false;
  mCotizaciones: ICotizaciones[];
  mForma: FormGroup;
  mForma2: FormGroup;
  mCotizacionesSelect: ICotizaciones;
  mFormaEstado: string;
  public loading = false;
  Pkey: number;
  mVentasFechaSelect: any;
  constructor(
    private modalService: NgbModal,
    private service: CotizacionesService,
    private serviceAgentes: AgentesService,
    private serviceClientess: ClientesService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private state: ObjectService,
    private router: Router,
  ) { 
    this.mAgentes=[];
    this.mClientes=[];
    this.mForma = this.generarFormulario();
    this.mForma2 = this.generarFormulario2();
    this.mCotizaciones=[];
    this.mCotizacionesSelect = Cotizaciones.empy();
    this.mFormaEstado = '4';
    this.mEstado = this.state.Estados();
    this.Pkey=0;
    this.mVentasFechaSelect=[];
  }

  ngOnInit(): void {
    this.getAllAgentes();
    this.getAllClientess();
    this.onSubmit2();
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

 // get ff() { return this.mForma2.controls; }

  generarFormulario2() {
    return this.formBuilder.group({
      FechaInicio: [formatDate(this.post.startDate, 'yyyy-MM-dd', 'en')],
      FechaFin: [formatDate(this.post.endDate, 'yyyy-MM-dd', 'en')],
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

  detalle(id:number){
    this.router.navigate(['/detalle', id], { skipLocationChange: true });
  }

  getXId(pkey:number) {
    this.loading = true;
    this.service.AllXId(pkey).then(data => {
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
    this.service.AllPage(this.mVentasFechaSelect).then(data => {
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


  onSubmit2() {
    this.submitted = true;
    if (this.mForma2.invalid) {
      return;
    } else {
      this.mVentasFechaSelect = this.mForma2.value as IRptFecha;
        this.getAll();
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
