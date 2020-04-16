import { NgModule } from "@angular/core";
import { IonicModule } from "@ionic/angular";
import { TranslateModule } from "@ngx-translate/core";
import {ResCountrySelectComponent } from "./res-country-select";
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ResCountrySelectListModule } from '../res-country-select-list/res-country-select-list.module';

@NgModule({
  imports: [
    IonicModule,
    ReactiveFormsModule,
    CommonModule,
    TranslateModule,
    ResCountrySelectListModule,
  ],
  exports: [ResCountrySelectComponent],
  declarations: [ResCountrySelectComponent],
  entryComponents: [ResCountrySelectComponent]
})
export class ResCountrySelectModule { }