import { NgModule } from "@angular/core";
import { IonicModule } from "@ionic/angular";
import { TranslateModule } from "@ngx-translate/core";
import {ResPartnerDetailComponent } from "./res-partner-detail";
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import {ResPartnerFormComponent } from '../../components/res-partner-form/res-partner-form';

@NgModule({
  imports: [
    IonicModule,
    ReactiveFormsModule,
    CommonModule,
    TranslateModule
  ],
  exports: [ResPartnerDetailComponent,ResPartnerFormComponent],
  declarations: [ResPartnerDetailComponent,ResPartnerFormComponent],
  entryComponents: [ResPartnerDetailComponent]
})
export class ResPartnerDetailModule { }