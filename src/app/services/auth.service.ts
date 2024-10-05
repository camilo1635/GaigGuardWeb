import { Injectable } from '@angular/core';
import { Auth, signInWithEmailAndPassword, signOut, User } from '@angular/fire/auth';
import { Observable } from 'rxjs';
console.log("se llamo a auth service")
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private auth: Auth) { }

  // Método para hacer el login
  async login(email: string, password: string) {
    try {
      return await signInWithEmailAndPassword(this.auth, email, password);
    } catch (error) {
      console.error('Error en login:', error);
      throw error;
    }
  }

  // Método para hacer el logout
  async logout() {
    return await signOut(this.auth);
  }

  // Método para obtener el usuario actual
  getCurrentUser(): Observable<User | null> {
    return new Observable((observer) => {
      const unsubscribe = this.auth.onAuthStateChanged((user) => {
        observer.next(user);
      }, (error) => {
        observer.error(error);
      });

      // Cleanup subscription on unmount
      return () => unsubscribe();
    });
  } 
}
