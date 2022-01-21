import { Component, OnInit, DoCheck } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { GlobalConstants } from '../common/global-constants';
import { AuthenticationService } from '../services/authentication.service';
import { Location } from '@angular/common'


@Component({
	selector: 'app-navigation',
	templateUrl: './navigation.component.html',
	styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent implements OnInit {

	constructor(
		private titleService: Title,
		private authenticationService: AuthenticationService,
		private location: Location
	) { }

	// Navigation component is one of the first components loaded when opening the app and logging in. 
	// Thus, here the savedEventsCounter are aligned with the number of saved event from the user profile on the server
	ngOnInit(): void {
		const currUserId = this.authenticationService.currentUserValue.user._id;
		this.authenticationService.getUserById(currUserId).subscribe(
			(data: any) => {
				GlobalConstants.savedEventsCounter = data.myEvents.length;
			},
			(error: any) => { }
		);
	}

	// Saves the current title of the web application. Should be changed depending on the current module.
	current_title!: string;

	// Represents the back button. Only visible on the event detail page.
	subpage = false;

    /* 
	* Represents the badge on the "My Events" tab and shows the amount of saved events if any
	* Will be synchronized with the global constants, as easy/lazy implementation for adding/removing events and adapting the interface for the user.
	*/ 
	visibilitySavedEventsCounter!: boolean;
	savedEventsCounter!: number;


	

	// Function is called when clicking on one of the main components from the nav bar
	changeRoute(route: string) {
		this.subpage = false; // as it is a main component, no back button is needed
		this.current_title = this.titleService.getTitle(); // change current html title
		this.setNavBarIcons();
	}

	/* 
	* Changes the style of the nav bar icons for a more individual look and feel
	* selected state uses filled icons, unselected state uses outlined icons in the nav bar
	*/
	setNavBarIcons() {
		document.getElementById('Explore')?.children[0].children[0].classList.remove('active-mat-icon');
		document.getElementById('Explore')?.children[0].children[0].classList.add('material-icons-outlined');

		document.getElementById('Map')?.children[0].children[0].classList.remove('active-mat-icon');
		document.getElementById('Map')?.children[0].children[0].classList.add('material-icons-outlined');

		document.getElementById('MyEvents')?.children[0].children[0].classList.remove('active-mat-icon');
		document.getElementById('MyEvents')?.children[0].children[0].classList.add('material-icons-outlined');

		document.getElementById('Profile')?.children[0].children[0].classList.remove('active-mat-icon');
		document.getElementById('Profile')?.children[0].children[0].classList.add('material-icons-outlined');
		document.getElementById(this.titleService.getTitle().replace(/\s/g, ""))?.children[0].children[0].classList.remove('material-icons-outlined');
		document.getElementById(this.titleService.getTitle().replace(/\s/g, ""))?.children[0].children[0].classList.add('active-mat-icon');
	}

	// Is called when the user clicks on the back button on the event detail page. 
	goBackInBrowserHistory() {
		this.location.back(); // Goes to the last page of the browser history of the corresponding page.
		this.subpage = false; // As currently the user never comes from another detail page, but the map and explore component, no back button is needed
	}

	ngDoCheck(): void {
		// Not the best implementation to ensure the right nav icon and web page title is shown, but fine for now
		this.current_title = this.titleService.getTitle();
		this.setNavBarIcons(); 

		// Synchronized with the global constants and update if the badge for the number of saved events should be visible or not
		this.savedEventsCounter = GlobalConstants.savedEventsCounter;
		if (GlobalConstants.savedEventsCounter <= 0) {
			GlobalConstants.visibilitySavedEventsCounter = true;
		} else {
			GlobalConstants.visibilitySavedEventsCounter = false;
		}
		this.visibilitySavedEventsCounter = GlobalConstants.visibilitySavedEventsCounter;
	}
}
