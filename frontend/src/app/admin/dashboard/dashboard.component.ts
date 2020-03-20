import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  page;
  donorList;
  constructor(private router:Router) { }

  ngOnInit() {
    if(!localStorage.getItem('adminID')){
      this.router.navigate(['/admin/login']);
    }
    firebase.database().ref('donors').on('value',(snap)=>{
      this.donorList = []
      snap.forEach(element=>{
        var value = element
        value.forEach((el) => {
          this.donorList.push(el.val());
        });
      })
      console.log(this.donorList)
    })
  }

}
