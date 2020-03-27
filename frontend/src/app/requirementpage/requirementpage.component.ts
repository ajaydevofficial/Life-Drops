import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-requirementpage',
  templateUrl: './requirementpage.component.html',
  styleUrls: ['./requirementpage.component.css']
})
export class RequirementpageComponent implements OnInit {

  requirementsList;
  uid;
  isDonorRegistered;
  userCity;

  constructor() { }

  ngOnInit() {
    window.moveTo(0,0);

    if(localStorage.getItem('loggedUser')){
      this.uid = JSON.parse(localStorage.getItem('loggedUser')).uid
      firebase.database().ref('donors/' + this.uid).on('value',(snap)=>{
        this.isDonorRegistered = snap.exists();
        if(snap.exists()){
          snap.forEach(element => {
            this.userCity = element.val().city;
          });
        }
      });
    }

    firebase.database().ref('blood-requirments').on('value',(snap)=>{
      this.requirementsList = [];
      snap.forEach(element=>{
        var value = element.val()
        value['directionLink'] = "https://www.google.com/maps/place/" + element.val().location.lat + ',' + element.val().location.lng;
        if(!this.isUserAdmin()){
          if(value.city.toLowerCase() == this.userCity.toLowerCase() && value.status.toLowerCase()!='closed' ){
            this.requirementsList.push(value);
          }
        }
        else{
          if(value.status.toLowerCase()!='closed'){
            this.requirementsList.push(value);
          }
        }
      });
    })

  }

  isUserAdmin(){
    if(localStorage.getItem('adminID')){
      return true;
    }
    else{
      return false;
    }
  }

}
