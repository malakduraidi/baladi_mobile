import { NgModule } from "@angular/core";
import { IonicModule } from "@ionic/angular";
import { TranslateModule } from "@ngx-translate/core";
import {ResCountryStateDetailComponent } from "./res-country-state-detail";
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import {ResCountryStateFormComponent } from '../../components/res-country-state-form/res-country-state-form';

@NgModule({
  imports: [
    IonicModule,
    ReactiveFormsModule,
    CommonModule,
    TranslateModule
  ],
  exports: [ResCountryStateDetailComponent,ResCountryStateFormComponent],
  declarations: [ResCountryStateDetailComponent,ResCountryStateFormComponent],
  entryComponents: [ResCountryStateDetailComponent]
})
export class ResCountryStateDetailModule { }