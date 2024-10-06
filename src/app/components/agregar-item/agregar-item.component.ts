import { Component, OnInit } from '@angular/core';
import { Firestore, collection, addDoc, getDocs, query, where } from '@angular/fire/firestore';
import { Storage, ref, uploadBytes, getDownloadURL } from '@angular/fire/storage';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Location } from '@angular/common';
import { AlertComponent } from '../alert/alert.component';

@Component({
  selector: 'app-agregar-item',
  templateUrl: './agregar-item.component.html',
  styleUrls: ['./agregar-item.component.css'],
  standalone: true, 
  imports: [CommonModule, FormsModule, RouterModule,AlertComponent],
})
export class AgregarItemComponent implements OnInit {
  odsId!: string;
  nivel!: number;
  palabra: string = '';
  descripcion: string = '';
  linkBio: string = '';
  odsDocId!: string;
  imagenSeleccionada: File | null = null;
  imagenURL: string | ArrayBuffer | null = null;
  alertMessage: string = '';
  alertType: 'success' | 'error' = 'success';
  showAlert: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private firestore: Firestore,
    private storage: Storage,
    private router: Router,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.odsId = this.route.snapshot.paramMap.get('id')!;
    this.nivel = +this.route.snapshot.paramMap.get('nivel')!;
    this.loadOdsDocId();
  }

  async loadOdsDocId(): Promise<void> {
    const odsRef = collection(this.firestore, 'ODS');
    const odsSnapshot = await getDocs(query(odsRef, where('numeroODS', '==', +this.odsId)));

    if (!odsSnapshot.empty) {
      this.odsDocId = odsSnapshot.docs[0].id;
    } else {
      console.error('No se encontró ningún documento con el numeroODS proporcionado');
    }
  }

  onFileSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      this.imagenSeleccionada = file;
      
      // Crear una vista previa de la imagen
      const reader = new FileReader();
      reader.onload = (e) => this.imagenURL = e.target?.result as string;
      reader.readAsDataURL(file);
    }
  }

  async agregarItem(): Promise<void> {
    if (this.odsDocId && this.imagenSeleccionada) {
      try {
        // Subir la imagen al Storage
        const imagePath = `ODS/${this.odsId}/items/${Date.now()}_${this.imagenSeleccionada.name}`;
        const storageRef = ref(this.storage, imagePath);
        const snapshot = await uploadBytes(storageRef, this.imagenSeleccionada);
        const downloadURL = await getDownloadURL(snapshot.ref);
  
        // Agregar el nuevo item a Firestore
        const odsRef = collection(this.firestore, `ODS/${this.odsDocId}/items`);
        await addDoc(odsRef, {
          palabra: this.palabra,
          descripcion: this.descripcion,
          nivel: this.nivel,
          linkBio: this.linkBio,
          linkimagen: downloadURL
        });
  
        // Limpiar los campos del formulario
        this.palabra = '';
        this.descripcion = '';
        this.linkBio = '';
        this.imagenSeleccionada = null;
        this.imagenURL = null;
  
        // Mostrar el mensaje de éxito 
        this.showMessage('Registro exitoso', 'success');

      } catch (error) {
        this.showMessage('Error al subir item', 'error');
        console.error('Error al subir la imagen o agregar el item:', error);
      }
    } else {
      console.error('No se puede agregar el ítem porque no se encontró el documento ODS o no se seleccionó una imagen.');
    }
  }

  showMessage(message: string, type: 'success' | 'error') {
    this.alertMessage = message;
    this.alertType = type;
    this.showAlert = true;

    setTimeout(() => {
      this.showAlert = false;
    }, 3000);
  }

  
  volver(): void {
    this.location.back();
  }
}