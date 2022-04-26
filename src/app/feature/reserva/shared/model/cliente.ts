export class Cliente {
  id: Number;
  documento: String;
  nombre: String;

  constructor(id: Number, documento: String, nombre: String) {
    this.id = id;
    this.documento = documento;
    this.nombre = nombre;
  }
}
