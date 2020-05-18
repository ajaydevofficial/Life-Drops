import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { MapsAPILoader, MouseEvent } from '@agm/core';
import * as firebase from 'firebase'
import { NotifierService } from '../shared/notifier.service';

@Component({
  selector: 'app-createdonationeventpage',
  templateUrl: './createdonationeventpage.component.html',
  styleUrls: ['./createdonationeventpage.component.css']
})
export class CreatedonationeventpageComponent implements OnInit {

  latitude: number;
  longitude: number;
  zoom:number;
  geoCoder;

  constructor(private mapsAPILoader: MapsAPILoader,private ngZone: NgZone,private notifier:NotifierService) { }

  ngOnInit(){

    //load Places Autocomplete
    this.mapsAPILoader.load().then(() => {
      this.setCurrentLocation();
      this.geoCoder = new google.maps.Geocoder;

      let autocomplete = new google.maps.places.Autocomplete(
        <HTMLInputElement>document.getElementById("address"), {
        types: ['address']
      });
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {

          //get the place result
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();

          //verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }

          //set latitude, longitude and zoom
          this.latitude = place.geometry.location.lat();
          this.longitude = place.geometry.location.lng();
          this.zoom = 12;
        });
      });
    });
  }


  setCurrentLocation() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 15;
      });
    }
  }

  markerDragEnd($event: MouseEvent) {
    this.latitude = $event.coords.lat;
    this.longitude = $event.coords.lng;
  }

  newDonationEvent(from_date,to_date,place,area,city,phone){
    if(from_date&&to_date&&place&&area&&city){
      if(phone.length>=10 && this.checkPhoneStatus(phone)){
        firebase.database().ref('blood-donation-events/').push({
          from_date : from_date,
          to_date : to_date,
          place : place,
          phone: phone,
          area : area,
          city : city,
          location : {
            lat : this.latitude,
            lng : this.longitude
          },
          status : 'Verification Pending'
        }).then(()=>{
          this.notifier.display('success', 'Succesfully send to admin for verification, will appear once admins verify the event')
          let inputs = document.getElementsByTagName('input');
          for (var i=0;i<inputs.length;i++) {
            inputs[i].value='';
          }
        }).catch((error)=>{
          this.notifier.display('error','Something went wrong')
        })
      }
      else{
        this.notifier.display('error','Phone number is invalid')
      }
    }
    else{
      this.notifier.display('error','Please fill all the details')
    }

  }
  checkPhoneStatus(phone){
    var reg = /^\d+$/;
    return reg.test(phone);
  }

}
