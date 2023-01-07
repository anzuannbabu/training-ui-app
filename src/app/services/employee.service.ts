import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get(environment.api + '/employees');
  }

  add(body: any) {
    return this.http.post(environment.api + '/employees', body);
  }
}
