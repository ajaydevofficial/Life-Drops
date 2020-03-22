import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { ExportAsConfig, ExportAsService } from 'ngx-export-as';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  page;
  donorList;
  donorSearchText;
  constructor(private router:Router,private exportAsService: ExportAsService) { }

  exportAsConfig: ExportAsConfig = {
    type: 'xlsx', // the type you want to download
    elementId: 'donorstable', // the id of html/table element
  }

  ngOnInit() {

    if(!localStorage.getItem('adminID')){
      this.router.navigate(['/admin/login']);
    }

    firebase.database().ref('donors').on('value',(snap)=>{
      this.donorList = []
      snap.forEach(element=>{
        var value = element
        value.forEach((el) => {
          var elementVal = el.val();
          elementVal['donorKey'] = el.key;
          this.donorList.push(elementVal);
        });
      })
      console.log(this.donorList)
    })
  }

  exportDonorsList() {
    this.exportAsService.save(this.exportAsConfig, 'Donors List').subscribe(() => {});
  }


}
