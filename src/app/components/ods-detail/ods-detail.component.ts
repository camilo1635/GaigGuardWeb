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
  imports: [CommonModule, RouterModule] 
})
export class OdsDetailComponent implements OnInit {
  odsId!: number;
  odsNombre: string = '';  
  items$?: Observable<Item[]>; 
  filteredItems$?: Observable<Item[]>;  
  selectedLevel: number | null = null;  

  constructor(private route: ActivatedRoute, private firestore: Firestore, private router: Router,private location: Location) {}

  ngOnInit(): void {
    // Obtenemos el ODS id de la ruta
    this.odsId = +this.route.snapshot.paramMap.get('id')!;
    this.logOdsCount();  
    this.loadItems();    
  }

  async logOdsCount() {
    const odsRef = collection(this.firestore, 'ODS');
    const odsSnapshot = await getDocs(odsRef);
  }

  // Función para cargar los items del ODS que coincida 
  async loadItems(): Promise<void> {
    const odsRef = collection(this.firestore, 'ODS');
    const odsSnapshot = await getDocs(query(odsRef, where('numeroODS', '==', this.odsId)));

    if (!odsSnapshot.empty) {
    
      const odsDoc = odsSnapshot.docs[0];
      this.odsNombre = odsDoc.get('nombre') || 'Nombre no disponible';
      const itemsRef = collection(this.firestore, `ODS/${odsDoc.id}/items`);
      this.items$ = collectionData(itemsRef) as Observable<Item[]>;
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
    const nivelSeleccionado = this.selectedLevel || 1;  // Asigna nivel 1 por defecto si no se ha seleccionado ningún nivel
    this.router.navigate([`main/ODS/${this.odsId}/agregar/${nivelSeleccionado}`]);  // Navega a la ruta con el odsId y nivel
  }
  
}
