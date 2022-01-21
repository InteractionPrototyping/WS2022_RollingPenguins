import { Component, Input, OnInit } from '@angular/core';
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

	/* 
	* get id from URL to display the data from the selected event 
	* load all available events from the local storage (not yet transfered to the server)
	* the constructor defines the event for event-detail-page by the URL-id and the locally storred events
	*/
	id: number; // URL id
	EventList: IEvent[] = EventsJson; // load all available events from the local storrage to the component
	event!: IEvent; // event representing the detail page

	constructor(
		private route: ActivatedRoute,
		private authenticationService: AuthenticationService,
		public dialog: MatDialog,
		private router: Router
	) {
		this.id = this.route.snapshot.params.id; // get id from URL
		this.event = this.EventList.filter(event => event.id == this.id)[0]; // set event via URL-id and locally storred events
	}

	

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

	// Workaround. One could change the base for the route in index.html, but that had some unwanted changes.
	gitRepo = "https://interactionprototyping.github.io/WS2022_RollingPenguins/"; 
	shareData = { // The user can share events with friends via the standard system dialog provided by some browsers. For compatibility questions, refer to https://developer.mozilla.org/en-US/docs/Web/API/Navigator/share
		title: "",
		text: "",
		url: "" // later uses "gitRepo" as base for the shared link
	}

	
	toggle!: string; // represents the button on the html-page for saving or removing an event from the saved events on the server
	eventState!: string; // sets the color "primary" for saving an event and no color for removing an event from the saved events list
	ngOnInit(): void {
		// Show back button to return to the previous page in the web page history
		document.getElementById('subpage')?.classList.remove('subpage');

		// If event is already saved in the user profile, the button shows remove, otherwise the button shows add
		const currUserId = this.authenticationService.currentUserValue.user._id;
		this.authenticationService
			.getUserById(currUserId)
			.pipe(first())
			.subscribe(
				(data) => {
					if (data.myEvents.includes(this.id + '')) {
						this.toggle = 'SAVE'; //
						this.eventState = "primary";
					} else {
						this.toggle = 'REMOVE';
						this.eventState = "";
					}
				},
				(error) => {
				}
			);
				

		// Show location of event on map for the google maps navigation
		this.center = this.event.position;
		this.marker = {
			position: this.center,
			icon: {
				url: "./assets/events/event_icons/" + this.event.category + ".png",
				anchor: new google.maps.Point(0, 0),
				scaledSize: new google.maps.Size(30, 30),
			}
		};

		// Must be defined in ngOnInit or constructor as the data (=event) is only available after receiving the corresponding event from another component
		this.shareData = {
			title: this.event.name,
			text: `I found ${this.event.name} on EventFinder. I think you might like it, too!`,
			url: this.gitRepo + `explore/event-detail-page/${this.event.id}`,
		}
	}

	// Open the system dialog for sharing the event
	share() {
		navigator.share(this.shareData);
	}

	// Is called when an event is added or removed from the saved events list
	toggleFavorite(event: IEvent) {
		this.authenticationService
			.saveEvent(event.id) // on the server the event will either be saved if not in the user list, or removed if already there
			.pipe(first())
			.subscribe(
				(data) => {
					if (data.myEvents.includes(event.id + '')) {
						this.toggle = 'SAVE';
						this.eventState = "primary";
						GlobalConstants.savedEventsCounter--;
					} else {
						this.toggle = 'REMOVE';
						this.eventState = "";
						GlobalConstants.savedEventsCounter++;
					}
				},
				(error) => {
				}
			);

	}
	openDialog() {
		// Lazy implementation for setting the GoogleMaps-Navigation link in the event detail page component and sharing it with the "Angular Dialog"
		GlobalConstants.navigationLink = `https://maps.google.com/?q=${this.event.position.lat},${this.event.position.lng}`;

		// Open the dialog window that asks the users if they really want to leave the app
		const dialogRef = this.dialog.open(NavDialogComponent);
	}

}