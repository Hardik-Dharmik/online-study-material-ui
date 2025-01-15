import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllPdfsComponent } from './components/all-pdfs/all-pdfs.component';
import { ClassesComponent } from './components/classes/classes.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { SubjectsComponent } from './components/subjects/subjects.component';
import { UserDashboardComponent } from './dashboards/user-dashboard/user-dashboard.component';
import { UserLayoutComponent } from './layouts/user-layout/user-layout.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { ProfileComponent } from './components/profile/profile.component';

const routes: Routes = [
  {
    path: '',
    component: LoginFormComponent,
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginFormComponent,
    pathMatch: 'full',
  },
  {
    path: 'signup',
    component: SignUpComponent,
    pathMatch: 'full',
  },
  {
    path: 'dashboard',
    component: UserLayoutComponent,
    children: [
      { path: '', component: UserDashboardComponent },
      { path: 'profile', component: ProfileComponent },
      { path: 'all-pdfs', component: AllPdfsComponent },
      { path: 'subjects', component: SubjectsComponent },
      { path: 'classes', component: ClassesComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
