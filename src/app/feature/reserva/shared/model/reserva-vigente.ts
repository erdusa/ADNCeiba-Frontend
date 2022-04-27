export class ReservaVigente {
  idReserva: number;
  fechaInicial: string;
  fechaFinal: string;
  marca: string;
  modelo: number;
  placa: string;
  gama: string;
  valor: number;

  constructor(idReserva: number, fechaInicial: string, fechaFinal: string, marca: string, modelo: number, placa: string, gama: string, valor: number) {
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
