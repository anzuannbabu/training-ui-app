import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User } from '../model/user.model';



@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  register(request: User) {
    return this.http.post(environment.api + '/register', request);
  }

  login(request: User) {
    return this.http.post(environment.api + '/token', request);
  }
}
