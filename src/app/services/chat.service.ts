import { Injectable } from '@angular/core';
import { Database, ref, update, onValue, get, child } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  constructor(private db: Database) {}

  // Obtener la lista de chats según el tipo de chat (puedes filtrar si es necesario)
  getChats(chatType: string): Observable<any[]> {
    const chatsRef = ref(this.db, 'chats');
    return new Observable((observer) => {
      onValue(chatsRef, (snapshot) => {
        const chats = snapshot.val();
        // Convierte el objeto en un array de chats con su clave
        const chatArray = Object.keys(chats || {}).map(key => ({ key, ...chats[key] }));
        // Emite el array de chats
        observer.next(chatArray);
      });
    });
  }

  // Obtener un chat específico por su ID
  getChat(chatId: string): Observable<any> {
    const chatRef = ref(this.db, `chats/${chatId}`);
    return new Observable((observer) => {
      onValue(chatRef, (snapshot) => {
        observer.next(snapshot.val());
      });
    });
  }

  // Asignar un chat a un usuario específico
  assignChat(chatId: string, userId: string): Promise<void> {
    const chatRef = ref(this.db, `chats/${chatId}`);
    // Actualiza el campo `asignadoA` para reflejar a quién se asignó el chat
    return update(chatRef, { asignadoA: userId });
  }

  // Finalizar un chat marcándolo como finalizado y añadiendo un mensaje de cierre
  finalizeChat(chatId: string): Promise<void> {
    const timestamp = Date.now();
    const chatRef = ref(this.db, `chats/${chatId}`);
    const finalMessage = {
      contenido: 'chat finalizado',
      enviadoPor: 'web',
      timestamp,
    };
    // Actualiza el chat con el estado final y añade el mensaje de cierre
    return update(chatRef, {
      asignadoA: 'ninguno',
      ultimoMensaje: timestamp,
      mensajesNoLeidos: 0,
      [`mensajes/${timestamp}`]: finalMessage,
    });
  }

     // Obtener los mensajes de un chat específico desde Realtime Database
     getMessages(chatId: string): Observable<any[]> {
      const chatRef = ref(this.db, `chats/${chatId}/mensajes`);
    
      return new Observable((observer) => {
        onValue(chatRef, (snapshot) => {
          const messages = snapshot.val();
          if (messages) {
            // Convertimos los mensajes en un array
            const messagesArray = Object.values(messages);
            observer.next(messagesArray);
          } else {
            observer.next([]); // Si no hay mensajes
          }
        }, (error) => {
          observer.error(error);
        });
      });
    }
    

  // Enviar un nuevo mensaje a un chat específico
  sendMessage(chatId: string, message: string): Promise<void> {
    const timestamp = Date.now();
    const chatRef = ref(this.db, `chats/${chatId}`);
    const newMessage = {
      contenido: message,
      enviadoPor: 'web',
      timestamp,
    };
    // Actualiza el chat con el nuevo mensaje
    return update(chatRef, {
      ultimoMensaje: timestamp,
      mensajesNoLeidos: 0,
      [`mensajes/${timestamp}`]: newMessage,
    });
  }
}
