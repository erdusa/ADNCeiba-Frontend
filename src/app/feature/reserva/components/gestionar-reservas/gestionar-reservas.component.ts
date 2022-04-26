import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-gestionar-reservas',
  templateUrl: './gestionar-reservas.component.html',
  styleUrls: ['./gestionar-reservas.component.css']
})
export class GestionarReservasComponent implements OnInit {

  formConsultaCliente: FormGroup;

  constructor() { }

  ngOnInit(): void {
    this.inciarFormulario();
  }

  consultar() {

  }

  inciarFormulario() {
    this.formConsultaCliente = new FormGroup({
      numeroDocumento: new FormControl("")
    });
  }

}
