import { NgModule } from "@angular/core";
import { IonicModule } from "@ionic/angular";
import { TranslateModule } from "@ngx-translate/core";
import {ResCountryDetailComponent } from "./res-country-detail";
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import {ResCountryFormComponent } from '../../components/res-country-form/res-country-form';

@NgModule({
  imports: [
    IonicModule,
    ReactiveFormsModule,
    CommonModule,
    TranslateModule
  ],
  exports: [ResCountryDetailComponent,ResCountryFormComponent],
  declarations: [ResCountryDetailComponent,ResCountryFormComponent],
  entryComponents: [ResCountryDetailComponent]
})
export class ResCountryDetailModule { }