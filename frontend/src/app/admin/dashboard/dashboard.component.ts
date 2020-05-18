import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { ExportAsConfig, ExportAsService } from 'ngx-export-as';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  pageCan;
  pageCannot;


  donorCanList;
  donorCannotList;

  donorCanSearchText;
  donorCannotSearchText;



  constructor(private router:Router,private exportAsService: ExportAsService,public modal: NgbActiveModal, private _modalService: NgbModal) { }

  exportAsConfigOfCanDonate: ExportAsConfig = {
    type: 'xlsx', // the type you want to download
    elementId: 'donorscantable', // the id of html/table element
  }
  exportAsConfigOfCannotDonate: ExportAsConfig = {
    type: 'xlsx', // the type you want to download
    elementId: 'donorscannottable', // the id of html/table element
  }

  ngOnInit() {

    if(!localStorage.getItem('adminID')){
      this.router.navigate(['/admin/login']);
    }

    firebase.database().ref('donors').on('value',(snap)=>{
      this.donorCanList = [];this.donorCannotList = [];
      snap.forEach(element=>{
        var value = element
        value.forEach((el) => {
          var elementVal = el.val();
          elementVal['donorKey'] = el.key;
          if(elementVal.status == 'Can Donate'){
            this.donorCanList.push(elementVal);
          }
          else{
            this.donorCannotList.push(elementVal);
          }

        });
      })
    });


  }

  exportCanDonorsList() {
    this.exportAsService.save(this.exportAsConfigOfCanDonate, 'Donors List Eligible').subscribe(() => {});
  }
  exportCannotDonorsList() {
    this.exportAsService.save(this.exportAsConfigOfCannotDonate, 'Donors List Ineligible').subscribe(() => {});
  }

  deleteDonor(uid){
    if(confirm("Confirm entry delete")){
      firebase.database().ref('donors/' + uid).remove();
    }
  }

}
