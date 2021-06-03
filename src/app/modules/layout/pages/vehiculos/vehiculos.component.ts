import { Component, OnInit } from '@angular/core';
import { VehiculosService,ObjectService, MarcasService, ConcesionarioService } from 'src/app/services/services.index';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import {
  FormGroup,
  FormBuilder,
  Validators
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import {
  IMarcas,
  IEstados,
  IVehiculos,Vehiculos, IConcesionario
} from 'src/app/services/interface.index';

@Component({
  selector: 'app-vehiculos',
  templateUrl: './vehiculos.component.html',
  styleUrls: ['./vehiculos.component.scss']
})
export class VehiculosComponent implements OnInit {
  mMarcas:IMarcas[];
  mConcesionarios:IConcesionario[];
  mEstado: IEstados[];
  submitted = false;
  mVehiculos: IVehiculos[];
  mForma: FormGroup;
  mVehiculosSelect: IVehiculos;
  mFormaEstado: string;
  public loading = false;
  Pkey: number;
  constructor(
    private modalService: NgbModal,
    private service: VehiculosService,
    private serviceMarcas: MarcasService,
    private ServiceConcesionario: ConcesionarioService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private state: ObjectService,
  ) { 
    this.mMarcas=[];
    this.mConcesionarios=[];
    this.mForma = this.generarFormulario();
    this.mVehiculos=[];
    this.mVehiculosSelect = Vehiculos.empy();
    this.mFormaEstado = '4';
    this.mEstado = this.state.Estados();
    this.Pkey=0;
  }

  ngOnInit(): void {
    this.getAll();
    this.getAllMarcas();
    this.getAllConcesionarios();
  }



  get f() { return this.mForma.controls; }

  generarFormulario() {
    return this.formBuilder.group({
      Modelo: ['', Validators.required],
      Precio: ['', Validators.required],
      Color: ['', Validators.required],
      Estado: ['', Validators.required],
      Tipo: ['', Validators.required],
      Traccion: ['', Validators.required],
      TCMarcaId:  ['', Validators.required],
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
         Modelo: data[0].Modelo,
         Precio: data[0].Precio,
         Color: data[0].Color,
         Tipo: data[0].Tipo,
         Traccion: data[0].Traccion,
         TCMarcaId: data[0].TCMarcaId,
         TCConcesionarioId: data[0].TCConcesionarioId,
        Estado: data[0].Estado
      });
      this.loading = false;
    }).catch((error: { message: string | undefined; }) => {
      this.loading = false;
      this.toastr.error(error.message, "Vehiculos");
    });
  }

  getAll() {
    this.loading = true;
    this.service.AllPage().then(data => {
      this.mVehiculos = data;
     this.loading = false;
    }).catch(error => {
      this.toastr.error(error.message, "Vehiculos");
      this.loading = false;
    });
  }

  
  getAllMarcas() {
    this.loading = true;
    this.serviceMarcas.AllPage().then(data => {
      this.mMarcas = data;
     this.loading = false;
    }).catch(error => {
      this.toastr.error(error.message, "Marcas");
      this.loading = false;
    });
  }


  getAllConcesionarios() {
    this.loading = true;
    this.ServiceConcesionario.AllPage().then(data => {
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
      this.mVehiculosSelect = this.mForma.value as IVehiculos;
      if (this.mFormaEstado === '1') {
        this.guardar();
      } else if (this.mFormaEstado === '3') {
        this.actualizar(this.Pkey);
      }
    }
  }


  guardar() {
    this.loading = true;
    this.service.New(this.mVehiculosSelect).then(data => {
      this.toastr.success(data.message, "Vehiculos");
      this.mFormaEstado = '4';
      this.mVehiculos.unshift(data);
      this.loading = false;
   //   this.modalRef.close();
   this.getDismissReason('');
    }).catch(error => {
      this.loading = false;
      this.toastr.error(error.message, "Vehiculos");
    });
  }

  actualizar(pKey: number) {
    this.loading = true;
    this.service.Update(this.mVehiculosSelect, pKey).then(data => {
      this.toastr.success(data.message, "Vehiculos");
      this.getDismissReason('');
      this.mVehiculos = this.mVehiculos.map((object: IVehiculos) => {
        if (object.id === pKey) {
          return object = data;
        } else {
          return object;
        }
      });

      this.loading = false;
    }).catch(error => {
      this.loading = false;
      this.toastr.error(error.message, "Vehiculos");
    });
  }

  
  eliminar(pKey: number) {
    this.loading = true;
    this.service.Delete(pKey).then(data => {
      this.toastr.success(data.message, "Vehiculos");
        this.mVehiculos = this.mVehiculos.filter((object: IVehiculos) => object.id !== pKey);
      this.loading = false;
    }).catch(error => {
      this.loading = false;
      this.toastr.error(error.message, "Vehiculos");
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
