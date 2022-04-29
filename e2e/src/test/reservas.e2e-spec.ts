import { AppPage } from '../app.po';
import { browser, logging } from 'protractor';
import { GestionarReservasPage } from '../page/reserva/gestionar-reservas.po';
import { CrearReservaPage } from '../page/reserva/crear-reserva.po';

describe('workspace-project Gestionar Reservas', () => {
  let page: AppPage;
  let gestionarReservasPage: GestionarReservasPage;
  let crearReservaPage: CrearReservaPage;

  beforeEach(() => {
    page = new AppPage();
    gestionarReservasPage = new GestionarReservasPage();
    crearReservaPage = new CrearReservaPage();
  });

  it('deberia cargar listado', () => {
    page.navigateTo();
    gestionarReservasPage.ingresarNumeroDocumento('8000');
    gestionarReservasPage.buscarCliente();
    expect(gestionarReservasPage.obtenerTextoNombreCliente()).toEqual('EUDIS RENE DUARTE');
  });

  it('deberia abrir ventana agregar', () => {
    page.navigateTo();
    gestionarReservasPage.ingresarNumeroDocumento('8000');
    gestionarReservasPage.buscarCliente();
    gestionarReservasPage.agregarCliente();
    expect(crearReservaPage.obtenerElementFechaFiltro()).toBeDefined();
  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});

