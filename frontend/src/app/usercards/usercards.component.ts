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
  eventCount;
  urgentRequirementCount;
  requirementCount;

  constructor() { }

  ngOnInit() {
    firebase.database().ref('blood-donation-events/').on('value',(snap)=>{
      this.eventCount = snap.numChildren()
    });
    firebase.database().ref('urgent-requirments/').on('value',(snap)=>{
      this.urgentRequirementCount = snap.numChildren()
    });
    firebase.database().ref('blood-requirments/').on('value',(snap)=>{
      this.requirementCount = snap.numChildren()
    });
    firebase.database().ref('donors/' + this.uid).on('value',(snap)=>{
        this.isDonorRegistered = snap.exists();
        this.loaded = true;
    });
  }



}
