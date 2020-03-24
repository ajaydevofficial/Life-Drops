import { ExportAsConfig, ExportAsService } from 'ngx-export-as';
import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-requirement',
  templateUrl: './requirement.component.html',
  styleUrls: ['./requirement.component.css']
})
export class RequirementComponent implements OnInit {

  requirementsList;
  searchText;
  page;

  closedrequirementsList;
  closedSearchText;
  closedPage

  constructor(private exportAsService:ExportAsService) { }

  exportAsConfig: ExportAsConfig = {
    type: 'xlsx',
    elementId: 'table',
  }
  exportAsConfigClosed: ExportAsConfig = {
    type: 'xlsx',
    elementId: 'closedtable',
  }

  ngOnInit() {
    firebase.database().ref('blood-requirments').on('value',(snap)=>{
      this.requirementsList = [];
      this.closedrequirementsList = [];
      snap.forEach(element=>{
        var value = element.val();
        value['key'] = element.key;
        if(value.status == 'open'){
          this.requirementsList.push(value);
        }
        else{
          this.closedrequirementsList.push(value);
        }
      })
    })
  }

  export() {
    this.exportAsService.save(this.exportAsConfig, 'blood-requirments').subscribe(() => {});
  }

  closedExport() {
    this.exportAsService.save(this.exportAsConfigClosed, 'blood-requirments-closed').subscribe(() => {});
  }

  close(key){
    firebase.database().ref('blood-requirments/' + key).update({
      status: "closed",
      verification: "Verified"
    });
  }

  delete(key){
    firebase.database().ref('blood-requirments/' + key).remove();
  }

}
