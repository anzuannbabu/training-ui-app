import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { HomeComponent } from './home/home.component';
import { LayoutComponent } from './layout/layout.component';
import { EmployeeListComponent } from './pages/employee-list/employee-list.component';
import { NewEmployeeComponent } from './pages/new-employee/new-employee.component';
import { NewDepartmentComponent } from './pages/new-department/new-department.component';
import { DepartmentListComponent } from './pages/department-list/department-list.component';
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import {HttpClientModule} from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ValidationMessagesComponent } from './layout/validation-messages/validation-messages.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    HomeComponent,
    LayoutComponent,
    EmployeeListComponent,
    NewEmployeeComponent,
    NewDepartmentComponent,
    DepartmentListComponent,
    SidebarComponent,
    ValidationMessagesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
