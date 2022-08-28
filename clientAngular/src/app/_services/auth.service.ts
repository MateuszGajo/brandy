import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthResp, Creds, SignUpFormData, User } from '../_models/auth';
import { BehaviorSubject, map, ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  baseUrl = 'http://localhost:5000/auth/';
  private currentUserSource = new ReplaySubject<User | null>(1);
  currentUser$ = this.currentUserSource.asObservable();

  constructor(private http: HttpClient) {}

  login(model: Creds) {
    return this.http
      .post<AuthResp>(this.baseUrl + 'signin', model, { withCredentials: true })
      .pipe(
        map((response) => {
          const user = response.user;
          if (user) this.currentUserSource.next(user);
        })
      );
  }

  register(model: SignUpFormData) {
    return this.http
      .post<AuthResp>(this.baseUrl + 'signup', model, { withCredentials: true })
      .pipe(
        map((response) => {
          const user = response.user;
          if (user) this.currentUserSource.next(user);
        })
      );
  }

  verify() {
    return this.http
      .get<AuthResp>(this.baseUrl + 'verify', { withCredentials: true })
      .pipe(
        map((response) => {
          const user = response.user;
          console.log('yuseR??');
          console.log(response.user);
          if (user) this.currentUserSource.next(user);
        })
      );
  }
}
