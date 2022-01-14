import { Component, Input, OnInit } from '@angular/core';
import { IEvent } from '../common/IEvent';




@Component({
  selector: 'app-event-card',
  templateUrl: './event-card.component.html',
  styleUrls: ['./event-card.component.scss']
})
export class EventCardComponent implements OnInit {
  @Input()
  event!: IEvent;


  ngOnInit(): void {
  }

  share() {
  }

  toggleFavorite() {
  }
}
