import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class RequestBaseService {
  protected currentUser: User = new User;
  constructor(protected authenticationService: AuthenticationService, protected http: HttpClient) { 
    this.authenticationService.currentUser.subscribe({
      next: (data: User) => {
        this.currentUser = data;
      }
    })
  }

  get getHeaders(): HttpHeaders {
    return new HttpHeaders(
      {
        authorization: 'Bearer ' + this.currentUser?.token,
        "Content-Type": "application/json; charset=UTF-8",
      }
    );
  }
}
