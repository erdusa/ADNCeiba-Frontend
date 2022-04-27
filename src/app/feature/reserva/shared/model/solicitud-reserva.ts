export class SolicitudReserva {

  idCliente: number;
  idCarro: number;
  fechaInicial: string;
  dias: number;

  constructor(idCliente: number, idCarro: number, fechaInicial: string, dias: number) {
    this.idCliente = idCliente;
    this.idCarro = idCarro;
    this.fechaInicial = fechaInicial;
    this.dias = dias;
  }

}
