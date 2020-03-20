import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { MapsAPILoader, MouseEvent } from '@agm/core';
import * as firebase from 'firebase'
import { NotifierService } from '../shared/notifier.service';

@Component({
  selector: 'app-createurgentrequirementpage',
  templateUrl: './createurgentrequirementpage.component.html',
  styleUrls: ['./createurgentrequirementpage.component.css']
})
export class CreateurgentrequirementpageComponent implements OnInit {

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

  newUrgentRequirement(
    patient,
    doctor,
    bystander,
    bystanderphone,
    bloodgroup,
    quantity,
    hospital,
    area,
    city
    ){

    if(patient!="" &&doctor!="" && bystander!="" && bystanderphone!="" && bloodgroup!="0" && quantity!="" && hospital!="" && area!="" && city!=""){

      firebase.database().ref('urgent-requirments/').push({

        patient_name : patient,
        doctor_name : doctor,
        bystander_name : bystander,
        bystander_phone : bystanderphone,
        blood_group:bloodgroup,
        quantity:quantity,
        hospital:hospital,
        area:area,
        city : city,
        location : {
          lat : this.latitude,
          lng : this.longitude
        },
        verification : 'Verification Pending',
        status : 'open'
      }).then(()=>{
        this.notifier.display('success', 'Succesfully send to admin for verification, will appear once admins verify the event')
        let inputs = document.getElementsByTagName('input');
        for (var i=0;i<inputs.length;i++) {
          inputs[i].value='';
        }
      }).catch(error=>{
        this.notifier.display('error','Something went wrong')
      })
    }
    else{
      this.notifier.display('error','Please fill all the details');
    }
  }

}
