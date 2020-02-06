import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-requirementpage',
  templateUrl: './requirementpage.component.html',
  styleUrls: ['./requirementpage.component.css']
})
export class RequirementpageComponent implements OnInit {
  requirementsList;
  constructor() { }

  ngOnInit() {
    window.moveTo(0,0);
    firebase.database().ref('blood-requirments').on('value',(snap)=>{
      this.requirementsList = []
      snap.forEach(element=>{
        var value = element.val()
        value['directionLink'] = "https://www.google.com/maps/place/" + element.val().location.lat + ',' + element.val().location.lng;
        this.requirementsList.push(value);
      })
      console.log(this.requirementsList)
    })
    
  }

}
