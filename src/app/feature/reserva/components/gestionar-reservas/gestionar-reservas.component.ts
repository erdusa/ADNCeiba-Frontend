import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { ErrorPeticion } from '@core/modelo/error-peticion';
import { ReservaVigente } from '@reserva/shared/model/reserva-vigente';
import { ReservaService } from '@reserva/shared/service/reserva.service';
import { CrearReservaComponent } from '../crear-reserva/crear-reserva.component';

const AVISO = 'AVISO';
const NO_TIENE_RESERVAS_VIGENTES = "No tiene reservas vigentes";
const DEBE_CONSULTAR_UN_CLIENTE = "Debe consultar primero un cliente";
@Component({
  selector: 'app-gestionar-reservas',
  templateUrl: './gestionar-reservas.component.html',
  styleUrls: ['./gestionar-reservas.component.css']
})
export class GestionarReservasComponent implements OnInit {

  formConsultaCliente: FormGroup;
  nombreCliente: string;
  idCliente: number;
  dataSource: MatTableDataSource<ReservaVigente>
  displayedColumns: string[] = ['idReserva', 'fechaInicial', 'fechaFinal', 'marca', 'modelo', 'placa', 'gama', 'valor', 'cancelar'];

  constructor(
    private reservaService: ReservaService,
    private snackBar: MatSnackBar,
    protected dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.construirFormulario();
    this.reservaService.getMensajeCambio().subscribe(data => {
      this.mostrarMensaje(data);
      this.listarReservasVigentes();
    })
  }

  construirFormulario() {
    this.formConsultaCliente = new FormGroup({
      numeroDocumento: new FormControl("", [Validators.required])
    });
  }

  buscarCliente() {

    if (this.formConsultaCliente.value.numeroDocumento.length != "") {
      this.reservaService.consultarCliente(this.formConsultaCliente.value.numeroDocumento).subscribe(
        {
          next: data => {
            this.nombreCliente = data.nombre;
            this.idCliente = data.id;
            this.listarReservasVigentes();
          },
          error: (err: ErrorPeticion) => {
            this.nombreCliente = "";
            this.dataSource = null;
            this.mostrarMensaje(err.error.mensaje);
          },
          complete: () => {

          }
        })
    }
  }

  listarReservasVigentes() {
    this.reservaService.listarReservasVigentes(this.idCliente).subscribe({
      next: data => {
        if (data.length == 0) {
          this.mostrarMensaje(NO_TIENE_RESERVAS_VIGENTES);
        }
        this.dataSource = new MatTableDataSource(data);
      },
      error: (err: ErrorPeticion) => {
        this.dataSource = null;
        this.mostrarMensaje(err.error.mensaje);
      }
    });
  }

  agregar() {
    if (this.idCliente == null) {
      this.mostrarMensaje(DEBE_CONSULTAR_UN_CLIENTE)
      return;
    }
    this.dialog.open(CrearReservaComponent, {
      width: '800px',
      data: this.idCliente,
    });
  }

  cancelar(idReserva: number) {
    this.reservaService.cancelarReserva(idReserva).subscribe({
      error: (err: ErrorPeticion) => {
        this.mostrarMensaje(err.error.mensaje);
      },
      complete: () => {
        this.listarReservasVigentes();
      }
    });
  }

  private mostrarMensaje(mensaje: string) {
    this.snackBar.open(mensaje, AVISO, {
      duration: 5000
    });
  }


}
