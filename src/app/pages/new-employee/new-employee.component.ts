import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-new-employee',
  templateUrl: './new-employee.component.html',
  styleUrls: ['./new-employee.component.scss'],
})
export class NewEmployeeComponent implements OnInit {
  empForm!: FormGroup<{ empname: FormControl<null>; job: FormControl<null>; salary: FormControl<null>; dateofjoin: FormControl<null>; }>;
  submitted = false;


  constructor(private empService: EmployeeService, private router: Router) {}

  ngOnInit(): void {
    this.empForm = new FormGroup({
      empname: new FormControl(null, [Validators.required,Validators.email]),
      job: new FormControl(null, [Validators.required]),
      salary: new FormControl(null, [Validators.required]),
      dateofjoin: new FormControl(null, [Validators.required]),
    });
  }

  onSave() {
    this.submitted = true;
    const values = this.empForm.value;

    if(this.empForm.invalid) return;

    console.log(this.empForm.get('empname')?.errors);

    this.empService.add(values).subscribe((res) => {
      this.router.navigateByUrl('/app')
    });
  }
}
