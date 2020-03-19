import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  authenticationError = false;

  constructor(private router:Router) { }

  ngOnInit() {

      if(localStorage.getItem('loggedUser')){
        this.router.navigate(['/already-logged']);
      }
      else if(localStorage.getItem('adminID')){
        this.router.navigate(['/admin/dashboard']);
      }

  }

  authenticateAdmin(email,password){
    firebase.auth().signInWithEmailAndPassword(email,password).then((user)=>{
      localStorage.setItem('adminID',JSON.stringify(user.user.uid));
      this.router.navigate(['/admin/dashboard']);
    }).catch((error)=>{
      this.authenticationError = true;
      console.log(error);
    });
  }

}
