import { Component, OnInit } from '@angular/core';
import {WebSocketService} from '../services/web-socket.service';
import {AuthService} from '../services/auth.service';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {
  greeting: any;
  name: string;

  constructor(private webSocketService: WebSocketService, private authService: AuthService) { }

  ngOnInit() {
    this.authService.getToken({'email': 'mr@ya.com', 'password': '12345'});
  }

  connect(){
    this.webSocketService.connect();
  }

  disconnect(){
    this.webSocketService.disconnect();
  }

  sendMessage(){
    this.webSocketService.sendMessage(this.name);
  }

  sendMessage2(){
    this.webSocketService.sendMessage2(this.name);
  }

  handleMessage(message){
    this.greeting = message;
  }

}
