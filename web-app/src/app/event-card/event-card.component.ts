import { Component, Input, OnInit } from '@angular/core';

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
  selector: 'app-event-card',
  templateUrl: './event-card.component.html',
  styleUrls: ['./event-card.component.scss']
})
export class EventCardComponent implements OnInit {
  @Input()
  event!: EVENT;


  ngOnInit(): void {
  }

  share() {
  }

  addToEventList() {
  }
}
