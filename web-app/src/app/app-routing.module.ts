import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DiscoverComponent } from './discover/discover.component';
import { EventsComponent } from './events/events.component';
import { ExploreComponent } from './explore/explore.component';
import { MapComponent } from './map/map.component';
import { PersonalComponent } from './personal/personal.component';

const routes: Routes = [
  { path: 'explore', component: ExploreComponent },
  { path: 'discover', component: DiscoverComponent },
  { path: 'map', component: MapComponent },
  { path: 'events', component: EventsComponent },
  { path: 'profile', component: PersonalComponent },
  { path: '**', redirectTo: 'explore' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

