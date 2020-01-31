import { NotifierService } from './../shared/notifier.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-notifier',
  templateUrl: './notifier.component.html',
  styleUrls: ['./notifier.component.css']
})
export class NotifierComponent implements OnInit {

  type:String = null;
  message:String = null;

  constructor(private notifier:NotifierService) {
    notifier.emitter.subscribe(
      notification=>{
        this.type = notification.type;
        this.message = notification.message; 
        this.reset();
      },
      error=>{
        console.log(error)
      }
      
    )
  }

  ngOnInit() {
  }

  reset(){
    setTimeout(()=>{
      this.type = null;
      this.message = null;
    },5000)
  }

}
