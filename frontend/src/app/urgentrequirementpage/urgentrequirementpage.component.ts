import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-urgentrequirementpage',
  templateUrl: './urgentrequirementpage.component.html',
  styleUrls: ['./urgentrequirementpage.component.css']
})
export class UrgentrequirementpageComponent implements OnInit {

  urgentRequirementsList = [1,2,3,4,5]
  constructor() { }

  ngOnInit() {
  }

}
