import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { AuthenticationService } from '../services/authentication.service';

@Component({
	selector: 'app-personal',
	templateUrl: './personal.component.html',
	styleUrls: ['./personal.component.scss']
})
export class PersonalComponent implements OnInit {

	username = ""; // Represents the displayed username on the profile page of the app
	email = ""; // Represents the displayed email on the profile page of the app

	constructor(
		private titleService: Title,
		private authenticationService: AuthenticationService
	) {
		this.titleService.setTitle("Profile");
	}

	ngOnInit(): void {
		const currUserId = this.authenticationService.currentUserValue.user._id;
		this.authenticationService.getUserById(currUserId).subscribe(
			(data: any) => {
				// Sets the username and email of the currently logged-in user if the connection to the server is possible
				this.username = data.username;
				this.email = data.email;
			},
			(error: any) => { }
		);
	}

}
