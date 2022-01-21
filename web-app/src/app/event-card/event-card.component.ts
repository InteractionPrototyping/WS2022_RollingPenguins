import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IEvent } from '../common/IEvent';
import { AuthenticationService } from '../services/authentication.service';
import { first } from 'rxjs/operators';




@Component({
	selector: 'app-event-card',
	templateUrl: './event-card.component.html',
	styleUrls: ['./event-card.component.scss']
})
export class EventCardComponent implements OnInit {
	// Each event card represents one event
	// @Input is neccessary, because the event-card-component receives the corresponding event from other components to know which information must be displayed
	@Input() event!: IEvent; // Explicit type assignment with the IEvent interface. Thus, in the HTML template the IEvent variables can be accessed and displayed.
	isSaved = false; // If event is saved to the list, a small icon should be displayed to let the users know that they already plan on attending the event
	
	gitRepo = "https://interactionprototyping.github.io/WS2022_RollingPenguins/"; // Workaround. One could change the base for the route in index.html, but that had some unwanted changes.
	shareData = { // The user can share events with friends via the standard system dialog provided by some browsers. For compatibility questions, refer to https://developer.mozilla.org/en-US/docs/Web/API/Navigator/share
		title: "",
		text: "",
		url: "" // later uses "gitRepo" as base for the shared link
	}

	constructor(
		private router: Router,
		private authenticationService: AuthenticationService
	) {

	}

	ngOnInit(): void {
		// Must be defined in ngOnInit or constructor as the data (=event) is only available after receiving the corresponding event from another component
		this.shareData = {
			title: this.event.name,
			text: `I found ${this.event.name} on EventFinder. I think you might like it, too!`,
			url: this.gitRepo + `explore/event-detail-page/${this.event.id}`,
		}

		// Accesses the user from the mongo-db database to define if "isSaved" must be ture | false
		const currUserId = this.authenticationService.currentUserValue.user._id;
		this.authenticationService
			.getUserById(currUserId)
			.pipe(first())
			.subscribe(
				(data) => {
					if (data.myEvents.includes("" + this.event.id)) {
						this.isSaved = true;
					} else {
						this.isSaved = false;
					}
				},
				(error) => {
				}
			);
	}

	// Open the system dialog for sharing the event
	share() {
		navigator.share(this.shareData);
	}
}
