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
  uid;
  eventCount;
  urgentRequirementCount;
  requirementCount;
  userCity;
  currentDate;

  constructor() { }

    ngOnInit() {

      this.currentDate = this.formatDate(new Date())

      if(this.isUserAdmin()){
        firebase.database().ref('blood-donation-events/').on('value',(snap)=>{
          this.eventCount = snap.numChildren()
        });
        firebase.database().ref('urgent-requirments/').on('value',(snap)=>{
          this.urgentRequirementCount = snap.numChildren()
        });
        firebase.database().ref('blood-requirments/').on('value',(snap)=>{
          this.requirementCount = snap.numChildren()
          this.loaded = true;
        });
      }

      if(localStorage.getItem('loggedUser')){
        this.uid=JSON.parse(localStorage.getItem('loggedUser')).uid;
        firebase.database().ref('donors/' + this.uid).on('value',(snap)=>{
          this.isDonorRegistered = snap.exists();
          if(this.isDonorRegistered){
            snap.forEach(element => {
              this.userCity = element.val().city;
            });
            firebase.database().ref('blood-donation-events/').on('value',(snap)=>{
              this.eventCount = 0;
              snap.forEach(element=>{
                var value = element.val()
                if(value.city.toLowerCase() == this.userCity.toLowerCase() && this.currentDate < value.to_date ){
                  this.eventCount++;
                }
              });
            });
            firebase.database().ref('urgent-requirments/').on('value',(snap)=>{
              this.urgentRequirementCount = 0;
              snap.forEach(element=>{
                var value = element.val()
                if(value.city.toLowerCase() == this.userCity.toLowerCase() && value.status.toLowerCase()=='open' ){
                  this.urgentRequirementCount++;
                }
              });
            });
            firebase.database().ref('blood-requirments/').on('value',(snap)=>{
              this.requirementCount = 0;
              snap.forEach(element=>{
                var value = element.val()
                if(value.city.toLowerCase() == this.userCity.toLowerCase() && value.status.toLowerCase()=='open' ){
                  this.requirementCount++;
                }
              });
              this.loaded = true;
            });

          }
          else{
            this.loaded=true;
          }
        });
      }
    }

  isUserAdmin(){
    if(localStorage.getItem('adminID')){
      return true;
    }
    else{
      return false;
    }
  }
  formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;

    return [year, month, day].join('-');
  }s
}
