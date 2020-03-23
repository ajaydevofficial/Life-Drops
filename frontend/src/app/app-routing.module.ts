import { AlreadyLoggedComponent } from './already-logged/already-logged.component';
import { LoginComponent } from './admin/login/login.component';
import { LoginGuard} from './route.guard';
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
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { Error404Component } from './error404/error404.component';
import { DonationEventComponent } from './admin/donation-event/donation-event.component';


const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forRoot([
    {path:'dashboard',component:HomepageComponent,canActivate:[LoginGuard]},
    {path:'',component:LoginpageComponent},
    {path:'blood-donation-event',component:DonationeventpageComponent,canActivate:[LoginGuard]},
    {path:'urgent-requirement',component:UrgentrequirementpageComponent,canActivate:[LoginGuard]},
    {path:'requirement',component:RequirementpageComponent,canActivate:[LoginGuard]},
    {path:'registration/donor',component:DonorregistrationpageComponent,canActivate:[LoginGuard]},
    {path:'notifications',component:NotificationpageComponent,canActivate:[LoginGuard]},
    {path:'create/blood-donation-event',component:CreatedonationeventpageComponent,canActivate:[LoginGuard]},
    {path:'create/urgent-requirement',component:CreateurgentrequirementpageComponent,canActivate:[LoginGuard]},
    {path:'create/requirement',component:CreaterequirementpageComponent,canActivate:[LoginGuard]},
    {path:'about',component:AboutpageComponent},
    {path:'contact',component:ContactpageComponent},
    {path:'admin/login',component:LoginComponent},
    {path:'admin/dashboard',component:DashboardComponent,},
    {path:'admin/blood-donation-events',component:DonationEventComponent},
    {path:'already-logged',component:AlreadyLoggedComponent},
    {path:'404',component:Error404Component},
    {path:'**',redirectTo: '/404'}
  ])],
  exports: [RouterModule]
})
export class AppRoutingModule { }
