import { ExportAsService, ExportAsConfig } from 'ngx-export-as';
import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { Router } from '@angular/router';
import { isNgTemplate } from '@angular/compiler';

@Component({
  selector: 'app-donation-event',
  templateUrl: './donation-event.component.html',
  styleUrls: ['./donation-event.component.css']
})
export class DonationEventComponent implements OnInit {

  upcomingDonationEventPage;
  ongoingDonationEventPage;
  overDonationEventPage;
  donationEventPageUnverified;

  upcomingDonationEvents;
  ongoingDonationEvents;
  overDonationEvents;
  donationEventListUnverified;

  upcomingDonationEventSearchTextVerified;
  ongoingDonationEventSearchTextVerified;
  overDonationEventSearchTextVerified;

  donationEventSearchTextUnverified;

  currentDate;

  constructor(private router:Router,private exportAsService: ExportAsService) { }

  exportAsConfigVerifiedUpcoming: ExportAsConfig = {
    type: 'xlsx', // the type you want to download
    elementId: 'upcomingDonationEvents', // the id of html/table element
  }

  exportAsConfigVerifiedOngoing: ExportAsConfig = {
    type: 'xlsx', // the type you want to download
    elementId: 'ongoingDonationEvents', // the id of html/table element
  }
  exportAsConfigVerifiedOver: ExportAsConfig = {
    type: 'xlsx', // the type you want to download
    elementId: 'overDonationEvents', // the id of html/table element
  }
  exportAsConfigUnverified: ExportAsConfig = {
    type: 'xlsx', // the type you want to download
    elementId: 'donationEventListUnverified', // the id of html/table element
  }

  ngOnInit() {

    this.currentDate = this.formatDate(new Date());

    if(!localStorage.getItem('adminID')){
      this.router.navigate(['/admin/login']);
    }

    firebase.database().ref('blood-donation-events').on('value',(snap)=>{

      this.upcomingDonationEvents= [];
      this.ongoingDonationEvents = [];
      this.overDonationEvents = [];
      this.donationEventListUnverified = [];

      snap.forEach(element=>{

        var elementVal = element.val();
        elementVal['key'] = element.key;

        if(elementVal.to_date < this.currentDate){
          this.overDonationEvents.push(elementVal);
        }
        if(elementVal.status == "Verification Pending"){
          console.log(elementVal)
          if(!(elementVal.to_date < this.currentDate)){
            this.donationEventListUnverified.push(elementVal);
          }
        }
        else{
          if(elementVal.from_date > this.currentDate){
            this.upcomingDonationEvents.push(elementVal);
          }
          else if((this.currentDate >= elementVal.from_date) && (this.currentDate <= elementVal.to_date)){

            this.ongoingDonationEvents.push(elementVal);

          }
        }

      })
    });
  }

  exportUpcomingEventListVerified() {
    this.exportAsService.save(this.exportAsConfigVerifiedUpcoming, 'donation events-upcoming').subscribe(() => {});
  }
  exportOngoingEventListVerified() {
    this.exportAsService.save(this.exportAsConfigVerifiedOngoing, 'donation events-ongoing').subscribe(() => {});
  }
  exportOverEventListVerified() {
    this.exportAsService.save(this.exportAsConfigVerifiedOver, 'donation events-over').subscribe(() => {});
  }

  exportEventListUnverified() {
    this.exportAsService.save(this.exportAsConfigUnverified, 'Unverified donation events').subscribe(() => {});
  }

  verifyEvent(key){
    firebase.database().ref('blood-donation-events/' + key).update({
      status: "Verified"
    });
  }

  deleteEvent(id){
    firebase.database().ref('blood-donation-events/' + id).remove();
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
  }

}
