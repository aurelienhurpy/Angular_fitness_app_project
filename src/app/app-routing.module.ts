import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WelcomeComponent } from './welcome/welcome.component';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { LoginComponent } from './auth/login/login.component';
import { TrainingComponent } from './training/training.component';
import { AuthGuard } from './auth/authGuard';
import { CaloriesComponent } from './calories/calories.component';


const routes: Routes = [
  {path:'',component:WelcomeComponent},
  {path:'signup',component:SignUpComponent},
  {path:'login',component:LoginComponent},
  {path:'training',component:TrainingComponent},
  {path:'calories',component:CaloriesComponent}
  // {path:'training',component:TrainingComponent,canActivate:[AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  // providers:[AuthGuard]
})
export class AppRoutingModule { }
