import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

import { User } from '../models/user.model';
import { map } from "rxjs/operators";
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

const API_URL = `${environment.BASE_URL}/api/authentication/`

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  public currentUser: Observable<User>;
  private currentUserSubject: BehaviorSubject<User>;

  constructor(private http: HttpClient) {
    let storageUser;
    const storageUserAsStr = localStorage.getItem('currentUser');
    if (storageUserAsStr) {
      storageUser = JSON.parse(storageUserAsStr);
    }
    this.currentUserSubject = new BehaviorSubject<User>(storageUser);
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  login(user: User): Observable<any> {
    return this.http.post<User>(API_URL + 'sign-in', user).pipe(
      map(response => {
        if (response) {
          localStorage.setItem('currentUser', JSON.stringify(response));
          this.currentUserSubject.next(response);
        }
        return response;
      })
    );
  }

  register(user: User): Observable<any> {
    return this.http.post(API_URL + 'sign-up', user);
  }

  logOut() {
    this.http.get(API_URL + 'sign-out').subscribe({
      next: (data: any) => {
        console.log(data)
      }
    });
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(new User);
  }
}
