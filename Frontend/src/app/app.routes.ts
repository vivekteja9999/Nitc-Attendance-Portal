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
import { CycleListComponent } from './util/cycle-list/cycle-list.component';
import { BorrowComponent } from './cycle/borrow/borrow.component';
import { AdminComponent } from './cycle/admin/admin.component';
import { UserComponent } from './cycle/user/user.component';
import { ReturnComponent } from './cycle/return/return.component';
export const routes: Routes = [
  {path: '', component: LoginComponent},
  {path:'user/dashboard', component: UserDashboardComponent,canActivate: [AuthGuard]},
  {path:'admin/dashboard',component:AdminDashboardComponent,canActivate:[AuthGuard]},
  {path:'cr/dashboard',component:CrDashboardComponent,canActivate:[AuthGuard]},
  {path:'admin/cycles/register',component:CycleRegistrationComponent,canActivate:[AuthGuard]},
  {path:'admin/keys/register',component:KeyRegistrationComponent,canActivate:[AuthGuard]},
  {path:'admin/users/edit',component:EditUserDetailsComponent,canActivate:[AuthGuard]},
  { path: 'admin/cycles', component: CycleListComponent,canActivate:[AuthGuard]},
  {path: 'cycles/borrow',component:BorrowComponent,canActivate:[AuthGuard]},
  {path:'admin/requests',component:AdminComponent,canActivate:[AuthGuard]},
  {path:'user/requests',component:UserComponent,canActivate:[AuthGuard]},
  {path:'cycles/return',component:ReturnComponent,canActivate:[AuthGuard]}
];
