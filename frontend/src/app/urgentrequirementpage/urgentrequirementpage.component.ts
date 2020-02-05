import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-urgentrequirementpage',
  templateUrl: './urgentrequirementpage.component.html',
  styleUrls: ['./urgentrequirementpage.component.css']
})
export class UrgentrequirementpageComponent implements OnInit {

  urgentRequirementsList = [1,2,3,4,5]
  constructor() { }

  ngOnInit() {
    window.moveTo(0,0);
    firebase.database().ref('blood-donation-events').on('value',(snap)=>{
      this.urgentRequirementsList = []
      snap.forEach(element=>{
        var value = element.val()
        value['directionLink'] = "https://www.google.com/maps/place/" + element.val().location.lat + ',' + element.val().location.lng;
        this.urgentRequirementsList.push(value);
      })
    })
  }

}
