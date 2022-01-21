import { Component, OnInit } from '@angular/core';
import { GlobalConstants } from 'src/app/common/global-constants';

@Component({
	selector: 'app-nav-dialog',
	templateUrl: './nav-dialog.component.html',
	styleUrls: ['./nav-dialog.component.scss']
})
export class NavDialogComponent implements OnInit {

	constructor() { }

	ngOnInit(): void {
	}
	// Opens the provided google maps location link on an external page on the desktop or directly with the app on the smartphone
	openNavigation() {
		window.open(GlobalConstants.navigationLink, "_blank");
	}

}
