import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Auth, authState, User } from '@angular/fire/auth';  // Importa User
import { Firestore, doc, docData } from '@angular/fire/firestore';  // Utiliza Firestore de @angular/fire/firestore
import { map, switchMap, take, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CentralStatusGuard implements CanActivate {
  constructor(
    private auth: Auth,  // Utiliza Auth de @angular/fire/auth
    private firestore: Firestore,  // Utiliza Firestore de @angular/fire/firestore
    private router: Router
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return authState(this.auth).pipe(  // authState para obtener el estado de autenticación del usuario
      take(1),
      switchMap((user: User | null) => {  // Asegúrate de usar el tipo correcto aquí
        if (!user) {
          this.router.navigate(['/login']);
          return of(false);
        }
        // Obtenemos el documento de la colección 'admins'
        const centralDocRef = doc(this.firestore, `admins/${user.uid}`);
        return docData(centralDocRef).pipe(
          take(1),  // Solo tomamos un valor
          catchError(() => {
            this.router.navigate(['/login']);
            return of(false);
          })
        );
      }),
      map((central: any) => {
        if (central && central.admin === true) {
          return true;
        } else {
          this.router.navigate(['/main']);
          return false;
        }
      })
    );
  }
}
