import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  form!: FormGroup<{
    email: FormControl<null>;
    pwd: FormControl<null>;
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
    });
  }

  onLogin() {
    const values = { ...this.form.value };
    this.submitted = true;
    if (this.form.invalid) return;

    this.authService.login(values as any).subscribe((res) => {
      sessionStorage.setItem('user-token', JSON.stringify(res));
      this.router.navigateByUrl('/app');
    });
  }
}
