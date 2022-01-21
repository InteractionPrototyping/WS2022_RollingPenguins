import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import EventsJson from '../../assets/events/events.json';
import { IEvent } from '../common/IEvent';
import { AuthenticationService } from '../services/authentication.service';
import { Title } from '@angular/platform-browser';
import { GlobalConstants } from '../common/global-constants';
import moment from 'moment';

@Component({
	selector: 'app-events',
	templateUrl: './events.component.html',
	styleUrls: ['./events.component.scss'],
})
export class EventsComponent implements OnInit {
	EventList: IEvent[] = EventsJson; // Load all available events from the local storrage to the component
	FavList: IEvent[] = Array(0); // Initializes an empty array, so push and pull can used to add or remove events to the favorites list
	showEmptyCard!: boolean; // If no events are in the favorites list, the empty screen placeholder is displayed instead


	/* 
	* sort by date using "moment" to interpret the given string format
	* an easier implementation would have been to give the standard date format in the events list instead, but there we go
	*/ 
	get sortedFavorites() {
		return this.FavList.sort((a, b) => {
			return <any>moment(a.date, "MMMM Do, YYYY") - <any>moment(b.date, "MMMM Do, YYYY")
		});
	}

	constructor(
		private titleService: Title,
		private authenticationService: AuthenticationService
	) {
		this.titleService.setTitle("My Events");
	}

	ngOnInit(): void {
		const currUserId = this.authenticationService.currentUserValue.user._id;

		this.authenticationService.getUserById(currUserId).subscribe(
			(data: any) => {
				data.myEvents.forEach((eventId: number) => {
					this.FavList.push(this.EventList[eventId-1]);
				});
			},
			(error: any) => { }
		);

	}

	/* 
	* Easy workaround to define if the empty screen placeholder should be displayed
	* One could ask the server but then there is always a delay, so using the already defined local value makes more sens
	*/
	ngDoCheck(): void {
		this.showEmptyCard = GlobalConstants.visibilitySavedEventsCounter;
	}

}