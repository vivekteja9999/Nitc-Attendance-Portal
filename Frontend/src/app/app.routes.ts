import { Routes } from '@angular/router';
import { LoginComponent } from './Login/login.component';
import { RouterModule } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { UserDashboardComponent } from './dashboards/user-dashboard/user-dashboard.component';

export const routes: Routes = [
  {path: '', component: LoginComponent},
  {path:'user-dashboard', component: UserDashboardComponent},
];
