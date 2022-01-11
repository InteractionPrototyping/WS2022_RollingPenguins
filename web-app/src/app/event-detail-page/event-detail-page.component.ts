import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import EventsJson from '../../assets/events/events.json';
import{ GlobalConstants } from '../common/global-constants';



interface EVENT {
  id: number;
  name: string;
  saved: boolean;
  description: string;
  date: string;
  picture: string;
  position: {
    lat: number;
    lng: number;
  }
}

@Component({
  selector: 'app-event-detail-page',
  templateUrl: './event-detail-page.component.html',
  styleUrls: ['./event-detail-page.component.scss']
})
export class EventDetailPageComponent implements OnInit {
  id = 0;
  EventList: EVENT[] = EventsJson;
  event = this.EventList[0];
  toggle!: string;

  constructor(private route: ActivatedRoute,) { 
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
  toggleFavorite(event: EVENT) {
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

  highlight(id: number) {
    var element = document.getElementById(id.toString());
    if(element!.classList.contains("opacityClicked")) {
      element!.classList.remove("opacityClicked");
      element!.classList.add("opacityDefault");
    } else {
      element!.classList.remove("opacityDefault");
      element!.classList.add("opacityClicked");
    }
  }

}

