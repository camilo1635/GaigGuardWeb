import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
@Component({
  selector: 'app-ods',
  templateUrl: './ods.component.html',
  styleUrls: ['./ods.component.css'],
  standalone: true,
  imports: [RouterModule, CommonModule],
})
export class ODSComponent {
  // Lista con los ODS
  odsList = [
    { id: 1, title: 'Fin de la pobreza' },
    { id: 2, title: 'Hambre cero' },
    { id: 3, title: 'Salud y bienestar' },
    { id: 4, title: 'Educación de calidad' },
    { id: 5, title: 'Igualdad de género' },
    { id: 6, title: 'Agua limpia y saneamiento' },
    { id: 7, title: 'Energía asequible y no contaminante' },
    { id: 8, title: 'Trabajo decente y crecimiento económico' },
    { id: 9, title: 'Industria, innovación e infraestructura' },
    { id: 10, title: 'Reducción de las desigualdades' },
    { id: 11, title: 'Ciudades y comunidades sostenibles' },
    { id: 12, title: 'Producción y consumo responsables' },
    { id: 13, title: 'Acción por el clima' },
    { id: 14, title: 'Vida submarina' },
    { id: 15, title: 'Vida de ecosistemas terrestres' },
    { id: 16, title: 'Paz, justicia e instituciones sólidas' },
    { id: 17, title: 'Alianzas para lograr los objetivos' }
  ];

  constructor(private router: Router) {}

  // Navegar a un componente específico según el ODS seleccionado
  goToOdsDetail(odsId: number) {
    this.router.navigate([`main/ODS/${odsId}`]);
  }
}