import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { HttpService } from '@core/services/http.service';
import { Cliente } from '@reserva/shared/model/cliente';
import { ReservaVigente } from '@reserva/shared/model/reserva-vigente';
import { ReservaService } from '@reserva/shared/service/reserva.service';
import { of } from 'rxjs';

import { GestionarReservasComponent } from './gestionar-reservas.component';

describe('GestionarReservasComponent', () => {
  let component: GestionarReservasComponent;
  let fixture: ComponentFixture<GestionarReservasComponent>;


  const snackBarMock = {
    open: () => { }
  };

  const dialogMock = {
    open: () => { }
  };

  let reservaService: ReservaService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GestionarReservasComponent],
      imports: [
        HttpClientTestingModule,
        ReactiveFormsModule,
        FormsModule,
        MatFormFieldModule,
        MatInputModule,
        NoopAnimationsModule
      ],
      providers: [
        ReservaService,
        HttpService,
        { provide: MatSnackBar, useValue: snackBarMock },
        { provide: MatDialog, useValue: dialogMock }
      ],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionarReservasComponent);
    component = fixture.componentInstance;
    reservaService = TestBed.inject(ReservaService);
    fixture.detectChanges();
  });

  it('deberia crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('deberia cargar la lista de reservas vigentes', () => {
    //arrange
    const listaReservasVigentes: ReservaVigente[] = [
      new ReservaVigente(1, '2023-04-20 08:00:00', '2023-04-22 08:00:00', 'RENAULT', 2020, 'AKY123', 'BAJA', 1000),
      new ReservaVigente(2, '2023-04-21 08:00:00', '2023-04-23 08:00:00', 'MERCEDES', 2022, 'AKY123', 'ALTA', 1000)
    ];
    spyOn(reservaService, 'listarReservasVigentes').and.returnValue(
      of(listaReservasVigentes)
    );

    // act
    component.listarReservasVigentes();

    // assert
    expect(component.dataSource.data).toBe(listaReservasVigentes);

  });

  it('deberia no cargar la lista si no hay reservas vigentes', () => {
    // arrange
    const listaReservasVigentes = [];
    spyOn(reservaService, 'listarReservasVigentes').and.returnValue(of(listaReservasVigentes));
    // act
    component.listarReservasVigentes();
    // assert
    expect(component.dataSource.data.length).toBe(0);

  });

  it('deberia buscar cliente cuando se ha ingresado un documento', () => {
    // arrange
    const cliente: Cliente = new Cliente(1, '1000', 'CLIENTE DE PRUEBA');
    component.formConsultaCliente.controls.numeroDocumento.setValue('1000');
    spyOn(reservaService, 'consultarCliente').and.returnValue(of(cliente));
    // act
    component.buscarCliente();
    // assert
    expect(component.idCliente).toBe(1);
    expect(component.nombreCliente).toBe('CLIENTE DE PRUEBA');
  });

  it('deberia validar que no pueda agregar si no se ha buscado un cliente', () => {
    // arrange
    component.idCliente = null;
    spyOn(snackBarMock, 'open')
    // act
    component.agregar();
    // assert
    expect(snackBarMock.open).toHaveBeenCalledTimes(1);
  });

  it('deberia abrir ventana agregar si ya se ha buscado un cliente', () => {
    // arrange
    component.idCliente = 1;
    spyOn(dialogMock, 'open');
    // act
    component.agregar();
    // assert
    expect(dialogMock.open).toHaveBeenCalledTimes(1);
  });


  it('deberia cancelar una reserva', () => {
    // arrange
    spyOn(reservaService, 'cancelarReserva').and.returnValue(of(true));
    spyOn(reservaService, 'listarReservasVigentes').and.returnValue(
      of([])
    );
    // act
    component.cancelar(1);
    // assert
    expect(component.dataSource.data.length).toBe(0);
  });

  it('deberia validar que el formulario de busqueda este completo', () => {
    // arrange
    component.formConsultaCliente.controls.numeroDocumento.setValue('1000');

    // Act - Assert
    expect(component.formConsultaCliente.valid).toBeTrue();
  });

  it('deberia validar que falta la fecha para la busqueda', () => {
    // arrange
    component.formConsultaCliente.controls.numeroDocumento.setValue('');

    // Act - Assert
    expect(component.formConsultaCliente.valid).toBeFalsy();
  });

});
