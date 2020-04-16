import { NgModule } from "@angular/core";
import { IonicModule } from "@ionic/angular";
import { TranslateModule } from "@ngx-translate/core";
import {ResPartnerSelectComponent } from "./res-partner-select";
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ResPartnerSelectListModule } from '../res-partner-select-list/res-partner-select-list.module';

@NgModule({
  imports: [
    IonicModule,
    ReactiveFormsModule,
    CommonModule,
    TranslateModule,
    ResPartnerSelectListModule,
  ],
  exports: [ResPartnerSelectComponent,],
  declarations: [ResPartnerSelectComponent],
  entryComponents: [ResPartnerSelectComponent]
})
export class ResPartnerSelectModule { }