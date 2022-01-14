import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { User } from '../common/User';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  //private server: string = 'https://ux-curve-backend.herokuapp.com/';
  private server: string = 'http://localhost:4500/';

  private userLocalStorageKey: string = 'currentUser';

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem(this.userLocalStorageKey)!));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  public login(email: string, password: string) {
    return this.http.post<any>(this.server + 'users/login', { email, password })
      .pipe(map(user => {
        console.log(user);
        // login successful if there's a jwt token in the response
        if (user && user.token) {
          localStorage.setItem(this.userLocalStorageKey, JSON.stringify(user));
          this.currentUserSubject.next(user);
        }

        return user;
      }));
  }

  public logout() {
    localStorage.removeItem(this.userLocalStorageKey);
    // this.currentUserSubject.next(null);
  }

  public saveEvent(eventId: number) {
    
    const userId = this.currentUserValue.user._id;
    
    
    return this.http.post<any>('http://localhost:4500/users/saveEvent', { userId: '61e14a1cc0a0cc26f96edf5c', eventId: 2 })
      .pipe(map(user => {
        console.log(user);
        // login successful if there's a jwt token in the response

        return user;
      }));
  }
}