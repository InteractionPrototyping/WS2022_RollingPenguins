import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { User } from '../common/User';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  [x: string]: any;
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  //private server: string = 'https://ux-curve-backend.herokuapp.com/';
  private server: string = 'https://eventfinderapp.herokuapp.com/';

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

  public register(username: string, email: string, password: string, useLocation: boolean) {
    alert(this.server + 'users/register' + username + email + password + useLocation);
    return this.http.post<any>(this.server + 'users/register', { username, email, password, useLocation })
      .pipe(map(user => {
        alert(user);
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

  public getUserById(userId: string) {
    return this.http.post<any>(this.server + 'users/getUserById', { userId })
    .pipe(map(user => {
      return user;
    }));
  }




  public saveEvent(eventId: number) {
    const userId = this.currentUserValue.user._id;
    return this.http.post<any>(this.server + 'users/saveEvent', { userId, eventId })
      .pipe(map(user => {
        // login successful if there's a jwt token in the response

        return user;
      }));
  }



  public getAllUsers() {
    return this.http.get<any>(this.server + 'users/getAllUsers')
    .pipe(map(user => {
      return user;
    }));
  }

  public recommendEvent(eventId: number, forUserId: string) {
    const recommenderId = this.currentUserValue.user._id;
    return this.http.post<any>(this.server + 'users/recommendEvent', {
      eventId,
      recommenderId,
      forUserId
    }).pipe(map(result => {
      return result
    }));
  }
}
