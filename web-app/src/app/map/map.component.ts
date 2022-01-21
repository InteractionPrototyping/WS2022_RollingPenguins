import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Input } from '@angular/core';
import { Title } from '@angular/platform-browser';
import EventsJson from '../../assets/events/events.json';
import { IEvent } from '../common/IEvent';

// Import the modules required for the timepicker
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';

// Depending on whether rollup is used, moment needs to be imported differently.
// Since Moment.js doesn't have a default export, we normally need to import using the `* as`
// syntax. However, rollup creates a synthetic default module and we thus need to import it using
// the `default as` syntax.
import * as _moment from 'moment';
// tslint:disable-next-line:no-duplicate-imports
import { default as _rollupMoment } from 'moment';

const moment = _rollupMoment || _moment;

// See the Moment.js docs for the meaning of these formats:
// https://momentjs.com/docs/#/displaying/format/
export const MY_FORMATS = {
	parse: {
		dateInput: 'LL',
	},
	display: {
		dateInput: 'LL',
		monthYearLabel: 'MMM YYYY',
		dateA11yLabel: 'LL',
		monthYearA11yLabel: 'MMMM YYYY',
	},
};


interface IEventMarker {
	position: {
		lat: number;
		lng: number;
	},
	icon: {
		url: string,
		anchor: google.maps.Point,
		scaledSize: google.maps.Size,
	},
	assignedEvent: IEvent
}



