import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SecurityGuard } from '@core/guard/security.guard';

const routes: Routes = [
  { path: '', redirectTo: '/reservas', pathMatch: 'full' },
  { path: 'home', redirectTo: '/reservas', pathMatch: 'full' },
  { path: 'reservas', loadChildren: () => import('@reserva/reserva.module').then(mod => mod.ReservaModule), canActivate: [SecurityGuard] }

];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
