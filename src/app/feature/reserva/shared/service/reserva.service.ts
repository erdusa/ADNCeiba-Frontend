import { Injectable } from "@angular/core";
import { HttpService } from "@core/services/http.service";
import { environment } from "src/environments/environment";
import { Cliente } from "../model/cliente";
import { ReservaVigente } from "../model/reserva-vigente";
import { SolicitudReserva } from "../model/solicitud-reserva";

@Injectable({
  providedIn: "root",
})
export class ReservaService {
  constructor(protected http: HttpService) { }

  public consultarCliente(documento: String) {
    return this.http.doGet<Cliente>(
      `${environment.endpoint}/clientes/${documento}`
    );
  }

  public listarReservasVigentes(idCliente: Number) {
    return this.http.doGet<ReservaVigente[]>(
      `${environment.endpoint}/reservas/cliente/${idCliente}`,
      this.http.optsName("listar reservas vigentes de cliente")
    );
  }

  public listarCarrosDisponibles(fechaInicial: String, dias: Number, gama: String
  ) {
    return this.http.doGet(
      `${environment.endpoint}/carros-disponibles?fechaInicial=${fechaInicial}&dias=${dias}&gama=${gama}`,
      this.http.optsName("listar carros disponibles")
    );
  }

  public registrarReserva(solicitudReserva: SolicitudReserva) {
    return this.http.doPost<SolicitudReserva, boolean>(
      `${environment.endpoint}/reservas`,
      solicitudReserva, this.http.optsName("reservar carro")
    );
  }

  public cancelarReserva(idReserva: Number) {
    return this.http.doPut<any, boolean>(
      `${environment.endpoint}/reservas/cancelar/${idReserva}`, null,
      this.http.optsName("Cancelar reserva")
    );
  }
}
