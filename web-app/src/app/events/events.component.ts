import { Component, OnInit } from '@angular/core';
import EventsJson from '../../assets/events/events.json';

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
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit {
  EventList: EVENT[] = EventsJson;
  FavList: EVENT[] = EventsJson;
  constructor() { }

  ngOnInit(): void {
    this.FavList = this.EventList.filter(event => event.saved);
  }

}
