import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { first } from 'rxjs/operators';
import EventsJson from '../../assets/events/events.json';
import { GlobalConstants } from '../common/global-constants';
import { IEvent } from '../common/IEvent';
import { User } from '../common/User';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-event-detail-page',
  templateUrl: './event-detail-page.component.html',
  styleUrls: ['./event-detail-page.component.scss'],
})
export class EventDetailPageComponent implements OnInit {
  id = 0;
  EventList: IEvent[] = EventsJson;
  event = this.EventList[0];
  toggle!: string;
  showShare = false;
  shareUsers: User[] = [];

  constructor(
    private route: ActivatedRoute,
    private authenticationService: AuthenticationService
  ) {
    this.id = this.route.snapshot.params.id;
  }

  ngOnInit(): void {
    document.getElementById('subpage')?.classList.remove('subpage');

    this.EventList.forEach((element) => {
      if (this.id == element.id) {
        this.event = element;

        const currUserId = this.authenticationService.currentUserValue.user._id;
        this.authenticationService
          .getUserById(currUserId)
          .pipe(first())
          .subscribe(
            (data) => {
              if(data.myEvents.includes(this.id)) {
                this.toggle = 'REMOVE'
              } else {
                this.toggle = 'SAVE'
              }
            },
            (error) => {
            }
          );
      }
    });
  }

  handleShare() {
    this.authenticationService.getAllUsers()
      .pipe(first())
      .subscribe((data) => {
        this.shareUsers = data
        this.showShare = true
      })
  }

  handleShareUser(event: any, user: any) {
    this.authenticationService.recommendEvent(event.id, user._id)
      .pipe(first())
      .subscribe(
        (data) => {
        }
      )
  }


  toggleFavorite(event: IEvent) {
    this.authenticationService
      .saveEvent(event.id)
      .pipe(first())
      .subscribe(
        (data) => {
          if(data.myEvents.includes(event.id+'')) {
            this.toggle = 'SAVE'
          } else {
            this.toggle = 'REMOVE'
          }
        },
        (error) => {
          //this.error = error;
          //this.loading = false;
        }
      );
    /*event.saved = !event.saved;
    if (event.saved) {
      this.toggle = 'REMOVE';
      GlobalConstants.savedEventsCounter++;
      GlobalConstants.visibilitySavedEventsCounter = false;
    } else {
      this.toggle = 'SAVE';
      GlobalConstants.savedEventsCounter--;
      if (GlobalConstants.savedEventsCounter == 0) {
        GlobalConstants.visibilitySavedEventsCounter = true;
      }
    }*/
  }
}