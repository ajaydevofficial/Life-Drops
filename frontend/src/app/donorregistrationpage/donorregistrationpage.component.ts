import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { NotifierService } from '../shared/notifier.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-donorregistrationpage',
  templateUrl: './donorregistrationpage.component.html',
  styleUrls: ['./donorregistrationpage.component.css']
})
export class DonorregistrationpageComponent implements OnInit {

  disabledValue:boolean = true;

  get userName(){
    return JSON.parse(localStorage.getItem('loggedUser')).displayName
  }
  get userEmail(){
    return JSON.parse(localStorage.getItem('loggedUser')).email
  }
  uid = JSON.parse(localStorage.getItem('loggedUser')).uid;
  constructor(private notifier:NotifierService,private router:Router) { }

  ngOnInit() {
  }

  registerDonor(dob,bloodgroup,phone,city){
    var today = new Date();
    if(dob!='' && bloodgroup!="0" && phone!='' && city!=''){
      firebase.database().ref('donors/' + this.uid).once('value',(snap)=>{
        if(!snap.exists()){
          firebase.database().ref('donors/' + this.uid ).push({
            full_name : this.userName,
            email : this.userEmail,
            date_of_birth  : dob,
            blood_group : bloodgroup,
            phone : phone,
            city : city,
            uid : this.uid,
            status : 'Can Donate',
            statusUpdateTime : new Date()
          }).then(()=>{
            this.notifier.display('success','You Have Succesfully Registered as Donor')
            this.router.navigate(['/'])
          }).catch(error=>{
            this.notifier.display('error','Oops! Something went wrong, please try again')
          })
        }
        else{
          this.notifier.display('error','User already registered')
        }
      })
    }
    else{
      this.notifier.display('error','Please enter all the details')
    }

  }

}
