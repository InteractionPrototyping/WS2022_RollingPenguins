import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import EventsJson from '../../assets/events/events.json';
import{ GlobalConstants } from '../common/global-constants';
import { IEvent } from '../common/IEvent';
import { AuthenticationService } from '../services/authentication.service';


@Component({
  selector: 'app-event-detail-page',
  templateUrl: './event-detail-page.component.html',
  styleUrls: ['./event-detail-page.component.scss']
})
export class EventDetailPageComponent implements OnInit {
  id = 0;
  EventList: IEvent[] = EventsJson;
  event = this.EventList[0];
  toggle!: string;

  constructor(private route: ActivatedRoute, private authenticationService: AuthenticationService) { 
    this.id = this.route.snapshot.params.id;
  }

  ngOnInit(): void {
    document.getElementById('subpage')?.classList.remove('subpage');

    this.EventList.forEach(element => {
      if (this.id == element.id) {
        this.event = element;
      
        if (this.event.saved) {
          this.toggle = "REMOVE";
        } else {
          this.toggle = "SAVE";
        }
      }
    });

    
  }
  toggleFavorite(event: IEvent) {
    this.authenticationService.saveEvent(event.id);
    event.saved = !event.saved;
    if (event.saved) {
      this.toggle = "REMOVE";
      GlobalConstants.savedEventsCounter++;
      GlobalConstants.visibilitySavedEventsCounter = false;
    } else {
      this.toggle = "SAVE";
      GlobalConstants.savedEventsCounter--;
      if  (GlobalConstants.savedEventsCounter == 0) {
        GlobalConstants.visibilitySavedEventsCounter = true;
      }
    }
  }

}
