import { NotifierService } from './shared/notifier.service';
import { environment } from './../environments/environment';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AgmCoreModule } from '@agm/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomepageComponent } from './homepage/homepage.component';
import { UsercardsComponent } from './usercards/usercards.component';
import { FooterComponent } from './footer/footer.component';
import { NotificationpageComponent } from './notificationpage/notificationpage.component';
import { LoginpageComponent } from './loginpage/loginpage.component';
import { DonationeventpageComponent } from './donationeventpage/donationeventpage.component';
import { UrgentrequirementpageComponent } from './urgentrequirementpage/urgentrequirementpage.component';
import { RequirementpageComponent } from './requirementpage/requirementpage.component';
import { DonorregistrationpageComponent } from './donorregistrationpage/donorregistrationpage.component';
import { CreaterequirementpageComponent } from './createrequirementpage/createrequirementpage.component';
import { CreateurgentrequirementpageComponent } from './createurgentrequirementpage/createurgentrequirementpage.component';
import { CreatedonationeventpageComponent } from './createdonationeventpage/createdonationeventpage.component';
import { AboutpageComponent } from './aboutpage/aboutpage.component';
import { ContactpageComponent } from './contactpage/contactpage.component';
import { NotifierComponent } from './notifier/notifier.component';

import { AngularFireModule } from  '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { LoginGuard } from './route.guard';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { LoginComponent } from './admin/login/login.component';
import { AlreadyLoggedComponent } from './already-logged/already-logged.component';
import { Error404Component } from './error404/error404.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomepageComponent,
    UsercardsComponent,
    FooterComponent,
    NotificationpageComponent,
    LoginpageComponent,
    DonationeventpageComponent,
    UrgentrequirementpageComponent,
    RequirementpageComponent,
    DonorregistrationpageComponent,
    CreaterequirementpageComponent,
    CreateurgentrequirementpageComponent,
    CreatedonationeventpageComponent,
    AboutpageComponent,
    ContactpageComponent,
    NotifierComponent,
    DashboardComponent,
    LoginComponent,
    AlreadyLoggedComponent,
    Error404Component
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AgmCoreModule.forRoot({
      apiKey:environment.googleMapAPI,
      libraries: ['geometry', 'places']
    })
  ],
  providers: [NotifierService,LoginGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
