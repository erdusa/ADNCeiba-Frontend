import { AppPage } from '../../app.po';

const componente = 'app-gestionar-reservas ';
export class GestionarReservasPage {

  page = new AppPage();

  private numeroDocumento = '#numeroDocumento';
  private nombreCliente = '#nombreCliente';
  private botonBuscar = '#botonBuscar';
  private botonAgregar = '#botonAgregar';

  async ingresarNumeroDocumento(numeroDocumento: string) {
    await this.page.getElement(this.numeroDocumento).sendKeys(numeroDocumento);
  }

  async obtenerTextoNombreCliente() {
    return this.page.getText(componente + this.nombreCliente);
  }

  async buscarCliente() {
    await this.page.getElement(componente + this.botonBuscar).click();
  }

  async agregarCliente() {
    await this.page.getElement(componente + this.botonAgregar).click();
  }
}
