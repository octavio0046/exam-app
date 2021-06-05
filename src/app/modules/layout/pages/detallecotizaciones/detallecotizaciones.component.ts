import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DetallecotizacionesService, ObjectService, VehiculosService } from 'src/app/services/services.index';
import { ToastrService } from 'ngx-toastr';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import {
  FormGroup,
  FormBuilder,
  Validators
} from '@angular/forms';
import { IDetalle, Detalle, IEstados, IVehiculos } from 'src/app/services/interface.index';
@Component({
  selector: 'app-detallecotizaciones',
  templateUrl: './detallecotizaciones.component.html',
  styleUrls: ['./detallecotizaciones.component.scss']
})
export class DetallecotizacionesComponent implements OnInit {
  mVehiculos: IVehiculos[];
  mEstado: IEstados[];
  submitted = false;
  id: number;
  mDetalles: any;
  mFormaEstado: string;
  mForma: FormGroup;
  public loading = false;
  Pkey: number;
  mDetallesSelect: IDetalle;
  constructor(
    private modalService: NgbModal,
    private serviceDetalle: DetallecotizacionesService,
    private serviceVehiculos: VehiculosService,
    private routeAc: ActivatedRoute,
    private toastr: ToastrService,
    private formBuilder: FormBuilder,
    private state: ObjectService,

  ) {
    this.mEstado = this.state.Estados();
    this.id = 0;
    this.mDetalles = [];
    this.mFormaEstado = '4';
    this.mForma = this.generarFormulario();
    this.Pkey = 0;
    this.mVehiculos = [];
    this.mDetallesSelect = Detalle.empy();
  }

  ngOnInit(): void {
    this.getAllVehiculos();
    this.id = this.routeAc.snapshot.params.id;
    if (this.id) {
      this.getDetallesXId();
    }
  }

  get f() { return this.mForma.controls; }

  generarFormulario() {
    return this.formBuilder.group({
      Descripcion: ['', Validators.required],
      TCVehiculoId: ['', Validators.required],
      Estado: ['', Validators.required],
    });
  }


  modificar(content: any, pkey: number) {
    this.Pkey = pkey;
    this.mForma.enable();
    this.getXId(this.Pkey);
    this.modalService.open(content, { size: 'lg', centered: true });
    this.mFormaEstado = '3';
  }

  ver(content: any, pkey: number) {
    this.getXId(pkey);
    this.modalService.open(content, { size: 'lg', centered: true });
    this.mFormaEstado = '2';
    this.mForma.disable();
  }


  nuevo(content: any) {
    this.modalService.open(content, { size: 'lg' });
    this.mFormaEstado = "1";
  }


  onSubmit() {
    this.submitted = true;
    if (this.mForma.invalid) {
      return;
    } else {
      this.mDetallesSelect = this.mForma.value as IDetalle;
      if (this.mFormaEstado === '1') {
        this.guardar();
      } else if (this.mFormaEstado === '3') {
        this.actualizar(this.Pkey);
      }
    }
  }

  actualizar(pKey: number) {
    this.loading = true;
    this.serviceDetalle.Update(this.mDetallesSelect, pKey).then(data => {
      this.toastr.success(data.message, "Marcas");
      this.getDismissReason('');
      this.getDetallesXId();
      this.loading = false;
    }).catch(error => {
      this.loading = false;
      this.toastr.error(error.message, "Marcas");
    });
  }



  guardar() {
    this.loading = true;
    this.mDetallesSelect.TCCotizacionId = this.id;
    this.serviceDetalle.New(this.mDetallesSelect).then(data => {     
      this.toastr.success(data.message, "Detalles");
      this.mFormaEstado = '4';
      this.getDetallesXId();
      this.loading = false;
      //   this.modalRef.close();
      this.getDismissReason('');
    }).catch(error => {
      this.loading = false;
      this.toastr.error(error.message, "Detalles");
    });
  }



  eliminar(pKey: number) {
    this.loading = true;
    this.serviceDetalle.Delete(pKey).then(data => {
      this.toastr.success(data.message, "Detalles");
      this.getDetallesXId();
      this.loading = false;
    }).catch(error => {
      this.loading = false;
      this.toastr.error(error.message, "Detalles");
    });
  }


  getXId(pkey: number) {
    this.loading = true;
    this.serviceDetalle.AllXId(pkey).then(data => {
      this.mForma.setValue({
        Descripcion: data[0].Descripcion,
        Estado: data[0].Estado,
        TCVehiculoId: data[0].TCVehiculoId
      });
      this.loading = false;
    }).catch((error: { message: string | undefined; }) => {
      this.loading = false;
      this.toastr.error(error.message, "Marcas");
    });
  }



  getDetallesXId() {
    this.serviceDetalle.AllXIdDetalle(this.id).then(data => {
      this.mDetalles = data;
    }).catch(error => {
      this.toastr.error(error, "Detalles")
    });
  }



  getAllVehiculos() {
    this.loading = true;
    this.serviceVehiculos.AllPage().then(data => {
      this.mVehiculos = data;
      this.loading = false;
    }).catch(error => {
      this.toastr.error(error.message, "Departamentos");
      this.loading = false;
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
