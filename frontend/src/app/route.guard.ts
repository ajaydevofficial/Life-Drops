import {CanActivate, Router} from  '@angular/router'
import * as firebase from 'firebase';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class LoginGuard implements CanActivate{

    constructor(){

    }
    canActivate(): boolean {
        if(localStorage.getItem('loggedUser')){
            return true;
        }
        else{

            return false;
        }
    }

}

