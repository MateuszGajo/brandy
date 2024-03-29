import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailsComponent } from './components/activities/details/details.component';
import { FormComponent } from './components/activities/form/form.component';
import { SigninComponent } from './features/auth/signin/signin.component';
import { SignupComponent } from './features/auth/signup/signup.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { AuthlayoutComponent } from './Layout/authlayout/authlayout.component';
import { MainlayoutComponent } from './Layout/mainlayout/mainlayout.component';
import { AuthGuard } from './_guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: MainlayoutComponent,
    children: [
      {
        path: '',
        component: DashboardComponent,
      },
      {
        path: 'activity/add',
        component: FormComponent,
      },
      {
        path: 'activity/:id',
        component: DetailsComponent,
      },
    ],
  },
  {
    path: '',
    component: AuthlayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'signin',
        component: SigninComponent,
      },
      {
        path: 'signup',
        component: SignupComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
