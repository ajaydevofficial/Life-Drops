import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase'

@Component({
  selector: 'app-usercards',
  templateUrl: './usercards.component.html',
  styleUrls: ['./usercards.component.css']
})
export class UsercardsComponent implements OnInit {

  loaded:boolean = false;
  isDonorRegistered:boolean;
  uid = JSON.parse(localStorage.getItem('loggedUser')).uid

  constructor() { }

  ngOnInit() {
    firebase.database().ref('donors/' + this.uid).on('value',(snap)=>{
        this.isDonorRegistered = snap.exists();
        this.loaded = true;
    });
  }



}
