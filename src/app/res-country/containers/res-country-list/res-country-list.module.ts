import { NgModule } from "@angular/core";
import { IonicModule } from "@ionic/angular";
import { TranslateModule } from "@ngx-translate/core";
import { CommonModule } from '@angular/common';
import {ResCountryListComponent } from './res-country-list';
import {ResCountryItemComponent } from '../../components/res-country-item/res-country-item';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    TranslateModule,
  ],
  exports: [ResCountryListComponent,ResCountryItemComponent],
  declarations: [ResCountryListComponent,ResCountryItemComponent],
  entryComponents: [ResCountryListComponent,ResCountryItemComponent]

})
export class ResCountryListModule { }


