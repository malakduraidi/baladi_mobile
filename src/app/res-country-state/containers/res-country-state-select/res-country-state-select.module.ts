import { NgModule } from "@angular/core";
import { IonicModule } from "@ionic/angular";
import { TranslateModule } from "@ngx-translate/core";
import {ResCountryStateSelectComponent } from "./res-country-state-select";
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ResCountryStateSelectListModule } from '../res-country-state-select-list/res-country-state-select-list.module';

@NgModule({
  imports: [
    IonicModule,
    ReactiveFormsModule,
    CommonModule,
    TranslateModule,
    ResCountryStateSelectListModule,
  ],
  exports: [ResCountryStateSelectComponent],
  declarations: [ResCountryStateSelectComponent],
  entryComponents: [ResCountryStateSelectComponent]
})
export class ResCountryStateSelectModule { }