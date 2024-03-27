import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './base/login/login.component';

import { UserTableComponent } from './base/user/user-table/user-table.component';
import { RegisterComponent } from './base/register/register.component';
import { MainShellComponent } from './share/fragments/main-shell/main-shell.component';

/*
const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'user', component: UserTableComponent },
  { path: 'user/edit/:id', component: UserTableComponent },
  { path: 'user/add', component: UserTableComponent },
  { path: '**', redirectTo: '' }
];*/

export const routes: Routes = [
  {
    path: '',
    component: MainShellComponent,
    children: [
      { path: 'login', component: LoginComponent },
      { 
        path: 'user', 
        component: UserTableComponent,
        children: [
          { path: 'edit/:id', component: UserTableComponent },
          { path: 'add', component: UserTableComponent }
        ]
      },
      { path: '**', redirectTo: 'login' } // Redirecciona rutas no encontradas a 'login'
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }