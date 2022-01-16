import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { first } from 'rxjs/operators';
import EventsJson from '../../assets/events/events.json';
import { GlobalConstants } from '../common/global-constants';
import { IEvent } from '../common/IEvent';
import { User } from '../common/User';
import { AuthenticationService } from '../services/authentication.service';
import { MatDialog } from '@angular/material/dialog';
import { NavDialogComponent } from './nav-dialog/nav-dialog.component';

@Component({
  selector: 'app-event-detail-page',
  templateUrl: './event-detail-page.component.html',
  styleUrls: ['./event-detail-page.component.scss'],
})
export class EventDetailPageComponent implements OnInit {
  id: number;
  EventList: IEvent[] = EventsJson;
  event = this.EventList[0];
  toggle!: string;
  showShare = false;
  shareUsers: User[] = [];

  // Google Maps
  marker: any;
  center: any;
  options: google.maps.MapOptions = {
    gestureHandling: "none",
    zoomControl: false,
    disableDoubleClickZoom: false,
    zoom: 16,
    mapId: "ee691f8617d29770",
    disableDefaultUI: true,
  } as google.maps.MapOptions;

  constructor(
    private route: ActivatedRoute,
    private authenticationService: AuthenticationService,
    public dialog: MatDialog
  ) {
    this.id = this.route.snapshot.params.id;
  }

  ngOnInit(): void {
    scrollTo(0, 0);
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
                this.toggle = 'REMOVE';
              } else {
                this.toggle = 'SAVE'
              }
            },
            (error) => {
            }
          );
      }
    });
    this.center = this.event.position;
    this.marker = {
      position: this.center,
      icon: {
        url: "./assets/events/event_icons/" + this.event.category + ".png",
        anchor: new google.maps.Point(0, 0),
        scaledSize: new google.maps.Size(30, 30),
      }
    };
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
            this.toggle = 'SAVE';
            GlobalConstants.savedEventsCounter--;
          } else {
            this.toggle = 'REMOVE';
            GlobalConstants.savedEventsCounter++;
          }
        },
        (error) => {
          //this.error = error;
          //this.loading = false;
        }
      );

  }
  openDialog() {
    GlobalConstants.navigationLink = `https://maps.google.com/?q=${this.event.position.lat},${this.event.position.lng}`;
    const dialogRef = this.dialog.open(NavDialogComponent);
  }
  
}