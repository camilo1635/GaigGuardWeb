import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { NotificationService } from '../../services/notification.service';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
  standalone: true,
  imports: [RouterModule, CommonModule]
})
export class MainComponent implements OnInit {
  riderHasUnread: boolean = false;
  clientHasUnread: boolean = false;
  mensajesPendientes: boolean = false;
  private subscription: Subscription = new Subscription();

  constructor(
    private notificationService: NotificationService,
    private authService: AuthService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.subscription.add(
      this.notificationService.riderMensajesPendientes.subscribe(hasUnread => {
        this.riderHasUnread = hasUnread;
        this.updateMainNotificationStatus();
      })
    );
    this.subscription.add(
      this.notificationService.clientMensajesPendientes.subscribe(hasUnread => {
        this.clientHasUnread = hasUnread;
        this.updateMainNotificationStatus();
      })
    );
  }

  updateMainNotificationStatus(): void {
    // Mostrar la campana en "Chats" si hay mensajes no leídos en Riders o Clientes
    this.mensajesPendientes = this.riderHasUnread || this.clientHasUnread;
  }

  async onLogout() {
    try {
      await this.authService.logout();
      this.router.navigate(['/login']);
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  }
}
