import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { MapsAPILoader, MouseEvent } from '@agm/core';
import * as firebase from 'firebase'
import { NotifierService } from '../shared/notifier.service';
var longitude;
var latitude;

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
  cityName;

  constructor(private mapsAPILoader: MapsAPILoader,private ngZone: NgZone,private notifier:NotifierService) { }

  ngOnInit(){
    var map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: 10.8505159, lng: 76.2710833},
      zoom: 10,
      mapTypeId: 'roadmap'
    });

    // Create the search box and link it to the UI element.

    var input = <HTMLInputElement>document.getElementById('pac-input');
    var searchBox = new google.maps.places.SearchBox(input);

    // Bias the SearchBox results towards current map's viewport.
    map.addListener('bounds_changed', function() {
      searchBox.setBounds(map.getBounds());
    });

    var markers = [];
    // Listen for the event fired when the user selects a prediction and retrieve
    // more details for that place.
    searchBox.addListener('places_changed', function() {
      var places = searchBox.getPlaces();

      if (places.length == 0) {
        return;
      }

      // Clear out the old markers.
      markers.forEach(function(marker) {
        marker.setMap(null);
      });
      markers = [];

      // For each place, get the icon, name and location.
      var bounds = new google.maps.LatLngBounds();
      places.forEach(function(place) {
        if (!place.geometry) {
          console.log("Returned place contains no geometry");
          return;
        }
        var icon = {
          url: place.icon,
          size: new google.maps.Size(71, 71),
          origin: new google.maps.Point(0, 0),
          anchor: new google.maps.Point(17, 34),
          scaledSize: new google.maps.Size(25, 25)
        };

        // Create a marker for each place.
        markers.push(new google.maps.Marker({
          map: map,
          icon: icon,
          title: place.name,
          position: place.geometry.location
        }));

        if (place.geometry.viewport) {
          // Only geocodes have viewport.
          bounds.union(place.geometry.viewport);
        } else {
          bounds.extend(place.geometry.location);
        }
        latitude = place.geometry.location.lat();
        longitude = place.geometry.location.lng();
        console.log(latitude,longitude)
      });
      map.fitBounds(bounds);
    });
  }

  newUrgentRequirement(
    patient,
    doctor,
    bystander,
    bystanderphone,
    bloodgroup,
    quantity,
    hospital,
    area
    ){

    if(patient!="" &&doctor!="" && bystander!="" && bystanderphone!="" && bloodgroup!="0" && quantity!="" && hospital!="" && area!="" && this.cityName!="" &&latitude&&longitude){
      if(bystanderphone.length>=10 && this.checkPhoneStatus(bystanderphone)){
        firebase.database().ref('urgent-requirments/').push({
          patient_name : patient,
          doctor_name : doctor,
          bystander_name : bystander,
          bystander_phone : bystanderphone,
          blood_group:bloodgroup,
          quantity:quantity,
          hospital:hospital,
          area:area,
          city : this.cityName,
          location : {
            lat : latitude,
            lng : longitude
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
        this.notifier.display('error','Phone number is invalid')
      }
    }
    else{
      this.notifier.display('error','Please fill all the details including map location');
    }
  }
  checkPhoneStatus(phone){
    var reg = /^\d+$/;
    return reg.test(phone);
  }

}
