export class SolicitudReserva {

  idCliente: Number;
  idCarro: Number;
  fechaInicial: String;
  dias: Number;

  constructor(idCliente: Number, idCarro: Number, fechaInicial: String, dias: Number) {
    this.idCliente = idCliente;
    this.idCarro = idCarro;
    this.fechaInicial = fechaInicial;
    this.dias = dias;
  }

}
