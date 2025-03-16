import { Routes } from '@angular/router';
import { LoginComponent } from './Login/login.component';
import { RouterModule } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { UserDashboardComponent } from './dashboards/user-dashboard/user-dashboard.component';
import { AdminDashboardComponent } from './dashboards/admin-dashboard/admin-dashboard.component';
import { CrDashboardComponent } from './dashboards/cr-dashboard/cr-dashboard.component';
import { CycleRegistrationComponent } from './registrations/cycle-registration/cycle-registration.component';
import { KeyRegistrationComponent } from './registrations/key-registration/key-registration.component';
import { EditUserDetailsComponent } from './util/edit-user-details/edit-user-details.component';
export const routes: Routes = [
  {path: '', component: LoginComponent},
  {path:'user-dashboard', component: UserDashboardComponent,canActivate: [AuthGuard]},
  {path:'admin-dashboard',component:AdminDashboardComponent,canActivate:[AuthGuard]},
  {path:'cr-dashboard',component:CrDashboardComponent,canActivate:[AuthGuard]},
  {path:'cycles/register',component:CycleRegistrationComponent,canActivate:[AuthGuard]},
  {path:'keys/register',component:KeyRegistrationComponent,canActivate:[AuthGuard]},
  {path:'users/edit',component:EditUserDetailsComponent,canActivate:[AuthGuard]}
];
