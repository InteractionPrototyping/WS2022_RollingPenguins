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
  hidePswd: boolean = true;
  hide: boolean  = true;

  
  loginForm!: FormGroup;
  loading = false;
  submitted = false;
  returnUrl!: string;
  error = '';

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
  this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  //this.returnUrl = '/home/home';


  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  onSubmit() {
      this.submitted = true;

      // stop here if form is invalid
      if (this.loginForm.invalid) {
          return;
      }

      this.loading = true;
      this.authenticationService.register(this.f.username.value, this.f.email.value, this.f.password.value, false)
          .pipe(first())
          .subscribe(
              data => {
                  this.router.navigate([this.returnUrl]);
              },
              error => {
                  this.error = error;
                  this.loading = false;
              });
  }

  ngAfterViewInit(): void {
    this.titleService.setTitle("EventFinder");
  }
  


  // My code
  email = new FormControl('', [Validators.required, Validators.email]);
  username = new FormControl('', [Validators.required]);
  enableLocationService = new FormControl('', [Validators.required]);

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }
}
