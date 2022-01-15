import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import EventsJson from '../../assets/events/events.json';
import { IEvent } from '../common/IEvent';
import { AuthenticationService } from '../services/authentication.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss'],
})
export class EventsComponent implements OnInit {
  EventList: IEvent[] = EventsJson;
  FavList: IEvent[] = Array(0);
  SuggestedList: IEvent[] = Array(0);
  recommendations!: any[];

  constructor(
    private titleService: Title,
    private authenticationService: AuthenticationService
    ) {
      this.titleService.setTitle("My Events");
    }

  ngOnInit(): void {
    // = this.EventList.filter((event) => event.saved);
    const currUserId = this.authenticationService.currentUserValue.user._id;

    this.authenticationService.getUserById(currUserId).subscribe(
      (data: any) => {
        console.log(data);

        data.myEvents.forEach((eventId: number) => {
          this.FavList.push(this.EventList[eventId-1]);
        });
        

        data.suggestedEvents.forEach((suggestion: any) => {
          this.SuggestedList.push(this.EventList[suggestion.eventId-1]);
        });

        this.recommendations = data.suggestedEvents;
        this.recommendations.forEach((rec) => {
          this.authenticationService.getUserById(rec.suggester).subscribe((data: any) => {
            // Data hier ist der User, der das event empfohlen hat. In dem Fall hab ich einfach nur den username ausgelesen und dann mit in das objekt gepackt
            rec.username = data.username
          });
        });
      },
      (error: any) => {}
    );    

  }


  getUsernameById(userId: string) {
    this.authenticationService.getUserById(userId).subscribe((data: any) => {
      console.log(data);
      return 'a';
    });
  }
}