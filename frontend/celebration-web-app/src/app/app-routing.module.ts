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

const routes: Routes = [
  { path: '', redirectTo: 'register', pathMatch: 'full'},
  { path: 'register', component: CreateRegistrationComponent },
  { path: 'event-create', component: CreateEventComponent },
  { path: 'company-create', component: CreateCompanyComponent },
  { path: 'admin-list', component: RegistrationListComponent },
  { path: 'event-list', component: EventListComponent },
  { path: 'company-list', component: CompanyListComponent },
  { path: 'employee-list', component: EmployeeListComponent },
  { path: 'detail/:id', component: UserDetailComponent },
  { path: 'admin-list/update/:id', component: CreateRegistrationComponent },
  { path: 'company-list/update/:id', component: CreateCompanyComponent },
  { path: 'event-list/update/:id', component: CreateEventComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
