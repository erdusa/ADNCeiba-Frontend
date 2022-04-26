export class ComandoRespuesta<T> {

  valor: T;

  constructor(valor: T) {
      this.valor = valor;
  }

  getValor() {
      return this.valor;
  }
}
