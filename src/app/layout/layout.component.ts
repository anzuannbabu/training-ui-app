import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService, UserProfile } from '../services/auth.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnInit {
  profile: UserProfile | null = null;
  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    this.profile = this.authService.getUserProfile();
  }

  logout() {
    this.authService.logout();
  }
}
