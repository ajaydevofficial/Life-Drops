import { environment } from './../environments/environment.prod';
import { Component } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Life Drops';
  ngOnInit(){
    firebase.initializeApp(environment.firebase)
  }
}
