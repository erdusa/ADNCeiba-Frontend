import { DatePipe } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { ErrorPeticion } from '@core/modelo/error-peticion';
import { CarroDisponible } from '@reserva/shared/model/carro-disponible';
import { SolicitudReserva } from '@reserva/shared/model/solicitud-reserva';
import { ReservaService } from '@reserva/shared/service/reserva.service';

const FORMATO_FECHA_HORA = 'dd/MM/yyyy HH:mm';
const FORMATO_FECHA_RESERVAR = 'yyyy-MM-dd HH:mm:ss';
const NO_HAY_CARROS_DISPONIBLES = "No hay carros disponibles";
const AVISO = "AVISO";
const NUMERO_DE_HORAS_MINIMAS = 0;
const NUMERO_DE_MINUTOS_MINIMOS = 0;
const NUMERO_DE_HORAS_MAXIMAS = 23;
const NUMERO_DE_MINUTOS_MAXIMOS = 59;


const REGISTRO_EXITOSO = "Se registró existosamente con número: ";
@Component({
  selector: 'app-crear-reserva',
  templateUrl: './crear-reserva.component.html',
  styleUrls: ['./crear-reserva.component.css']
})
export class CrearReservaComponent implements OnInit {

  formBuscarCarros: FormGroup;
  dataSource: MatTableDataSource<CarroDisponible>;
  displayedColumns: string[] = ['fechaInicial', 'fechaFinal', 'marca', 'modelo', 'valor', 'reservar'];
  fechaManiana: Date = new Date();

  HORA_MINIMA = NUMERO_DE_HORAS_MINIMAS;
  MINUTOS_MINIMOS = NUMERO_DE_MINUTOS_MINIMOS;
  HORA_MAXIMA = NUMERO_DE_HORAS_MAXIMAS;
  MINUTOS_MAXIMOS = NUMERO_DE_MINUTOS_MAXIMOS;

  constructor(
    private reservaService: ReservaService,
    private datepipe: DatePipe,
    private snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<CrearReservaComponent>,
    @Inject(MAT_DIALOG_DATA) private idCliente: number,
  ) { }

  ngOnInit(): void {
    this.construirFormulario();
    this.fechaManiana.setDate(this.fechaManiana.getDate() + 1);
  }

  construirFormulario() {
    this.formBuscarCarros = new FormGroup({
      fecha: new FormControl(this.fechaManiana, [Validators.required]),
      hora: new FormControl(8, [Validators.required, Validators.min(NUMERO_DE_HORAS_MINIMAS), Validators.max(NUMERO_DE_HORAS_MAXIMAS)]),
      minuto: new FormControl(0, [Validators.required, Validators.min(NUMERO_DE_MINUTOS_MINIMOS), Validators.max(NUMERO_DE_MINUTOS_MAXIMOS)]),
      dias: new FormControl(1, [Validators.required, Validators.min(1)]),
      gama: new FormControl("ALTA", [Validators.required]),
    });
  }

  buscar() {
    let fechaHora = this.generarFechaCompleta();

    let fecha = this.datepipe.transform(fechaHora, FORMATO_FECHA_HORA);
    let dias = this.formBuscarCarros.value.dias;
    let gama = this.formBuscarCarros.value.gama;

    this.reservaService.listarCarrosDisponibles(fecha, dias, gama).subscribe({
      next: data => {
        if (data.length == 0) {
          this.mostrarMensaje(NO_HAY_CARROS_DISPONIBLES);
        }
        this.dataSource = new MatTableDataSource(data);
      },
      error: (err: ErrorPeticion) => {
        this.dataSource = null;
        this.mostrarMensaje(err.error.mensaje);
      }
    });
  }

  reservar(idCarro: number) {
    let fecha = this.datepipe.transform(this.generarFechaCompleta(), FORMATO_FECHA_RESERVAR);
    let dias = this.formBuscarCarros.value.dias;
    let solicitudReserva = new SolicitudReserva(this.idCliente, idCarro, fecha, dias);
    this.reservaService.registrarReserva(solicitudReserva).subscribe({
      next: idReserva => {
        this.reservaService.setMensajeCambio(REGISTRO_EXITOSO + idReserva);
      },
      error: (err: ErrorPeticion) => {
        this.mostrarMensaje(err.error.mensaje);
      },
      complete: () => {
        this.cerrar();
      }
    })
  }

  private generarFechaCompleta() {
    let fechaHora = new Date(this.formBuscarCarros.value.fecha);
    fechaHora.setHours(this.formBuscarCarros.value.hora);
    fechaHora.setMinutes(this.formBuscarCarros.value.minuto);
    return fechaHora;
  }

  public cerrar() {
    this.dialogRef.close();
  }

  private mostrarMensaje(mensaje: string) {
    this.snackBar.open(mensaje, AVISO, {
      duration: 5000
    });
  }

}
