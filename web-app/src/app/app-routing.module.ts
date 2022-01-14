import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EventDetailPageComponent } from './event-detail-page/event-detail-page.component';
import { EventsComponent } from './events/events.component';
import { ExploreComponent } from './explore/explore.component';
import { MapComponent } from './map/map.component';
import { PersonalComponent } from './personal/personal.component';

const routes: Routes = [
  { path: 'explore', component: ExploreComponent },
  { path: 'map', component: MapComponent },
  { path: 'events', component: EventsComponent },
  { path: 'profile', component: PersonalComponent },
  { path: 'event-detail-page/:id', component: EventDetailPageComponent },
  { path: '**', redirectTo: 'explore' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

