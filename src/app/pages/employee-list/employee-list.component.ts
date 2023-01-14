import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Employee } from 'src/app/model/employee.model';
import { EmployeeService } from 'src/app/services/employee.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss'],
})
export class EmployeeListComponent implements OnInit {
  employees$!: Observable<Employee[]>;

  constructor(private employeeService: EmployeeService, private router: Router) {}

  ngOnInit(): void {
    this.employees$ = this.employeeService.getAll();
  }

  getProfileImage(imgUrl: string | null | undefined): string {
    return imgUrl ? environment.api + '/' + imgUrl : '';
  }

  onDelete(data: Employee) {
    const conf = confirm("Are you sure?");
    if(!conf) return;

    this.employeeService.delete(data._id).subscribe((res) => {
      this.employees$ = this.employeeService.getAll(); //reload the employees list
    });
  }

  onEdit(data: Employee) {
    this.router.navigateByUrl('/app/edit-employee/'+data._id);
  }
}
