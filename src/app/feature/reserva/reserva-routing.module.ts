import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GestionarReservasComponent } from './components/gestionar-reservas/gestionar-reservas.component';

const routes: Routes = [
  {
    path: '',
    component: GestionarReservasComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReservaRoutingModule { }
