import { DatePipe } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { HttpService } from '@core/services/http.service';
import { CarroDisponible } from '@reserva/shared/model/carro-disponible';
import { ReservaService } from '@reserva/shared/service/reserva.service';
import { of } from 'rxjs';


import { CrearReservaComponent } from './crear-reserva.component';

describe('CrearReservaComponent', () => {
  let component: CrearReservaComponent;
  let fixture: ComponentFixture<CrearReservaComponent>;

  const snackBarMock = {
    open: () => { }
  };

  const dialogMock = {
    close: () => { }
  };

  let reservaService: ReservaService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CrearReservaComponent],
      imports: [
        HttpClientTestingModule,
        ReactiveFormsModule,
        FormsModule,
        MatFormFieldModule,
        MatSelectModule,
        MatInputModule,
        NoopAnimationsModule
      ],
      providers: [
        ReservaService,
        HttpService,
        DatePipe,
        { provide: MatSnackBar, useValue: snackBarMock },
        { provide: MatDialogRef, useValue: dialogMock },
        { provide: MAT_DIALOG_DATA, useValue: 0 }
      ],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearReservaComponent);
    component = fixture.componentInstance;
    reservaService = TestBed.inject(ReservaService);
    fixture.detectChanges();
  });

  it('deberia crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('deberia registrar la reserva', () => {
    // arrange
    let mensaje = '';
    reservaService.getMensajeCambio().subscribe(data => {
      mensaje = data;
    });
    spyOn(reservaService, 'registrarReserva').and.returnValue(of(1));
    // act
    component.reservar(1);
    // assert
    expect(mensaje).toEqual('Se registró existosamente con número: 1');

  });

  it('deberia buscar 0 carros disponibles', () => {
    // arrange
    spyOn(reservaService, 'listarCarrosDisponibles').and.returnValue(of([]));
    spyOn(snackBarMock, 'open')
    // act
    component.buscar();
    // assert
    expect(snackBarMock.open).toHaveBeenCalledTimes(1);
    expect(component.dataSource.data.length).toBe(0);
  });

  it('deberia buscar carros disponibles', () => {
    // arrange
    let listaCarrosDisponibles: CarroDisponible[] = [
      new CarroDisponible('2023-04-20 08:00:00', '2023-04-23 08:00:00', 1, "RENAULT", 2020, "AZX123", 200),
      new CarroDisponible('2023-04-20 08:00:00', '2023-04-23 08:00:00', 2, "RENAULT", 2020, "AZX124", 200)
    ];
    spyOn(reservaService, 'listarCarrosDisponibles').and.returnValue(of(listaCarrosDisponibles));
    spyOn(snackBarMock, 'open')
    // act
    component.buscar();
    // assert
    expect(component.dataSource.data).toBe(listaCarrosDisponibles);
  });

  it('deberia validar que el formulario de busqueda este completo', () => {
    // arrange
    component.formBuscarCarros.controls.fecha.setValue('20/04/3000');
    component.formBuscarCarros.controls.hora.setValue(8);
    component.formBuscarCarros.controls.minuto.setValue(0);
    component.formBuscarCarros.controls.dias.setValue(5);
    component.formBuscarCarros.controls.gama.setValue('ALTA');

    // Act - Assert
    expect(component.formBuscarCarros.valid).toBeTrue();
  });

  it('deberia validar que falta la fecha para la busqueda', () => {
    // arrange
    component.formBuscarCarros.controls.fecha.setValue('');
    component.formBuscarCarros.controls.hora.setValue(8);
    component.formBuscarCarros.controls.minuto.setValue(0);
    component.formBuscarCarros.controls.dias.setValue(5);
    component.formBuscarCarros.controls.gama.setValue('ALTA');

    // Act - Assert
    expect(component.formBuscarCarros.valid).toBeFalsy();
  });

  it('deberia validar que falta la hora para la busqueda', () => {
    // arrange
    component.formBuscarCarros.controls.fecha.setValue('20/04/3000');
    component.formBuscarCarros.controls.hora.setValue(24);
    component.formBuscarCarros.controls.minuto.setValue(0);
    component.formBuscarCarros.controls.dias.setValue(5);
    component.formBuscarCarros.controls.gama.setValue('ALTA');

    // Act - Assert
    expect(component.formBuscarCarros.valid).toBeFalsy();
  });

  it('deberia validar que falta los minutos para la busqueda', () => {
    // arrange
    component.formBuscarCarros.controls.fecha.setValue('20/04/3000');
    component.formBuscarCarros.controls.hora.setValue(8);
    component.formBuscarCarros.controls.minuto.setValue(-1);
    component.formBuscarCarros.controls.dias.setValue(5);
    component.formBuscarCarros.controls.gama.setValue('ALTA');

    // Act - Assert
    expect(component.formBuscarCarros.valid).toBeFalsy();
  });

  it('deberia validar que falta los dias para la busqueda', () => {
    // arrange
    component.formBuscarCarros.controls.fecha.setValue('20/04/3000');
    component.formBuscarCarros.controls.hora.setValue(8);
    component.formBuscarCarros.controls.minuto.setValue(0);
    component.formBuscarCarros.controls.dias.setValue(0);
    component.formBuscarCarros.controls.gama.setValue('ALTA');

    // Act - Assert
    expect(component.formBuscarCarros.valid).toBeFalsy();
  });

  it('deberia validar que falta la gama para la busqueda', () => {
    // arrange
    component.formBuscarCarros.controls.fecha.setValue('20/04/3000');
    component.formBuscarCarros.controls.hora.setValue(8);
    component.formBuscarCarros.controls.minuto.setValue(0);
    component.formBuscarCarros.controls.dias.setValue(5);
    component.formBuscarCarros.controls.gama.setValue('');

    // Act - Assert
    expect(component.formBuscarCarros.valid).toBeFalsy();
  });

});
