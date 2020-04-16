import { NgModule } from "@angular/core";
import { IonicModule } from "@ionic/angular";
import { TranslateModule } from "@nrgx-translate/core";
import {ConfigDetailComponent } from "./config-detail";
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import {ConfigFormComponent } from '../../components/config-form/config-form';

@NgModule({
  imports: [
    IonicModule,
    ReactiveFormsModule,
    CommonModule,
    TranslateModule
  ],
  exports: [ConfigDetailComponent,ConfigFormComponent],
  declarations: [ConfigDetailComponent,ConfigFormComponent],
  entryComponents: [ConfigDetailComponent]
})
export class ConfigDetailModule { }