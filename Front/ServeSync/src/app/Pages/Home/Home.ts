import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './Home.html',
  styleUrls: ['./Home.css']
})
export class HomeComponent {
  title = 'Bienvenido a la Página Principal';
  description = 'Este es un componente básico de Angular puro para la vista Home.';
}