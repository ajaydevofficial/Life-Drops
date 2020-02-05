import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { NotifierService } from '../shared/notifier.service';
import { stringify } from 'querystring';
import { Router } from '@angular/router';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  loaded:boolean = false;
  isDonorRegistered:boolean;
  uid = JSON.parse(localStorage.getItem('loggedUser')).uid
  donorDetails;
  cityEditDisabled:boolean = true;
  cityEditActivated:boolean = true;
  cityChangeActivated:boolean = false;
  donorKey;

  get userName(){
    return JSON.parse(localStorage.getItem('loggedUser')).displayName
  }

  get canDonate(){
    if(this.donorDetails.status=="Can Donate"){
      return true
    }
    else{
      return false
    }
  }

  constructor(private notifier: NotifierService,private router:Router) { 

  }

  ngOnInit() {
    firebase.database().ref('donors/' + this.uid).on('value',(snap)=>{
      this.isDonorRegistered = snap.exists();
      if(snap.exists()){
        snap.forEach(element => {
          this.donorDetails = element.val()
          this.donorKey = element.key;
        });
      }
      this.loaded = true;
    });
  }

  activateCityEdit(){
    this.cityEditActivated = !this.cityEditActivated;
    this.cityChangeActivated = !this.cityChangeActivated;
    this.cityEditDisabled = !this.cityEditDisabled;
  }

  updateCity(city){
    firebase.database().ref('donors/' + this.uid + '/' + this.donorKey ).update({
      city:city
    }).then(()=>{
      this.cityEditActivated = !this.cityEditActivated;
      this.cityChangeActivated = !this.cityChangeActivated;
      this.cityEditDisabled = !this.cityEditDisabled;
      this.notifier.display('success', 'Success! City updated')
    }).catch(()=>{
      this.cityEditActivated = !this.cityEditActivated;
      this.cityChangeActivated = !this.cityChangeActivated;
      this.cityEditDisabled = !this.cityEditDisabled;
      this.notifier.display('error', 'Oops! Something went wrong')
    })
  }

  changeStatus(current){

    let newStatus:string;
    if(current=='Can Donate'){
      newStatus = 'Cannot Donate'
    }
    else if(current=='Cannot Donate'){
      newStatus = 'Can Donate'
    }
    
    firebase.database().ref('donors/' + this.uid + '/' + this.donorKey ).update({
      status:newStatus
    }).then(()=>{
      this.notifier.display('success', 'Status updated')
    }).catch(()=>{
      this.notifier.display('error', 'Something went wrong')
    })

  }

}
