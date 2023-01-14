import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
  crud: 'create' | 'update' = 'create';
  empId: string | number | null = null;

  constructor(
    private empService: EmployeeService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.readParams();

    this.empForm = new FormGroup({
      empname: new FormControl(null, [Validators.required]),
      job: new FormControl(null, [Validators.required]),
      salary: new FormControl(null, [Validators.required]),
      dateofjoin: new FormControl(null, [Validators.required]),
      profileImage: new FormControl(null, [Validators.required]),
    });

    // if(this.crud === 'update') {
    //   //get employee info and fill them into the form

    // }
  }
  readParams() {
    this.route.params.subscribe((param: any) => {
      console.log(param);
      if (param.id) {
        //this is editing
        this.crud = 'update';
        this.getSingleEmployeeDetails(param.id);
      } else {
        //new employee
        this.crud = 'create';
      }
    });
  }

  getSingleEmployeeDetails(id: any) {
    this.empId = id;
    this.empService.getByKey(id).subscribe((res: any) => {
      //fill the form
      Object.keys(this.empForm.value).forEach((key) => {
        if (key !== 'profilepic') {
          const value = res[key];
          this.empForm.get(key)?.setValue(value);
        }
      });
    });
  }

  uploadFile(event: any) {
    this.file = event.target.files[0];

    console.log('file', this.file.type);
  }

  onSave() {
    this.submitted = true;
    const values = this.empForm.value;

    if (this.empForm.invalid) return;

    console.log(this.empForm.get('empname')?.errors);

    if (this.crud === 'update') {
      //update the details
      let values = this.empForm.value;
      delete values.profileImage;
      const body = {
        id: this.empId,
        ...values,
      };
      this.empService.update(body).subscribe((res) => {
        this.router.navigateByUrl('/app/employee-list');
      });
    } else {
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
}
