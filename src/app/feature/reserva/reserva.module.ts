import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReservaRoutingModule } from './reserva-routing.module';
import { SharedModule } from '@shared/shared.module';
import { GestionarReservasComponent } from './components/gestionar-reservas/gestionar-reservas.component';


@NgModule({
  declarations: [
    GestionarReservasComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ReservaRoutingModule
  ]
})
export class ReservaModule { }
