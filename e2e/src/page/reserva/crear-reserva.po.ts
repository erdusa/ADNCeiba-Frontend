import { AppPage } from '../../app.po';

const componente = 'app-crear-reserva #botonBuscar';
export class CrearReservaPage {
  page = new AppPage();

  private fechaFiltro = `${componente} #fecha`;

  async obtenerElementFechaFiltro() {
    return await this.page.getElement(this.fechaFiltro);
  }
}
