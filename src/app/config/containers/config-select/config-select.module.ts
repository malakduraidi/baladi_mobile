import { NgModule } from "@angular/core";
import { IonicModule } from "@ionic/angular";
import { TranslateModule } from "@ngx-translate/core";
import {ConfigSelectComponent } from "./config-select";
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ConfigSelectListModule } from '../config-select-list/config-select-list.module';

@NgModule({
  imports: [
    IonicModule,
    ReactiveFormsModule,
    CommonModule,
    TranslateModule,
    ConfigSelectListModule,
  ],
  exports: [ConfigSelectComponent,],
  declarations: [ConfigSelectComponent],
  entryComponents: [ConfigSelectComponent]
})
export class ConfigSelectModule { }