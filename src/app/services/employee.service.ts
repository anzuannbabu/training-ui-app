import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Employee } from '../model/employee.model';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<Employee[]> {
    // const token =JSON.parse(sessionStorage.getItem('user-token')||'{}');
    // const headers = new HttpHeaders().append('Authorization', token['token'])
    return this.http.get<Employee[]>(environment.api + '/employees');
  }

  add(body: any) {
    return this.http.post(environment.api + '/employees', body);
  }

  update(body: any) {
    return this.http.put(environment.api + '/employees/' + body?.id, body);
  }

  delete(id: string) {
    return this.http.delete(environment.api + '/employees/' + id);
  }

  getByKey(id: string):Observable<Employee> {
    return this.http.get<Employee>(environment.api + '/employees/' + id);
  }


}
