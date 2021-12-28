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
    long: number;
  }
}


@Component({
  selector: 'app-event-card',
  templateUrl: './event-card.component.html',
  styleUrls: ['./event-card.component.scss']
})
export class EventCardComponent implements OnInit {
  //Employees: EMPLOYEE[] = EmployeesJson;
  EventList: EVENT[] = EventsJson;

  //JSON.parse(EventsJson);
  constructor() { 
    
  }

  ngOnInit(): void {
  }

  share() {
    
  }

  addToEventList() {

  }
}
