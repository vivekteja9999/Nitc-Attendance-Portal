import { Routes } from '@angular/router';
import { LoginComponent } from './Login/login.component';
import { RouterModule } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { UserDashboardComponent } from './dashboards/user-dashboard/user-dashboard.component';
import { AdminDashboardComponent } from './dashboards/admin-dashboard/admin-dashboard.component';
import { CrDashboardComponent } from './dashboards/cr-dashboard/cr-dashboard.component';
import { CycleRegistrationComponent } from './registrations/cycle-registration/cycle-registration.component';
import { EditUserDetailsComponent } from './util/edit-user-details/edit-user-details.component';
import { CycleListComponent } from './util/cycle-list/cycle-list.component';




import { borrowComponent } from './key/borrow/borrow.component';
import { ProfileComponent } from './util/profile/profile.component';
import { returnComponent } from './key/return/return.component';
import { KeyListComponent } from './util/key-list/key-list.component';
import { HomePageComponent } from './home-page/home-page.component';
import { StutealoginComponent } from './stutealogin/stutealogin.component';
import { AdminloginComponent } from './adminlogin/adminlogin.component';
import { SubjectRegistrationComponent } from './registrations/subject-registration/subject-registration.component';
import { ClassRegistrationComponent } from './registrations/class-registration/class-registration.component';
import { ModifySubclsComponent } from './registrations/modify-sub-cls/modify-sub-cls.component';
import { UpdateSubjectsComponent } from './update-subjects/update-subjects.component';
import { SubjectsalterationsComponent } from './subjectsalterations/subjectsalterations.component';
import { QRCodeGeneratorComponent } from './qrcodegenerator/qrcodegenerator.component';
import { TemporaryTestComponent } from './temporary-test/temporary-test.component';
import { StudentReportComponent } from './student-report/student-report.component';
import { BranchReportComponent } from './branch-report/branch-report.component';
import { StudentpercentComponent } from './studentpercent/studentpercent.component';
import { StudentsshortageComponent } from './studentsshortage/studentsshortage.component';
import { TeacherclasswiseComponent } from './teacherclasswise/teacherclasswise.component';
import { TeachershortageComponent } from './teachershortage/teachershortage.component';

export const routes: Routes = [
  {path: '', component: HomePageComponent} ,
  {path:'admin_login' , component:AdminloginComponent},
  {path:'user/dashboard', component: UserDashboardComponent , canActivate:[AuthGuard]},
  {path:'admin/dashboard',component:AdminDashboardComponent,canActivate:[AuthGuard]},
  {path:'cr/dashboard',component:CrDashboardComponent,canActivate:[AuthGuard]},
  {path:'admin/users/edit',component:EditUserDetailsComponent,canActivate:[AuthGuard]},
  { path: 'admin/class', component:ClassRegistrationComponent ,canActivate:[AuthGuard]},
  {path:'profile',component:ProfileComponent,canActivate:[AuthGuard]},
  {path:'admin/subjects',component:SubjectRegistrationComponent,canActivate:[AuthGuard]},
  {path:'admin/sc_modify',component:ModifySubclsComponent,canActivate:[AuthGuard]},
  {path:'cr/update_subjects', component:UpdateSubjectsComponent , canActivate:[AuthGuard]},
  {path:'cr/modify_teaching_subjects', component:SubjectsalterationsComponent , canActivate:[AuthGuard]},
  {path:'cr/generateqrcode' , component:TemporaryTestComponent , canActivate:[AuthGuard]},
  {path:'admin/studentreport' , component:StudentReportComponent , canActivate:[AuthGuard]} ,
  {path:'admin/branch', component: BranchReportComponent, canActivate:[AuthGuard]},
  {path:'studentpercent' , component:StudentpercentComponent , canActivate:[AuthGuard]},
  {path:'studentshortage' , component:StudentsshortageComponent , canActivate:[AuthGuard] },
  {path:'cr/classwise' , component:TeacherclasswiseComponent ,canActivate:[AuthGuard]},
  {path:'cr/shortages' , component:TeachershortageComponent , canActivate:[AuthGuard]}
];

