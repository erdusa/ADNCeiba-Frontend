export class ReservaVigente {
  idReserva: Number;
  fechaInicial: String;
  fechaFinal: String;
  marca: String;
  modelo: Number;
  placa: String;
  gama: String;
  valor: Number;

  constructor(idReserva: Number,fechaInicial: String,fechaFinal: String,marca: String,modelo: Number,placa: String,gama: String,valor: Number) {
    this.idReserva = idReserva;
    this.fechaInicial = fechaInicial;
    this.fechaFinal = fechaFinal;
    this.marca = marca;
    this.modelo = modelo;
    this.placa = placa;
    this.gama = gama;
    this.valor = valor;
  }

}
