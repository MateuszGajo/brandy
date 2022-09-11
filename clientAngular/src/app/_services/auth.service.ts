import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthResp, Creds, SignUpFormData, User } from '../_models/auth';
import { BehaviorSubject, catchError, EMPTY, map, ReplaySubject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private currentUserSource = new ReplaySubject<User | null>(1);
  currentUser$ = this.currentUserSource.asObservable();

  constructor(private http: HttpClient, private router: Router) {}

  login(model: Creds) {
    return this.http
      .post<AuthResp>('auth/signin', model, { withCredentials: true })
      .pipe(
        map((response) => {
          const user = response.user;
          if (user) this.currentUserSource.next(user);
        })
      );
  }

  register(model: SignUpFormData) {
    return this.http
      .post<AuthResp>('auth/signup', model, { withCredentials: true })
      .pipe(
        map((response) => {
          const user = response.user;
          if (user) this.currentUserSource.next(user);
        })
      );
  }

  verify() {
    return this.http
      .get<AuthResp>('auth/verify', { withCredentials: true })
      .pipe(
        map((response) => {
          const user = response.user;
          if (user) this.currentUserSource.next(user);
        }),
        catchError((err) => {
          this.currentUserSource.next(null);
          return EMPTY;
        })
      );
  }

  logout() {
    return this.http.get('auth/logout').subscribe({
      next: () => this.router.navigateByUrl('/'),
      error: () => this.router.navigateByUrl('/'),
    });
  }
}
