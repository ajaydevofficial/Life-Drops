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

  constructor(private router:Router) {

  }

  ngOnInit() {

   firebase.database().ref('donors').on('value',(snap)=>{
    snap.forEach(element=>{
      var value = element
      value.forEach((el) => {
        var elementVal = el.val();
        if(!elementVal.statusUpdateTime){
          firebase.database().ref('donors/'+ elementVal.uid + '/' + el.key).update(
            {
              statusUpdateTime: new Date()
            }
          )

        }
        if(elementVal.status == 'Cannot Donate'){
          if(elementVal.statusUpdateTime){
            var dateObject = new Date(elementVal.statusUpdateTime);
            var currentDate = new Date();
            if(this.monthDiff(dateObject,currentDate)>=3){
              firebase.database().ref('donors/'+ elementVal.uid + '/' + el.key).update(
                {
                  status: 'Can Donate'
                }
              )
            }
          }
        }
      });
    })
  })

  }

  logout(){
    firebase.auth().signOut()
    localStorage.clear()
    this.router.navigate(['/'])
  }

  monthDiff(d1, d2) {
    var months;
    months = (d2.getFullYear() - d1.getFullYear()) * 12;
    months -= d1.getMonth() + 1;
    months += d2.getMonth();
    return months <= 0 ? 0 : months;
  }

}
