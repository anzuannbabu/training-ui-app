import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  constructor(private http: HttpClient) {}

  getAll() {
    // const token =JSON.parse(sessionStorage.getItem('user-token')||'{}');
    // const headers = new HttpHeaders().append('Authorization', token['token'])
    return this.http.get(environment.api + '/employees');
  }

  add(body: any) {

    return this.http.post(environment.api + '/employees', body);
  }
}
