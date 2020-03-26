import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css']
})
export class CardsComponent implements OnInit {

  eventCount:number;
  urgentRequirementCount:number;
  requirementCount:number;
  loaded:boolean = false;

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
      this.loaded = true;
    })
  }

}
