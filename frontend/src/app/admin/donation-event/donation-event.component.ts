import { ExportAsService, ExportAsConfig } from 'ngx-export-as';
import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { Router } from '@angular/router';

@Component({
  selector: 'app-donation-event',
  templateUrl: './donation-event.component.html',
  styleUrls: ['./donation-event.component.css']
})
export class DonationEventComponent implements OnInit {

  donationEventPageVerified;
  donationEventPageUnverified;

  donationEventListVerified
  donationEventListUnverified

  donationEventSearchTextVerified;
  donationEventSearchTextUnverified;

  constructor(private router:Router,private exportAsService: ExportAsService) { }

  exportAsConfigVerified: ExportAsConfig = {
    type: 'xlsx', // the type you want to download
    elementId: 'donationEventsVerified', // the id of html/table element
  }
  exportAsConfigUnverified: ExportAsConfig = {
    type: 'xlsx', // the type you want to download
    elementId: 'donationEventsUnverified', // the id of html/table element
  }

  ngOnInit() {

    if(!localStorage.getItem('adminID')){
      this.router.navigate(['/admin/login']);
    }

    firebase.database().ref('blood-donation-events').on('value',(snap)=>{
      this.donationEventListVerified = [];
      this.donationEventListUnverified = [];
      snap.forEach(element=>{
        var elementVal = element.val();
        elementVal['key'] = element.key;
        if(elementVal.status == "Verification Pending"){
          this.donationEventListUnverified.push(elementVal);
        }
        else{
          this.donationEventListVerified.push(elementVal);
        }
      })
    });
  }

  exportEventListVerified() {
    this.exportAsService.save(this.exportAsConfigVerified, 'Verified donation events').subscribe(() => {});
  }
  exportEventListUnverified() {
    this.exportAsService.save(this.exportAsConfigUnverified, 'Unverified donation events').subscribe(() => {});
  }

  deleteEvent(id){
    firebase.database().ref('blood-donation-events/' + id).remove();
  }

}
