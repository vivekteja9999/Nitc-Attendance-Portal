import { Injectable } from '@angular/core';
import { Client, IMessage } from '@stomp/stompjs';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WebSocketService {
  private stompClient!: Client;
  private readonly WS_URL = 'ws://localhost:8082/ws';

  private adminNotificationsSubject = new BehaviorSubject<any[]>([]);
  adminNotifications$ = this.adminNotificationsSubject.asObservable();

  private userNotificationsSubject = new BehaviorSubject<any | null>(null);
  userNotifications$ = this.userNotificationsSubject.asObservable();

  constructor() {
    this.connect();
  }

  private connect() {
    this.stompClient = new Client({
      brokerURL: this.WS_URL,
      reconnectDelay: 5000,
    });

    this.stompClient.onConnect = () => {
      console.log('Connected to WebSocket');

      this.stompClient.subscribe('/topic/admin/notifications', (message: any) => {
        const notification = message.body;
        this.adminNotificationsSubject.next([...this.adminNotificationsSubject.getValue(), notification]);
      });


      const userEmail = localStorage.getItem('email');
      if (userEmail) {
        this.subscribe(/topic/user/${userEmail}, (message) => {
          this.userNotificationsSubject.next(JSON.parse(message.body));
        });
      }
    };

    this.stompClient.activate();
  }

  private subscribe(topic: string, callback: (message: IMessage) => void) {
    this.stompClient.subscribe(topic, callback);
  }

  sendMessage(destination: string, message: any) {
    this.stompClient.publish({ destination, body: JSON.stringify(message) });
  }
}