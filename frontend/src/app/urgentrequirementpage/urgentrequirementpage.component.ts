import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-urgentrequirementpage',
  templateUrl: './urgentrequirementpage.component.html',
  styleUrls: ['./urgentrequirementpage.component.css']
})
export class UrgentrequirementpageComponent implements OnInit {

  urgentRequirementsList;
  constructor() { }

  ngOnInit() {
    window.moveTo(0,0);
    firebase.database().ref('urgent-requirments').on('value',(snap)=>{
      this.urgentRequirementsList = []
      snap.forEach(element=>{
        var value = element.val()
        value['directionLink'] = "https://www.google.com/maps/place/" + element.val().location.lat + ',' + element.val().location.lng;
        this.urgentRequirementsList.push(value);
      })
    })

  }

}
