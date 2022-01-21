import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { EventCardComponent } from '../event-card/event-card.component';
import { Title } from '@angular/platform-browser';
import { FormGroup, FormControl } from '@angular/forms';
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

@Component({
	selector: 'app-explore',
	templateUrl: './explore.component.html',
	styleUrls: ['./explore.component.scss'],
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
export class ExploreComponent {
	constructor(private titleService: Title) {
		this.titleService.setTitle("Explore");
	}


	EventList: IEvent[] = EventsJson; // load all available events from the local storrage to the component
	cloneEvents = Array.from(this.EventList); // Quick and dirty: Angular keeps "EventList" saved in the local storage. The sorting algorithm leads to problems with the "My Events" area. Thus, we work on a copy of the array.

	/* 
	* sort by date using "moment" to interpret the given string format
	* an easier implementation would have been to give the standard date format in the events list instead, but there we go
	*/ 
	get sortedEvents() {
		return this.cloneEvents.sort((a, b) => {
			return <any>moment(a.date, "MMMM Do, YYYY") - <any>moment(b.date, "MMMM Do, YYYY")
		});
	}


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
	dateVal!: string;
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
