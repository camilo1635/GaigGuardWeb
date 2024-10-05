import { bootstrapApplication } from '@angular/platform-browser';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { provideDatabase, getDatabase } from '@angular/fire/database';
import { environment } from './environments/environment';
import { AppComponent } from './app/app.component';
import { provideRouter, Routes } from '@angular/router';
import { canActivate, redirectUnauthorizedTo } from '@angular/fire/auth-guard';
import { importProvidersFrom } from '@angular/core';
import { provideAuth, getAuth } from '@angular/fire/auth';
// Importa tus componentes aquí
import { LoginComponent } from './app/components/login/login.component';
import { MainComponent } from './app/components/main/main.component';
import { ODSComponent } from './app/components/ods/ods.component';
// import { MainEmpresaComponent } from './app/components/main-empresa/main-empresa.component';
// import { PedidosDisponiblesComponent } from './app/components/pedidos-disponibles/pedidos-disponibles.component';
// import { PedidosProcesoComponent } from './app/components/pedidos-proceso/pedidos-proceso.component';
// import { PedidosDetallesComponent } from './app/components/pedidos-disponibles/pedidos-detalles/pedidos-detalles.component';
// import { AsignarPedidoComponent } from './app/components/pedidos-disponibles/asignar-pedido/asignar-pedido.component';
// import { PedidosProcesoDetallesComponent } from './app/components/pedidos-proceso/pedidos-proceso-detalles/pedidos-proceso-detalles.component';
// import { DatosRidersComponent } from './app/components/datos-riders/datos-riders.component';
// import { DetallesRidersComponent } from './app/components/datos-riders/detalles-riders/detalles-riders.component';
// import { ComentariosRidersComponent } from './app/components/datos-riders/comentarios-riders/comentarios-riders.component';
// import { GestionRecargasEmpresaComponent } from './app/components/gestion-recargas-empresa/gestion-recargas-empresa.component';
// import { SaldoRiderComponent } from './app/components/gestion-recargas-empresa/saldo-rider/saldo-rider.component';
// import { BonoRiderComponent } from './app/components/gestion-recargas-empresa/bono-rider/bono-rider.component';
// import { RangosDomiciliosEmpresaComponent } from './app/components/rangos-domicilios-empresa/rangos-domicilios-empresa.component';
// import { PorcentajeCobroEmpresaComponent } from './app/components/porcentaje-cobro-empresa/porcentaje-cobro-empresa.component';
// import { HistorialPedidosClientesEmpresaComponent } from './app/components/historial-pedidos-clientes-empresa/historial-pedidos-clientes-empresa.component';
// import { HistorialPedidosRidersEmpresaComponent } from './app/components/historial-pedidos-riders-empresa/historial-pedidos-riders-empresa.component';
// import { ListaPedidosClientesComponent } from './app/components/historial-pedidos-clientes-empresa/lista-pedidos-clientes/lista-pedidos-clientes.component';
// import { DetallesPedidosClientesComponent } from './app/components/historial-pedidos-clientes-empresa/detalles-pedidos-clientes/detalles-pedidos-clientes.component';
// import { ListaPedidosRidersComponent } from './app/components/historial-pedidos-riders-empresa/lista-pedidos-riders/lista-pedidos-riders.component';
// import { DetallesPedidosRidersComponent } from './app/components/historial-pedidos-riders-empresa/detalles-pedidos-riders/detalles-pedidos-riders.component';
// import { ChatRidersComponent } from './app/components/chat-riders/chat-riders.component';
// import { ChatClientesComponent } from './app/components/chat-clientes/chat-clientes.component';
// // // import { ComentariosRidersComponent } from './app/components/datos-riders/comentarios-riders/comentarios-riders.component';

// // Importa el CentralStatusGuard
 import { CentralStatusGuard } from './app/auth/auth.guard';
 import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
// import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
// import { EditRidersComponent } from './app/components/edit-riders/edit-riders.component';
// import { EditarRiderComponent } from './app/components/edit-riders/editar-rider/editar-rider.component';

const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  { 
    path: 'main', 
    component: MainComponent,
    ...canActivate(() => redirectUnauthorizedTo(['/login'])),
    canActivate: [CentralStatusGuard],
    children: [ 
      { path: '', redirectTo: 'ODS', pathMatch: 'full'},
       { path: 'ODS', component: ODSComponent},
      //  { path: 'PedidosDisponibles/:pedidosDisponiblesID', component: PedidosDetallesComponent},
      //  { path: 'PedidosDisponibles/:pedidosDisponiblesID/asignar', component: AsignarPedidoComponent},
      //  { path: 'PedidosEnProceso', component: PedidosProcesoComponent },
      //  { path: 'PedidosEnProceso/:pedidosEnProcesoID', component: PedidosProcesoDetallesComponent},
      //  { path: 'datosRiders', component: DatosRidersComponent}, 
      //  { path: 'datosRiders/:riderId/detalles', component: DetallesRidersComponent},
      //  { path: 'datosRiders/:riderId/comentarios', component: ComentariosRidersComponent},
      //  { path: 'ChatRiders', component: ChatRidersComponent},  
      //  { path: 'ChatClientes', component: ChatClientesComponent}
    ]
  }, 
];



bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
    provideFirestore(() => getFirestore()),
    provideDatabase(() => getDatabase()),
    provideAuth(() => getAuth()),
    importProvidersFrom(CentralStatusGuard), provideAnimationsAsync()

  ]
}).catch((err) => console.error(err));