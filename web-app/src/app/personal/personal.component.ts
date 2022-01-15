import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-personal',
  templateUrl: './personal.component.html',
  styleUrls: ['./personal.component.scss']
})
export class PersonalComponent implements OnInit {
  hidePswd: boolean = true;
  requiresLogin: boolean = true ; // shown by default
  requiresRegister: boolean = false ; // shown by default

  constructor(
    private titleService: Title
  ) { 
    this.titleService.setTitle("Profile");
  }

  ngOnInit(): void {
  }
  hide() {
    this.requiresLogin = false;
    document.getElementById('router-outlet')?.classList.remove('hidden');
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
