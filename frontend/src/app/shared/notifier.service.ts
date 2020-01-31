import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotifierService {

  sub = new Subject<any>();
  emitter = this.sub.asObservable();

  display(type,message){
    this.sub.next({type,message})
  }
  
}