@Component({
	selector: 'app-map',
	templateUrl: './map.component.html',
	styleUrls: ['./map.component.scss'],
	providers: [
		// `MomentDateAdapter` can be automatically provided by importing `MomentDateModule` in your
		// application's root module. We provide it at the component level here, due to limitations of
		// our example generation script.
		{
			provide: DateAdapter,
			useClass: MomentDateAdapter,
			deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
		},

		{ provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
	],
})



export class MapComponent {

	EventList: IEvent[] = EventsJson; // Load all available events from the local storrage to the component
	EventMarker: IEventMarker[] = Array(0); // Initializes an empty array, so push and pull can used to add or remove markers to the event marker list
	selected_event = this.EventList[0]; // Represents the event-card that is opened when the user selects an event from the map; setting one event initially somehow makes the experience smoother

	// Define user's location. Fake it till you make it.
	center: google.maps.LatLngLiteral = {
		lat: 48.137154,
		lng: 11.576124,
	};

	// Show user's location on map. Fake it till you make it.
	locationMarker = {
		position: this.center,
		icon: {
			url: "./assets/img/current_location.png",
			anchor: new google.maps.Point(0, 0),
			scaledSize: new google.maps.Size(30, 30),
		},
	};
	// Settigs for the embedded google maps
	options: google.maps.MapOptions = {
		zoomControl: false,
		scrollwheel: true,
		disableDoubleClickZoom: false,
		gestureHandling: "greedy", // important to prevent unwanted zooming of web page or scroll events
		zoom: 14,
		maxZoom: 50,
		minZoom: 4,
		mapId: "ee691f8617d29770",
		disableDefaultUI: true,
	} as google.maps.MapOptions;

	
	constructor(private titleService: Title) {
		// load event markers to the map and assign an event to each marker
		this.EventList.forEach(event => {
			var temp = {
				position: {
					lat: event.position.lat,
					lng: event.position.lng
				},
				icon: {
					url: "./assets/events/event_icons/" + event.category + ".png",
					anchor: new google.maps.Point(0, 0),
					scaledSize: new google.maps.Size(30, 30),
				},
				assignedEvent: event
			};
			this.EventMarker.push(temp)
		});

		this.titleService.setTitle("Map");
	}

	// Drag function
	yDragValue = 0;
	isDragging = false;
	draggable_card: any;
	arrow: any;
	lastY: any;
	isTop: boolean = false;

	// wait for the HTML to finish loading before assigning DOM objects to variables
	ngAfterViewChecked(): void {
		this.draggable_card = document.getElementById("draggable-card");
		this.arrow = document.getElementById("arrow");
	}

	////// Event Card Functionality //////
	showMapCard(event: IEvent): void {
		this.selected_event = event;
		this.draggable_card!.style.transform = `translateY(${-0.2 * window.innerHeight}px)`;
		this.arrow.classList.add("open");
	}
	hideMapCard() {
		this.draggable_card!.style.transform = `translateY(${30}%)`;
	}

	// Dragging for touch devices
	startDraggingHandler(drag_event: any) {
		this.isDragging = true;
	}
	draggingHandler(drag_event: any) {
		if (!this.isDragging) return;
		const { clientY } = drag_event.touches[0];
		this.yDragValue = clientY - 0.8 * window.innerHeight;
		var currentY = drag_event.touches ? drag_event.touches[0].clientY : drag_event.clientY;

		if (currentY < this.lastY) {
			if (this.yDragValue < -0.4 * window.innerHeight) {
				this.yDragValue = this.setMaxHeight();
				this.isTop = true;
				this.arrow.classList.remove("open");
			} else {
				this.isTop = false;
			}
		}
		this.lastY = currentY;

		if (this.yDragValue > -0.1 * window.innerHeight) {
			this.draggable_card!.style.transform = `translateY(${this.yDragValue + 0.3 * window.innerHeight}px)`;
			return;
		}
		this.draggable_card!.style.transform = `translateY(${this.yDragValue}px)`;
	}
	stopDraggingHandler(drag_event: any) {
		if (!this.isDragging) return;
		this.isDragging = false;
	}

	// Clicking for touch and desktop devices
	toggleView() {
		if (!this.isTop) {
			this.draggable_card!.style.transform = `translateY(${this.setMaxHeight()}px)`;
			this.isTop = true;
			this.arrow.classList.remove("open");
		} else {
			this.draggable_card!.style.transform = `translateY(${-0.2 * window.innerHeight}px)`;
			this.isTop = false;
			this.arrow.classList.add("open");
		}
	}

	// Set highest position of card depending on size of the card and screen height
	setMaxHeight(): number {
		if (window.innerHeight - 64 - 80 - 16 - 24 < this.draggable_card!.clientHeight) {
			return (-0.8 * window.innerHeight + 72);
		} else {

			return (0.2 * window.innerHeight - 88 - 16 - this.draggable_card!.clientHeight);
		}
	}
	////// End of Event Card Functionality //////


	////// Filter Functionality //////
	@ViewChild('dateElem') dateElem!: ElementRef; // The input of the datepicker cannot be accessed simply by "value", so the ElementReference is used instead
	showAdditionalFilters = false; // date filter is hidden by default
	search: any = { // use multiple filter pipes for the *ngFor list
		text: "", // for the standard search bar
		date: "" // for the date picker. Problem: The simple filters applied here only work with strings. Thus, the input of the datepicker (= dateElem) must be converted to string first
	};
	emptyVal: any; // represents also the input of the datefilter. The input provided over ngModel does not work for the filter, however, it can be used to remove the values given by the user.
	filterIcon = "filter_list"; // initial icon for the additional filters; changes to a crossed filter icon when the user opens the additonal filters (for now only the date picker)
	searchIcon = "search"; // changes to a crossmark for clearing the input field
	ngDoCheck(): void {
		if (this.dateElem && this.dateElem.nativeElement.value !== "") {
			this.search.date = this.dateElem.nativeElement.value;
		} else {
			this.search.date = "";
		}

		if (this.search.text !== "") {
			this.searchIcon = "clear";
		} else {
			this.searchIcon = "search";
		}
	}
	
	// clears the input of the standard search bar
	emptySearch() {
		this.search.text = ""; 
	}

	// shows or hides the date filter and clears the value after toggeling the filter
	toggleFilter() {
		this.showAdditionalFilters = !this.showAdditionalFilters;
		this.emptyVal = "";
		if (this.filterIcon === "filter_list") {
			this.filterIcon = "filter_list_off";
		} else {
			this.filterIcon = "filter_list";
		}
	}
	////// End of Filter Functionality //////
}

