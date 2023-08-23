import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateRegistrationComponent } from './create-registration/create-registration.component';
import { RegistrationListComponent } from './registration-list/registration-list.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { EventListComponent } from './event-list/event-list.component';
import { CompanyListComponent } from './company-list/company-list.component';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { CreateEventComponent } from './create-event/create-event.component';
import { CreateCompanyComponent } from './create-company/create-company.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth.guard';
import { LogoutComponent } from './logout/logout.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full'},
  { path: 'register', component: CreateRegistrationComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'logout', component: LogoutComponent },
  { path: 'event-create', component: CreateEventComponent, canActivate: [AuthGuard] },
  { path: 'company-create', component: CreateCompanyComponent, canActivate: [AuthGuard] },
  { path: 'admin-list', component: RegistrationListComponent, canActivate: [AuthGuard] },
  { path: 'event-list', component: EventListComponent, canActivate: [AuthGuard] },
  { path: 'company-list', component: CompanyListComponent, canActivate: [AuthGuard] },
  { path: 'employee-list', component: EmployeeListComponent, canActivate: [AuthGuard] },
  { path: 'detail/:id', component: UserDetailComponent, canActivate: [AuthGuard] },
  { path: 'admin-list/update/:id', component: CreateRegistrationComponent, canActivate: [AuthGuard] },
  { path: 'company-list/update/:id', component: CreateCompanyComponent, canActivate: [AuthGuard] },
  { path: 'event-list/update/:id', component: CreateEventComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
