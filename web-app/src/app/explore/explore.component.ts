import { Component, OnInit } from '@angular/core';
import { EventCardComponent } from '../event-card/event-card.component';
import {FormGroup, FormControl} from '@angular/forms';
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
  selector: 'app-explore',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.scss']
})
export class ExploreComponent implements OnInit {
  EventList: EVENT[] = EventsJson;

  // public picker?: NgxMaterialTimepickerModule<Date>;
  constructor() { }

  ngOnInit(): void {
  }

  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl(),
  });

}
