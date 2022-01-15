import { Component, OnInit } from '@angular/core';
import { EventCardComponent } from '../event-card/event-card.component';
import { Title } from '@angular/platform-browser';
import {FormGroup, FormControl} from '@angular/forms';
import EventsJson from '../../assets/events/events.json';
import { IEvent } from '../common/IEvent';

@Component({
  selector: 'app-explore',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.scss']
})
export class ExploreComponent implements OnInit {
  EventList: IEvent[] = EventsJson;
  searchText: any;

  // public picker?: NgxMaterialTimepickerModule<Date>;
  constructor(private titleService: Title) { 
    this.titleService.setTitle("Explore");
  }

  ngOnInit(): void {
  }

  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl(),
  });

}
