import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { Title } from '@angular/platform-browser';
import { AuthenticationService } from '../services/authentication.service';


@Component({
	selector: 'app-register',
	templateUrl: './register.component.html',
	styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

	// Hides or shows the password typed in by the user
	hidePswd: boolean = true;
	hide: boolean = true;

	loginForm!: FormGroup; // Retrieves all the data provided by the user in the login form group
	returnUrl!: string; // Get return url from route parameters or default to '/'

	constructor(
		private formBuilder: FormBuilder,
		private route: ActivatedRoute,
		private router: Router,
		private authenticationService: AuthenticationService,
		private titleService: Title
	) {
		this.titleService.setTitle("EventFinder");
	}


	ngOnInit() {
		this.loginForm = this.formBuilder.group({
			username: ['', Validators.required],
			email: ['', Validators.required],
			password: ['', Validators.required],
			enableLocationService: '',
		});

		// reset login status
		this.authenticationService.logout();

		// get return url from route parameters or default to '/'
		// if users receive a suggestions for an event from other users they get redirected to that page after logging in
		this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
	}

	// convenience: getter for easy access to form fields
	get f() { return this.loginForm.controls; }

	onSubmit() {

		// stop here if form is invalid
		if (this.loginForm.invalid) {
			return;
		}

		this.authenticationService.register(this.f.username.value, this.f.email.value, this.f.password.value, false)
			.pipe(first())
			.subscribe(
				data => {
					this.router.navigate([this.returnUrl]);
				},
				error => {
				});
		// directly calls the login function after register, so the user does not have login manually (only works sometimes?)
		this.login(this.f.email.value, this.f.password.value);
	}

	// same function as in the login component
	login(email: any, password: any) {
		this.authenticationService.login(email, password)
			.pipe(first())
			.subscribe(
				data => {
					this.router.navigate([this.returnUrl]);
				},
				error => {
				});
	}


	ngAfterViewInit(): void {
		this.titleService.setTitle("EventFinder");
	}



	// checks if given email and username format is correct
	email = new FormControl('', [Validators.required, Validators.email]);
	username = new FormControl('', [Validators.required]);

	// if format is not correct or no value has been entered: display error message
	getErrorMessage() {
		if (this.email.hasError('required')) {
			return 'You must enter a value';
		}

		return this.email.hasError('email') ? 'Not a valid email' : '';
	}
}
