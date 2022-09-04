import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AuthlayoutComponent } from './Layout/authlayout/authlayout.component';
import { SigninComponent } from './features/auth/signin/signin.component';
import { SignupComponent } from './features/auth/signup/signup.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { MainlayoutComponent } from './Layout/mainlayout/mainlayout.component';
import { DetailsComponent } from './components/activities/details/details.component';
import { FormComponent } from './components/activities/form/form.component';
import { ActivitiesListComponent } from './components/activities/dashboard/activitieslist/activitieslist.component';
import { ActivitiestoolbarComponent } from './components/Activities/dashboard/activitiestoolbar/activitiestoolbar.component';
import { CustominterceptorInterceptor } from './_interceptors/custominterceptor.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    AuthlayoutComponent,
    SigninComponent,
    SignupComponent,
    DashboardComponent,
    MainlayoutComponent,
    DetailsComponent,
    FormComponent,
    ActivitiesListComponent,
    ActivitiestoolbarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    HttpClientModule,
    RouterModule,
    MatIconModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: CustominterceptorInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
