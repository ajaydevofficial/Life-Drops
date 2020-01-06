import LocationPicker from 'location-picker';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-createurgentrequirementpage',
  templateUrl: './createurgentrequirementpage.component.html',
  styleUrls: ['./createurgentrequirementpage.component.css']
})
export class CreateurgentrequirementpageComponent implements OnInit {

  lp: LocationPicker;
  constructor() { }

  ngOnInit(){
    this.lp = new LocationPicker(
      'map',
      {setCurrentPosition:false},
      {zoom:10},
    );
    this.lp.setLocation(11,11)
    
  }
  
  setLocation() {
    console.log(this.lp.getMarkerPosition());
  }

}
