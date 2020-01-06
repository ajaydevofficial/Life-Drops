import { Component, OnInit } from '@angular/core';
import LocationPicker from "location-picker";

@Component({
  selector: 'app-createdonationeventpage',
  templateUrl: './createdonationeventpage.component.html',
  styleUrls: ['./createdonationeventpage.component.css']
})
export class CreatedonationeventpageComponent implements OnInit {

  lp: LocationPicker;
  constructor() { }

  ngOnInit(){
    this.lp = new LocationPicker('map');
  }
  
  setLocation() {
    console.log(this.lp.getMarkerPosition());
  }


}
