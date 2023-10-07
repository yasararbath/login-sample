import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './shared/components/auth.guard'; 
import { RegisterPageComponent } from './components/register-page/register-page.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

const routes: Routes = [
  {
    path:'login',
    component:LoginComponent
  },
  {
    path: 'register',
    component: RegisterPageComponent,
  }, 
  {
    path:'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
  }, 
  { 
    path: '', 
    redirectTo: '/login',
    pathMatch: 'full' 
  },
  { 
    path: '**', 
    redirectTo: '/login',
    pathMatch: 'full' 
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
