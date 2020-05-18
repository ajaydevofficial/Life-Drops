import { ExportAsConfig, ExportAsService } from 'ngx-export-as';
import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-urgent-requirement',
  templateUrl: './urgent-requirement.component.html',
  styleUrls: ['./urgent-requirement.component.css']
})
export class UrgentRequirementComponent implements OnInit {

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
    firebase.database().ref('urgent-requirments').on('value',(snap)=>{
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
    this.exportAsService.save(this.exportAsConfig, 'urgent requirements').subscribe(() => {});
  }

  closedExport() {
    this.exportAsService.save(this.exportAsConfigClosed, 'urgent requirements-closed').subscribe(() => {});
  }

  close(key){
    if(confirm("Confirm closing requirement")){
      firebase.database().ref('urgent-requirments/' + key).update({
        status: "closed",
        verification: "Verified"
      });
    }
  }

  delete(key){
    if(confirm("Confirm entry delete")){
      firebase.database().ref('urgent-requirments/' + key).remove();
    }
  }

}
