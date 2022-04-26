import { Component } from '@angular/core';
import { MenuItem } from '@core/modelo/menu-item';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Rent-A-Car';
  public opciones: MenuItem[] = [
    { url: '/home', nombre: 'home' },
    { url: '/reservas', nombre: 'reserva' }

  ];


}
