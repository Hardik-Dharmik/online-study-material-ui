import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { UserDashboardComponent } from './dashboards/user-dashboard/user-dashboard.component';
import { UserLayoutComponent } from './layouts/user-layout/user-layout.component';

const routes: Routes = [
  {
    path: '',
    component: LoginFormComponent,
  },
  {
    path: 'dashboard',
    component: UserLayoutComponent,
    children: [{ path: '', component: UserDashboardComponent }],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
