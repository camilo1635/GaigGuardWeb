import { bootstrapApplication } from '@angular/platform-browser';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { provideDatabase, getDatabase } from '@angular/fire/database';
import { environment } from './environments/environment';
import { AppComponent } from './app/app.component';
import { provideRouter, Routes } from '@angular/router'; 
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideStorage, getStorage } from '@angular/fire/storage'; 
//importaciones 
import { MainComponent } from './app/components/main/main.component';
import { ODSComponent } from './app/components/ods/ods.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { OdsDetailComponent } from './app/components/ods-detail/ods-detail.component';
import { AgregarItemComponent } from './app/components/agregar-item/agregar-item.component';
const routes: Routes = [
  {path: '', redirectTo: 'main', pathMatch: 'full'}, 
  { 
    path: 'main', 
    component: MainComponent,
    children: [ 
      { path: '', redirectTo: 'ODS', pathMatch: 'full'},
      { path: 'ODS', component: ODSComponent},
      { path: 'ODS/:id', component: OdsDetailComponent},
      { path: 'ODS/:id/agregar/:nivel', component: AgregarItemComponent}
    ]
  }
];

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
    provideFirestore(() => getFirestore()),
    provideDatabase(() => getDatabase()),
    provideAuth(() => getAuth()),
    provideStorage(() => getStorage()),  
    provideAnimationsAsync()  
  ]
}).catch((err) => console.error(err));
