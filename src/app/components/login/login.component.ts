import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgClass, NgIf } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { SanitizerService } from '../../services/sanitizer.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [FormsModule, NgClass, NgIf]
})
export class LoginComponent {
  constructor(
    private authService: AuthService,
    private router: Router, 
    private sanitizer: SanitizerService,
  ){
  
  }

  email: string = '';
  password: string = '';
  errorMessage: string = ' ';
  
  //Para mostrar/ocultar contraseña mediante el ojito
  showPassword: boolean = false;
  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  async login() {
    try {
      const emailSanitizer = this.sanitizer.sanitizeText(this.email);
      const PasswordSatinizer = this.sanitizer.sanitizeText(this.password);
      await this.authService.login(emailSanitizer,PasswordSatinizer);
      // Redirigir al usuario a la página principal o dashboard
      this.router.navigate(['/main']);
    } catch (error) {
      this.errorMessage = '¡Error en el inicio de sesión! Por favor, verifique sus credenciales.';
      console.error('Error de inicio de sesión:', error);
    }
  } 
 
}
  
