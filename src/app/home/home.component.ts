import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../services/employee.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
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

}
