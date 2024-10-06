import { Component, OnInit } from '@angular/core';
import { Firestore, collection, collectionData, query, where, doc, getDocs } from '@angular/fire/firestore';
import {Router, ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { CommonModule } from '@angular/common'; // Importa CommonModule
import { RouterModule } from '@angular/router';
import { Location } from '@angular/common';
interface Item {
  palabra: string;
  descripcion: string;
  nivel: number;
  linkimagen?: string;  
  linkBio: string;
}

@Component({
  selector: 'app-ods-detail',
  templateUrl: './ods-detail.component.html',
  styleUrls: ['./ods-detail.component.css'],
  standalone: true,
  imports: [CommonModule, RouterModule]  // Asegúrate de importar CommonModule aquí
})
export class OdsDetailComponent implements OnInit {
  odsId!: number;
  odsNombre: string = '';  // Nuevo campo para almacenar el nombre del ODS
  items$?: Observable<Item[]>;  // Datos originales
  filteredItems$?: Observable<Item[]>;  // Datos filtrados por nivel
  selectedLevel: number | null = null;  // Nivel seleccionado (1, 2 o 3)

  constructor(private route: ActivatedRoute, private firestore: Firestore, private router: Router,private location: Location) {}

  ngOnInit(): void {
    // Obtenemos el ODS id de la ruta
    this.odsId = +this.route.snapshot.paramMap.get('id')!;
    this.logOdsCount();  // Imprime cuántos documentos hay en la colección ODS
    this.loadItems();    // Carga los items para el ODS específico
  }

  // Función para imprimir cuántos documentos hay en la colección ODS
  async logOdsCount() {
    const odsRef = collection(this.firestore, 'ODS');
    const odsSnapshot = await getDocs(odsRef);
  }

  // Función para cargar los items del ODS que coincida con el numeroODS
  async loadItems(): Promise<void> {
    const odsRef = collection(this.firestore, 'ODS');
    const odsSnapshot = await getDocs(query(odsRef, where('numeroODS', '==', this.odsId)));

    if (!odsSnapshot.empty) {
      // Si encuentra el documento que coincide con el numeroODS, cargamos su subcolección items
      const odsDoc = odsSnapshot.docs[0];
      
      // Guardamos el nombre del ODS
      this.odsNombre = odsDoc.get('nombre') || 'Nombre no disponible';

      const itemsRef = collection(this.firestore, `ODS/${odsDoc.id}/items`);
      this.items$ = collectionData(itemsRef) as Observable<Item[]>;

      // Inicialmente, no hay nivel seleccionado, por lo que no se muestran elementos
      this.filteredItems$ = of([]);
    } else {
      console.error('No se encontró ningún ODS con el numeroODS correspondiente');
    }
  }

  // Función para filtrar los items por el nivel seleccionado
  filterItemsByLevel(level: number): void {
    this.selectedLevel = level;

    // Filtramos los items por el nivel seleccionado
    this.filteredItems$ = this.items$?.pipe(
      map(items => items.filter(item => item.nivel === level))
    );
  }
  volver(): void {
    this.location.back();
  }
  Agregaritem(): void {
    this.router.navigate([`main/ODS/${this.odsId}/agregar/${this.selectedLevel}`]);  // Navega a la ruta con el odsId y nivel
  }
}
