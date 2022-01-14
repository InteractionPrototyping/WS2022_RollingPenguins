import { Component, OnInit } from '@angular/core';
import EventsJson from '../../assets/events/events.json';
import { IEvent } from '../common/IEvent';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit {
  EventList: IEvent[] = EventsJson;
  FavList: IEvent[] = EventsJson;
  constructor() { }

  ngOnInit(): void {
    this.FavList = this.EventList.filter(event => event.saved);
  }

}
