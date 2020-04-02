import {Injectable} from '@angular/core';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';

export interface TestModel {
  name: string;
  age: number;
}

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {

  webSocketEndPoint = 'http://localhost:8080/ws';
  topic = '/topic';
  stompClient: any;

  constructor() { }

  connect() {
    console.log('Initialize WebSocket Connection');
    const ws = new SockJS(this.webSocketEndPoint);
    this.stompClient = Stomp.over(ws);
    const thiz = this;
    thiz.stompClient.connect({'X-Authorization': 'Bearer ' + localStorage.getItem('access_token')},
      () => {
        thiz.stompClient.subscribe(thiz.topic, (sdkEvent) => {
            console.log(sdkEvent);
            thiz.onMessageReceived(sdkEvent);
        });
        thiz.stompClient.subscribe('/user/queue/reply', (message) => {
            alert('Message ' + message.body);
        });
      },
      (err) => this.errorCallBack(err));
  }

  disconnect() {
    if (this.stompClient !== null) {
      this.stompClient.disconnect();
    }
    console.log('Disconnected');
  }

  // on error, schedule a reconnection attempt
  errorCallBack(error) {
    console.log('errorCallBack -> ' + error);
    /*setTimeout(() => {
      this.connect();
    }, 5000);*/
  }

  sendMessage(message) {
    message = {name: 'Serhiy', age: 39};
    this.stompClient.send('/app/message', {}, JSON.stringify(message));
  }

  sendMessage2(message) {
    message = {name: 'Serhiy', age: 39};
    this.stompClient.send('/app/send/message', {}, JSON.stringify(message));
  }

  onMessageReceived(message) {
    const object: TestModel = JSON.parse(message.body) as TestModel;
    console.log('Message Received from Server : ' + object.name);
    // console.log(JSON.stringify(message.body));
  }
}
