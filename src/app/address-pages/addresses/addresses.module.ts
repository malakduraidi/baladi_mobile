import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { AddressesPage } from './addresses.page';
// For Translation Language
import { PipesModule } from 'src/pipes/pipes.module';
import { ResCountrySelectModule } from 'src/app/res-country/containers/res-country-select/res-country-select.module';

const routes: Routes = [
  {
    path: '',
    component: AddressesPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    PipesModule,
    ResCountrySelectModule
  ],
  declarations: [AddressesPage]
})
export class AddressesPageModule { }
