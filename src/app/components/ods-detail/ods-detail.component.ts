import { Component, OnInit } from '@angular/core';
import { Firestore, collection, collectionData, query, where, doc, getDocs } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common'; // Importa CommonModule

interface Item {
  palabra: string;
  descripcion: string;
}

@Component({
  selector: 'app-ods-detail',
  templateUrl: './ods-detail.component.html',
  styleUrls: ['./ods-detail.component.css'],
  standalone: true,
  imports: [CommonModule]  // Asegúrate de importar CommonModule aquí
})
export class OdsDetailComponent implements OnInit {
  odsId!: number;
  items$?: Observable<Item[]>;

  constructor(private route: ActivatedRoute, private firestore: Firestore) {}

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

    console.log(`Hay ${odsSnapshot.size} documentos en la colección ODS`);
  }

  // Función para cargar los items del ODS que coincida con el numeroODS
  async loadItems(): Promise<void> {
    const odsRef = collection(this.firestore, 'ODS');
    const odsSnapshot = await getDocs(query(odsRef, where('numeroODS', '==', this.odsId)));

    if (!odsSnapshot.empty) {
      // Si encuentra el documento que coincide con el numeroODS, cargamos su subcolección items
      const odsDoc = odsSnapshot.docs[0];
      const itemsRef = collection(this.firestore, `ODS/${odsDoc.id}/items`);
      this.items$ = collectionData(itemsRef) as Observable<Item[]>;
    } else {
      console.error('No se encontró ningún ODS con el numeroODS correspondiente');
    }
  }
}
