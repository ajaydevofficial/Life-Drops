import LocationPicker from "location-picker";
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-createrequirementpage',
  templateUrl: './createrequirementpage.component.html',
  styleUrls: ['./createrequirementpage.component.css']
})
export class CreaterequirementpageComponent implements OnInit {

  lp: LocationPicker;
  constructor() { }

  ngOnInit(){
    this.lp = new LocationPicker('map');
  }
  
  setLocation() {
    console.log(this.lp.getMarkerPosition());
  }

}
