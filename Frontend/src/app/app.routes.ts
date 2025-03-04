import { Routes } from '@angular/router';
import { LoginComponent } from './Login/login.component';
import { RouterModule } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';

export const routes: Routes = [
  {path: '', component: LoginComponent},
];
