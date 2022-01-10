import { NgModule } from '@angular/core';
import { BrowserModule, Title } from '@angular/platform-browser';
import { GoogleMapsModule } from '@angular/google-maps';


import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BottomNavModule } from 'ngx-bottom-nav';
import { MatIconModule } from '@angular/material/icon';
import { MatSliderModule } from '@angular/material/slider';
import { MatToolbarModule } from '@angular/material/toolbar';



import { NavigationComponent } from './navigation/navigation.component';
import { EventsComponent } from './events/events.component';
import { MapComponent } from './map/map.component';
import { PersonalComponent } from './personal/personal.component';
import { ExploreComponent } from './explore/explore.component';
import { DiscoverComponent } from './discover/discover.component';
import { EventCardComponent } from './event-card/event-card.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import * as moment from 'moment';
import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';
import { MatBadgeModule } from '@angular/material/badge';
import { EventDetailPageComponent } from './event-detail-page/event-detail-page.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';



@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    NavigationComponent,
    EventsComponent,
    MapComponent,
    PersonalComponent,
    ExploreComponent,
    DiscoverComponent,
    EventCardComponent,
    LoginComponent,
    RegisterComponent,
    EventDetailPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    BottomNavModule,
    MatIconModule,
    MatSliderModule,
    MatToolbarModule,
    GoogleMapsModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    NgxMaterialTimepickerModule,
    MatBadgeModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the app is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    })
  ],
  providers: [
    Title
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
