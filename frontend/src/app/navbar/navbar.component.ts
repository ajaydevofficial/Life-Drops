import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as firebase from 'firebase';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {


  isLogin(){
    if(this.router.url=='/'){
      return true
    }
    else{
      return false
    }

  }
  isAdmin(){
    if(this.router.url.startsWith('/admin') && this.router.url!="/admin/login" ){
      return true;
    }
    else{
      return false;
    }
  }

  get userName(){
    if(localStorage.getItem('loggedUser'))
      return JSON.parse(localStorage.getItem('loggedUser')).displayName
  }

  get photoURL(){
    if(localStorage.getItem('loggedUser'))
      return JSON.parse(localStorage.getItem('loggedUser')).photoURL
  }

  constructor(private router:Router) { }

  ngOnInit() {

  }

  logout(){
    firebase.auth().signOut()
    localStorage.clear()
    this.router.navigate(['/'])
  }

}
