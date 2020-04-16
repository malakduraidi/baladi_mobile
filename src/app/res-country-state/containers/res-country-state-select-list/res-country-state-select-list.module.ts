import { NgModule } from "@angular/core";
import { IonicModule } from "@ionic/angular";
import { TranslateModule } from "@ngx-translate/core";
import { CommonModule } from '@angular/common';
import {ResCountryStateSelectListComponent } from './res-country-state-select-list';
import {ResCountryStateSelectItemComponent } from '../../components/res-country-state-select-item/res-country-state-select-item';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    TranslateModule,
  ],
  exports: [ResCountryStateSelectListComponent,ResCountryStateSelectItemComponent],
  declarations: [ResCountryStateSelectListComponent,ResCountryStateSelectItemComponent],
  entryComponents: [ResCountryStateSelectListComponent,ResCountryStateSelectItemComponent]

})
export class ResCountryStateSelectListModule { }


