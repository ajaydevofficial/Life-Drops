import { ContactpageComponent } from './contactpage/contactpage.component';
import { AboutpageComponent } from './aboutpage/aboutpage.component';
import { CreaterequirementpageComponent } from './createrequirementpage/createrequirementpage.component';
import { CreateurgentrequirementpageComponent } from './createurgentrequirementpage/createurgentrequirementpage.component';
import { CreatedonationeventpageComponent } from './createdonationeventpage/createdonationeventpage.component';
import { NotificationpageComponent } from './notificationpage/notificationpage.component';
import { DonorregistrationpageComponent } from './donorregistrationpage/donorregistrationpage.component';
import { RequirementpageComponent } from './requirementpage/requirementpage.component';
import { UrgentrequirementpageComponent } from './urgentrequirementpage/urgentrequirementpage.component';
import { DonationeventpageComponent } from './donationeventpage/donationeventpage.component';
import { LoginpageComponent } from './loginpage/loginpage.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';


const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forRoot([
    {path:'',component:HomepageComponent},
    {path:'login',component:LoginpageComponent},
    {path:'blood-donation-event',component:DonationeventpageComponent},
    {path:'urgent-requirement',component:UrgentrequirementpageComponent},
    {path:'requirement',component:RequirementpageComponent},
    {path:'registration/donor',component:DonorregistrationpageComponent},
    {path:'notifications',component:NotificationpageComponent},
    {path:'create/blood-donation-event',component:CreatedonationeventpageComponent},
    {path:'create/urgent-requirement',component:CreateurgentrequirementpageComponent},
    {path:'create/requirement',component:CreaterequirementpageComponent},
    {path:'about',component:AboutpageComponent},
    {path:'contact',component:ContactpageComponent},
  ])],
  exports: [RouterModule]
})
export class AppRoutingModule { }
