import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { EmployeeService } from '../services/employee.service';
import { TokenInterceptor } from '../token.interceptor';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
      // providers: [
      //   EmployeeService,
      //   {
      //     provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true
      //   }
      // ]

})
export class HomeComponent implements OnInit {

  employees:any[] = [];

  constructor(private employeeService: EmployeeService) { }

  ngOnInit(): void {
//check the token,

    this.employeeService.getAll().subscribe((res:any) => {
      this.employees = res;
    }, err => {

    })
  }


  getProfileImage(imgUrl:string) : string {
    return environment.api + '/' + imgUrl;
  }

}
