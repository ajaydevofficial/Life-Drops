import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-donationeventpage',
  templateUrl: './donationeventpage.component.html',
  styleUrls: ['./donationeventpage.component.css']
})
export class DonationeventpageComponent implements OnInit {

  donationEventList;
  currentDate; 
  constructor() { }

  ngOnInit() {
    this.currentDate = this.formatDate(new Date())
    window.moveTo(0,0);
    firebase.database().ref('blood-donation-events').on('value',(snap)=>{
      this.donationEventList = []
      snap.forEach(element=>{
        var value = element.val()
        value['directionLink'] = "https://www.google.com/maps/place/" + element.val().location.lat + ',' + element.val().location.lng;
        this.donationEventList.push(value);
      })
    })
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
