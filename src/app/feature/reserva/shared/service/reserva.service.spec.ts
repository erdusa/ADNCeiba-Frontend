import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ReservaService } from './reserva.service';
import { HttpService } from '@core/services/http.service';
import { Cliente } from '../model/cliente';
import { environment } from 'src/environments/environment';
import { ReservaVigente } from '../model/reserva-vigente';
import { CarroDisponible } from '../model/carro-disponible';
import { SolicitudReserva } from '../model/solicitud-reserva';
import { HttpResponse } from '@angular/common/http';

const DOCUMENTO_CLIENTE = "1000";
const ID_CLIENTE = 1;
const DUMMY_CLIENTE: Cliente = new Cliente(ID_CLIENTE, DOCUMENTO_CLIENTE, "CLIENTE DE PRUEBA");
const DUMMY_RESERVAS_VIGENTES: ReservaVigente[] = [
  new ReservaVigente(1, '2023-04-20 08:00:00', '2023-04-22 08:00:00', 'RENAULT', 2020, 'AKY123', 'BAJA', 1000),
  new ReservaVigente(2, '2023-04-21 08:00:00', '2023-04-23 08:00:00', 'MERCEDES', 2022, 'AKY123', 'ALTA', 1000)
];
const CARRO_DISP_FECHA_INICIAL = "19/04/2022 08:20";
const CARRO_DISP_DIAS = 3;
const CARRO_DISP_GAMA = "ALTA"
const DUMMY_CARROS_DISPONIBLES: CarroDisponible[] = [
  new CarroDisponible('2023-04-20 08:00:00', '2023-04-23 08:00:00', 1, "RENAULT", 2020, "AZX123", 200),
  new CarroDisponible('2023-04-20 08:00:00', '2023-04-23 08:00:00', 2, "RENAULT", 2020, "AZX124", 200)
];
const RESPUESTA_RESERVA = 1;
const RESPUESTA_CANCELAR_RESERVA = true;
const DUMMY_SOLICITUD_RESERVA: SolicitudReserva = new SolicitudReserva(ID_CLIENTE, 1, "2022-04-28 08:00:00", 3);
const ID_RESERVA = 1;

const MENSAJE_DE_NOTIFICACION = "mensaje de prueba";
describe('ReservaService', () => {
  let service: ReservaService;
  let httpMock: HttpTestingController;
  const apiEndpointConsultarCliente = `${environment.endpoint}/clientes/${DOCUMENTO_CLIENTE}`;
  const apiEndpointListarReservasVigentes = `${environment.endpoint}/reservas/cliente/${ID_CLIENTE}`;
  const apiEndpointListarCarrosDisponibles = `${environment.endpoint}/reservas/carros-disponibles?fechaInicial=${CARRO_DISP_FECHA_INICIAL}&dias=${CARRO_DISP_DIAS}&gama=${CARRO_DISP_GAMA}`;
  const apiEndpointRegistrarReserva = `${environment.endpoint}/reservas`;
  const apiEndpointCancelarReserva = `${environment.endpoint}/reservas/cancelar/${ID_RESERVA}`;

  beforeEach(() => {
    const injector = TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ReservaService, HttpService]
    });
    httpMock = injector.inject(HttpTestingController);
    service = TestBed.inject(ReservaService);
  });

  it('deberia cerrar el servicio correctamente', () => {
    const reservaService: ReservaService = TestBed.inject(ReservaService);
    expect(reservaService).toBeTruthy();
  });

  it('deberia consultar cliente', (done: DoneFn) => {
    // arrange
    service.consultarCliente(DOCUMENTO_CLIENTE).subscribe(cliente => {
      expect(cliente).toEqual(DUMMY_CLIENTE);
      done();
    });
    // act
    const req = httpMock.expectOne(apiEndpointConsultarCliente);
    // assert
    expect(req.request.method).toBe('GET');
    req.flush(DUMMY_CLIENTE);
  });

  it('deberia listar las reservas vigentes', (done: DoneFn) => {
    // act
    service.listarReservasVigentes(ID_CLIENTE).subscribe(listaReservasVigentes => {
      expect(listaReservasVigentes.length).toEqual(2);
      expect(listaReservasVigentes).toEqual(DUMMY_RESERVAS_VIGENTES);
      done();
    });

    const req = httpMock.expectOne(apiEndpointListarReservasVigentes);
    expect(req.request.method).toBe('GET');
    req.flush(DUMMY_RESERVAS_VIGENTES);
  });

  it('deberia listar carros disponibles', (done: DoneFn) => {
    // act
    service.listarCarrosDisponibles(CARRO_DISP_FECHA_INICIAL, CARRO_DISP_DIAS, CARRO_DISP_GAMA).subscribe(listaCarrosDisponibles => {
      expect(listaCarrosDisponibles.length).toEqual(2);
      expect(listaCarrosDisponibles).toEqual(DUMMY_CARROS_DISPONIBLES);
      done();
    });

    const req = httpMock.expectOne(apiEndpointListarCarrosDisponibles);
    expect(req.request.method).toBe('GET');
    req.flush(DUMMY_CARROS_DISPONIBLES);
  });

  it('deberia crear una reserva', () => {
    // act
    service.registrarReserva(DUMMY_SOLICITUD_RESERVA).subscribe((respuesta) => {
      expect(respuesta).toEqual(RESPUESTA_RESERVA);
    });
    const req = httpMock.expectOne(apiEndpointRegistrarReserva);
    expect(req.request.method).toBe('POST');
    req.event(new HttpResponse<number>({ body: RESPUESTA_RESERVA }));
  });

  it('deberia cancelar una reserva', () => {
    // act
    service.cancelarReserva(ID_RESERVA).subscribe((respuesta) => {
      expect(respuesta).toEqual(RESPUESTA_CANCELAR_RESERVA);
    });
    const req = httpMock.expectOne(apiEndpointCancelarReserva);
    expect(req.request.method).toBe('PUT');
    req.event(new HttpResponse<boolean>({ body: RESPUESTA_CANCELAR_RESERVA }));
  });

  it('deberia enviar y leer un mensaje', () => {
    // arrange
    let mensaje = "";
    service.getMensajeCambio().subscribe(data => {
      mensaje = data;
    });
    // act
    service.setMensajeCambio(MENSAJE_DE_NOTIFICACION)
    // assert
    expect(mensaje).toEqual(MENSAJE_DE_NOTIFICACION);
  });

});
