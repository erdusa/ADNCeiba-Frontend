import { Injectable } from "@angular/core";
import { HttpService } from "@core/services/http.service";
import { Subject } from "rxjs";
import { environment } from "src/environments/environment";
import { CarroDisponible } from "../model/carro-disponible";
import { Cliente } from "../model/cliente";
import { ReservaVigente } from "../model/reserva-vigente";
import { SolicitudReserva } from "../model/solicitud-reserva";

@Injectable()
export class ReservaService {
  private mensajeCambio: Subject<string> = new Subject<string>();

  constructor(protected http: HttpService) { }

  getMensajeCambio() {
    return this.mensajeCambio.asObservable();
  }

  setMensajeCambio(msj: string) {
    this.mensajeCambio.next(msj);
  }

  public consultarCliente(documento: string) {
    return this.http.doGet<Cliente>(
      `${environment.endpoint}/clientes/${documento}`
    );
  }

  public listarReservasVigentes(idCliente: number) {
    return this.http.doGet<ReservaVigente[]>(
      `${environment.endpoint}/reservas/cliente/${idCliente}`,
      this.http.optsName("listar reservas vigentes de cliente")
    );
  }

  public listarCarrosDisponibles(fechaInicial: string, dias: number, gama: string
  ) {
    return this.http.doGet<CarroDisponible[]>(
      `${environment.endpoint}/reservas/carros-disponibles?fechaInicial=${fechaInicial}&dias=${dias}&gama=${gama}`,
      this.http.optsName("listar carros disponibles")
    );
  }

  public registrarReserva(solicitudReserva: SolicitudReserva) {
    console.log(solicitudReserva)
    return this.http.doPost<SolicitudReserva, number>(
      `${environment.endpoint}/reservas`, solicitudReserva,
      this.http.optsName("reservar carro")
    );
  }

  public cancelarReserva(idReserva: number) {
    return this.http.doPut<any, boolean>(
      `${environment.endpoint}/reservas/cancelar/${idReserva}`, null,
      this.http.optsName("Cancelar reserva")
    );
  }
}
