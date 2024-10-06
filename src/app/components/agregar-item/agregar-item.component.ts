import { Component, OnInit } from '@angular/core';
import { Firestore, collection, addDoc, getDocs, query, where } from '@angular/fire/firestore';
import { ActivatedRoute, Router } from '@angular/router';  // Para obtener los parámetros de la URL y redirigir
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Location } from '@angular/common';
@Component({
  selector: 'app-agregar-item',
  templateUrl: './agregar-item.component.html',
  styleUrls: ['./agregar-item.component.css'],
  standalone: true, 
  imports: [CommonModule, FormsModule, RouterModule],
})
export class AgregarItemComponent implements OnInit {
  odsId!: string;
  nivel!: number;
  palabra: string = '';  // Campo para la palabra
  descripcion: string = '';  // Campo para la descripción
  odsDocId!: string;  // Para almacenar el ID del documento Firestore basado en numeroODS

  constructor(private route: ActivatedRoute, private firestore: Firestore, private router: Router,private location: Location) {}

  ngOnInit(): void {
    // Obtenemos el ODS id y el nivel de los parámetros de la URL
    this.odsId = this.route.snapshot.paramMap.get('id')!;
    this.nivel = +this.route.snapshot.paramMap.get('nivel')!;

    // Cargar el documento ODS usando el campo numeroODS
    this.loadOdsDocId();
  }

  // Función para obtener el ID del documento ODS basado en el campo numeroODS
  async loadOdsDocId(): Promise<void> {
    const odsRef = collection(this.firestore, 'ODS');
    
    // Realizar una consulta para buscar el documento cuyo campo numeroODS coincida con odsId
    const odsSnapshot = await getDocs(query(odsRef, where('numeroODS', '==', +this.odsId)));

    if (!odsSnapshot.empty) {
      // Si encontramos un documento, obtenemos su ID
      this.odsDocId = odsSnapshot.docs[0].id;
    } else {
      console.error('No se encontró ningún documento con el numeroODS proporcionado');
    }
  }

  // Función para agregar un nuevo ítem a la subcolección
  async agregarItem(): Promise<void> {
    if (this.odsDocId) {
      // Usar el ID del documento ODS que hemos obtenido de Firestore
      const odsRef = collection(this.firestore, `ODS/${this.odsDocId}/items`);

      // Agregamos el nuevo documento con la palabra, descripción y nivel
      await addDoc(odsRef, {
        palabra: this.palabra,
        descripcion: this.descripcion,
        nivel: this.nivel
      });

      // Redirige de nuevo al detalle del ODS después de agregar el ítem
      this.router.navigate([`/ODS/${this.odsId}`]);
    } else {
      console.error('No se puede agregar el ítem porque no se encontró el documento ODS.');
    }
  }
  volver(): void {
    this.location.back();
  }
}
