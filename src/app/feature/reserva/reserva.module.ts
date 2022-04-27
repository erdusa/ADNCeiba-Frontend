import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReservaRoutingModule } from './reserva-routing.module';
import { SharedModule } from '@shared/shared.module';
import { GestionarReservasComponent } from './components/gestionar-reservas/gestionar-reservas.component';
import { ReservaService } from './shared/service/reserva.service';
import { CrearReservaComponent } from './components/crear-reserva/crear-reserva.component';


@NgModule({
  declarations: [
    GestionarReservasComponent,
    CrearReservaComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ReservaRoutingModule
  ],
  providers: [ReservaService]
})
export class ReservaModule { }
