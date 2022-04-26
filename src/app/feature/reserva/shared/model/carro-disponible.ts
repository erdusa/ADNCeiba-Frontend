export class CarroDisponible {

  idCarro: Number;
  marca: String;
  modelo: Number;
  placa: String;
  valor: Number;

  constructor(idCarro: Number, marca: String, modelo: Number, placa: String, valor: Number) {
    this.idCarro = idCarro;
    this.marca = marca;
    this.modelo = modelo;
    this.placa = placa;
    this.valor = valor;
  }
}
