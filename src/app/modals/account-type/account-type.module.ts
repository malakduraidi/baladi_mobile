import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule, } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { AccountTypePage } from './account-type.page';
import { PipesModule } from 'src/pipes/pipes.module';

// const routes: Routes = [
//   {
//     path: '',
//     component: AccountTypePage
//   }
// ];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PipesModule,
    // RouterModule.forChild(routes),
  ],
  declarations: [AccountTypePage],
  entryComponents: [
    AccountTypePage
  ]
})
export class AccountTypePageModule { }
