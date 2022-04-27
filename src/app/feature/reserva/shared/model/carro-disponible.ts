export class CarroDisponible {

  fechaInicial: string;
  fechaFinal: string;
  idCarro: number;
  marca: string;
  modelo: number;
  placa: string;
  valor: number;

  constructor(fechaInicial: string, fechaFinal: string, idCarro: number, marca: string, modelo: number, placa: string, valor: number) {
    this.fechaInicial = fechaInicial;
    this.fechaFinal = fechaFinal;
    this.idCarro = idCarro;
    this.marca = marca;
    this.modelo = modelo;
    this.placa = placa;
    this.valor = valor;
  }
}
