import { Injectable } from '@angular/core';
import { ChatService } from './chat.service';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from './auth.service'; // Asegúrate de importar AuthService

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  public riderMensajesPendientes = new BehaviorSubject<boolean>(false);
  public clientMensajesPendientes = new BehaviorSubject<boolean>(false);
  private loggedInUserId: string | null = null; // Inicialización segura

  constructor(private chatService: ChatService, private authService: AuthService) {
    this.authService.getCurrentUser().subscribe(user => {
      this.loggedInUserId = user ? user.uid : null; // Ajusta el acceso al ID según tu implementación
      this.monitorChats(); // Monitorea ambos tipos de chats después de obtener el ID del usuario
    });
  }

  private monitorChats() {
    // Monitorea chats de riders
    this.chatService.getChats('r').subscribe(chats => {
      const hasRiderUnread = chats.some(chat =>
        chat.rider && chat.mensajesNoLeidos > 0 &&
        (chat.asignadoA === 'ninguno' || chat.asignadoA === this.loggedInUserId)
      );
      this.riderMensajesPendientes.next(hasRiderUnread);
    });

    // Monitorea chats de clientes
    this.chatService.getChats('c').subscribe(chats => {
      const hasClientUnread = chats.some(chat =>
        !chat.rider && chat.mensajesNoLeidos > 0 &&
        (chat.asignadoA === 'ninguno' || chat.asignadoA === this.loggedInUserId)
      );
      this.clientMensajesPendientes.next(hasClientUnread);
    });
  }
}
