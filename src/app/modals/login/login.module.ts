import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { LoginPage } from './login.page';
import { PipesModule } from 'src/pipes/pipes.module';
import { AccountTypePage } from '../account-type/account-type.page';
import { AccountTypePageModule } from '../account-type/account-type.module';

const routes: Routes = [
  {
    path: '',
    component: LoginPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PipesModule,
    AccountTypePageModule,
    RouterModule.forChild(routes),
  ],
  declarations: [LoginPage],
  entryComponents: [
    LoginPage
  ]
})
export class LoginPageModule { }
