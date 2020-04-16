import { NgModule } from "@angular/core";
import { IonicModule } from "@ionic/angular";
import { TranslateModule } from "@ngx-translate/core";
import { CommonModule } from '@angular/common';
import {ResCountrySelectListComponent } from './res-country-select-list';
import {ResCountrySelectItemComponent } from '../../components/res-country-select-item/res-country-select-item';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    TranslateModule,
  ],
  exports: [ResCountrySelectListComponent,ResCountrySelectItemComponent],
  declarations: [ResCountrySelectListComponent,ResCountrySelectItemComponent],
  entryComponents: [ResCountrySelectListComponent,ResCountrySelectItemComponent]

})
export class ResCountrySelectListModule { }


