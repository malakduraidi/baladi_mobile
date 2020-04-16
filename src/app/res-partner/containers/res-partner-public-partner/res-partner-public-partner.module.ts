import { NgModule } from "@angular/core";
import { IonicModule } from "@ionic/angular";
import { TranslateModule } from "@ngx-translate/core";
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ResPartnerPublicPartnerComponent } from './res-partner-public-partner';
import { ResPartnerPublicPartnerFormComponent } from '../../components/res-partner-public-partner-form/res-partner-public-partner-form';
import { Routes, RouterModule } from '@angular/router';
import { ResCountrySelectListModule } from 'src/app/res-country/containers/res-country-select-list/res-country-select-list.module';
import { ResCountryStateSelectListModule } from 'src/app/res-country-state/containers/res-country-state-select-list/res-country-state-select-list.module';


const routes: Routes = [
  {
    path: '',
    component: ResPartnerPublicPartnerComponent
  }
];

@NgModule({
  imports: [
    IonicModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    CommonModule,
    TranslateModule,
    ResCountrySelectListModule,
    ResCountryStateSelectListModule,
  ],
  exports: [ResPartnerPublicPartnerComponent,ResPartnerPublicPartnerFormComponent],
  declarations: [ResPartnerPublicPartnerComponent,ResPartnerPublicPartnerFormComponent],
  entryComponents: [ResPartnerPublicPartnerComponent]
})
export class ResPartnerPublicPartnerModule { }