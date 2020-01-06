import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-donationeventpage',
  templateUrl: './donationeventpage.component.html',
  styleUrls: ['./donationeventpage.component.css']
})
export class DonationeventpageComponent implements OnInit {

  donationEventList = [1,2,3,4,5,6,7,8,9]
  constructor() { }

  ngOnInit() {
  }

}
