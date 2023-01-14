import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { HomeComponent } from './home/home.component';
import { LayoutComponent } from './layout/layout.component';
import { LoginComponent } from './login/login.component';
import { DepartmentListComponent } from './pages/department-list/department-list.component';
import { EmployeeListComponent } from './pages/employee-list/employee-list.component';
import { NewDepartmentComponent } from './pages/new-department/new-department.component';
import { NewEmployeeComponent } from './pages/new-employee/new-employee.component';
import { SignupComponent } from './signup/signup.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
  },
  {
    path: 'signup',
    component: SignupComponent,
  },
  {
    path: 'app',
    component: LayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      },
      {
        path: 'home',
        component: HomeComponent,
      },
      {
        path: 'employee-list',
        component: EmployeeListComponent,
      },
      {
        path: 'new-employee',
        component: NewEmployeeComponent,
      },
      {
        path: 'edit-employee/:id',
        component: NewEmployeeComponent,
      },
      {
        path: 'department-list',
        component: DepartmentListComponent,
      },
      {
        path: 'new-department',
        component: NewDepartmentComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
