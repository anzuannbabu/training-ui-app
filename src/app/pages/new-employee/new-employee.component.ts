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
  empForm!: FormGroup<{
    empname: FormControl<null>;
    job: FormControl<null>;
    salary: FormControl<null>;
    dateofjoin: FormControl<null>;
    profileImage: FormControl<null>;
  }>;
  submitted = false;

  file!: File; //this is for file upload

  constructor(private empService: EmployeeService, private router: Router) {}

  ngOnInit(): void {
    this.empForm = new FormGroup({
      empname: new FormControl(null, [Validators.required]),
      job: new FormControl(null, [Validators.required]),
      salary: new FormControl(null, [Validators.required]),
      dateofjoin: new FormControl(null, [Validators.required]),
      profileImage: new FormControl(null, [Validators.required]),
    });
  }

  uploadFile(event:any) {
    this.file = event.target.files[0];

    console.log("file", this.file.type);
  }

  onSave() {
    this.submitted = true;
    const values = this.empForm.value;

    if (this.empForm.invalid) return;

    console.log(this.empForm.get('empname')?.errors);

    const formData = new FormData();
    Object.keys(values).forEach((key) => {
      const data = values as any;
      formData.append(key, data[key]);
    });

    formData.append('file', this.file, this.file?.name);

    //adding file

    this.empService.add(formData).subscribe((res) => {
      this.router.navigateByUrl('/app');
    });
  }
}
