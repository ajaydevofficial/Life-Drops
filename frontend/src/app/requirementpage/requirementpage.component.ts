import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-requirementpage',
  templateUrl: './requirementpage.component.html',
  styleUrls: ['./requirementpage.component.css']
})
export class RequirementpageComponent implements OnInit {
  requirementsList = [1,2,3,4,5,6,7,8,9,10,11,12,12,14,15];
  constructor() { }

  ngOnInit() {
  }

}
