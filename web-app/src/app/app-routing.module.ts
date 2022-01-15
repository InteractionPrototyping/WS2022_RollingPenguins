import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EventDetailPageComponent } from './event-detail-page/event-detail-page.component';
import { EventsComponent } from './events/events.component';
import { ExploreComponent } from './explore/explore.component';
import { MapComponent } from './map/map.component';
import { PersonalComponent } from './personal/personal.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './common/auth.guard';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'explore', component: ExploreComponent, canActivate:[AuthGuard] },
  { path: 'map', component: MapComponent, canActivate:[AuthGuard]  },
  { path: 'events', component: EventsComponent, canActivate:[AuthGuard]  },
  { path: 'profile', component: PersonalComponent, canActivate:[AuthGuard]  },
  { path: 'event-detail-page/:id', component: EventDetailPageComponent, canActivate:[AuthGuard]  },
  { path: '**', redirectTo: 'explore' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

