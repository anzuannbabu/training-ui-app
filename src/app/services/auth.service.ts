import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map, tap, throwError, timeout } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../model/user.model';

const USER_TOKEN_KEY = 'user-token';

export interface UserProfile {
  email: string;
  name: string;
  exp: number;
  iat: Date;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, private router: Router) {}

  register(request: User) {
    return this.http.post(environment.api + '/register', request);
  }

  login(request: User) {
    return this.http.post(environment.api + '/token', request).pipe(
      timeout(60000*5),
      tap((res: any) => {
        sessionStorage.setItem(USER_TOKEN_KEY, JSON.stringify(res));
        sessionStorage.setItem(USER_TOKEN_KEY + '_plain', res['token']);
        this.router.navigateByUrl('/app');
      }),
      // catchError(err => {
      //   console.log("error ocurred", err);
      //   return throwError(err)
      // })
      // map(res => {

      // })
    );
  }

  isLoggedIn(): boolean {
    let isAuthenticated = false;
    const token = this.getAccessToken();
    if (token) {
      isAuthenticated = true;
    }
    return isAuthenticated;
  }

  logout() {
    sessionStorage.removeItem(USER_TOKEN_KEY);
    this.router.navigateByUrl('/');
  }

  getAccessToken() {
    const token = JSON.parse(sessionStorage.getItem(USER_TOKEN_KEY) || '{}');
    return token['token'] || null;
  }

  getUserProfile(): UserProfile {
    let token: string = this.getAccessToken();

    let tokenArr = token.split('.');
    const profile = atob(tokenArr[1]);

    console.log(profile);
    return JSON.parse(profile) as any;
  }
}
