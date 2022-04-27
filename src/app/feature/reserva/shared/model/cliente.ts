export class Cliente {
  id: number;
  documento: string;
  nombre: string;

  constructor(id: number, documento: string, nombre: string) {
    this.id = id;
    this.documento = documento;
    this.nombre = nombre;
  }
}
