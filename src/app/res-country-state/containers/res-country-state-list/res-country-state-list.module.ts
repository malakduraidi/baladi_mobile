import { NgModule } from "@angular/core";
import { IonicModule } from "@ionic/angular";
import { TranslateModule } from "@ngx-translate/core";
import { CommonModule } from '@angular/common';
import {ResCountryStateListComponent } from './res-country-state-list';
import {ResCountryStateItemComponent } from '../../components/res-country-state-item/res-country-state-item';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    TranslateModule,
  ],
  exports: [ResCountryStateListComponent,ResCountryStateItemComponent],
  declarations: [ResCountryStateListComponent,ResCountryStateItemComponent],
  entryComponents: [ResCountryStateListComponent,ResCountryStateItemComponent]

})
export class ResCountryStateListModule { }


