import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ShippingAddressPage } from './shipping-address.page';

// For Translation Language
import { PipesModule } from 'src/pipes/pipes.module';
import { ResCountrySelectModule } from 'src/app/res-country/containers/res-country-select/res-country-select.module';
import { ResCountryStateSelectModule } from 'src/app/res-country-state/containers/res-country-state-select/res-country-state-select.module';

const routes: Routes = [
  {
    path: '',
    component: ShippingAddressPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    PipesModule,
    ResCountrySelectModule,
    ResCountryStateSelectModule
  ],
  declarations: [ShippingAddressPage]
})
export class ShippingAddressPageModule {}
