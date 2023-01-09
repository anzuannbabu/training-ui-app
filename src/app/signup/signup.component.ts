import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../model/user.model';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  form!: FormGroup<{
    email: FormControl<null>;
    pwd: FormControl<null>;
    name: FormControl<null>;
  }>;
  submitted: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      pwd: new FormControl(null, [
        Validators.required,
        Validators.minLength(8),
      ]),
      name: new FormControl(null, [Validators.required]),
    });
  }

  onRegister() {
    const values = { ...this.form.value };
    this.submitted = true;
    if (this.form.invalid) return;

    this.authService.register(values as any).subscribe((res) => {
      this.router.navigateByUrl('/');
    });
  }
}
