import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  hidePswd: boolean = true;
  requiresLogin: boolean = true ; // shown by default
  requiresRegister: boolean = false ; // shown by default

  constructor() {  }

  ngOnInit(): void {
  }
  hide() {
    this.requiresLogin = false;
  }
  register() {
    this.requiresRegister = true;
    this.requiresLogin = false;
  }
  login() {
    this.requiresLogin = true;
    this.requiresRegister = false;
  }

  email = new FormControl('', [Validators.required, Validators.email]);

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }
}
