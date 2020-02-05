import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase';
import { Router } from '@angular/router';

@Component({
  selector: 'app-loginpage',
  templateUrl: './loginpage.component.html',
  styleUrls: ['./loginpage.component.css']
})
export class LoginpageComponent implements OnInit {

  constructor(private afAuth:AngularFireAuth,private router:Router) { 
    if(localStorage.getItem('loggedUser')){
      this.router.navigate(['/dashboard'])
    }
  }

  ngOnInit() {
  }

  async login(){
    this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider()).then(()=>{
      if(firebase.auth().currentUser){
        window.location.reload()
        localStorage.setItem('loggedUser',JSON.stringify(firebase.auth().currentUser))
        this.router.navigate(['/fakeredirect'])
      }
    })
   
  }

}
