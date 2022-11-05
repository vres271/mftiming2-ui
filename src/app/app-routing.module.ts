import { RacersComponent } from './components/racers/racers.component';
import { RacesComponent } from './components/races/races.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { AuthGuard } from './auth.guard';
import { LoginComponent } from './components/login/login.component';
import { UsersComponent } from './components/users/users.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'users', component: UsersComponent, canActivate: [AuthGuard],  canActivateChild: [AuthGuard],},
  { path: 'categories', component: CategoriesComponent, canActivate: [AuthGuard],  canActivateChild: [AuthGuard],},
  { path: 'races', component: RacesComponent, canActivate: [AuthGuard],  canActivateChild: [AuthGuard],},
  { path: 'racers', component: RacersComponent, canActivate: [AuthGuard],  canActivateChild: [AuthGuard],},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
