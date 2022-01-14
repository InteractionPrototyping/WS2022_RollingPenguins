import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import EventsJson from '../../assets/events/events.json';
import { IEvent } from '../common/IEvent';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss'],
})
export class EventsComponent implements OnInit {
  EventList: IEvent[] = EventsJson;
  FavList: IEvent[] = EventsJson;
  recommendations!: any[];

  constructor(private authenticationService: AuthenticationService) {}

  ngOnInit(): void {
    this.FavList = this.EventList.filter((event) => event.saved);
    const currUserId = this.authenticationService.currentUserValue.user._id;
    this.authenticationService.getUserById(currUserId).subscribe(
      (data) => {
        console.log(data);
        this.recommendations = data.suggestedEvents;
        this.recommendations.forEach((rec) => {
          this.authenticationService.getUserById(rec.suggester).subscribe((data) => {
            // Data hier ist der User, der das event empfohlen hat. In dem Fall hab ich einfach nur den username ausgelesen und dann mit in das objekt gepackt
            rec.username = data.username
          });
        });
      },
      (error) => {}
    );
  }

  getUsernameById(userId: string) {
    this.authenticationService.getUserById(userId).subscribe((data) => {
      console.log(data);
      return 'a';
    });
  }
}
