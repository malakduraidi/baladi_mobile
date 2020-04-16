import { NgModule } from "@angular/core";
import { IonicModule } from "@ionic/angular";
import { TranslateModule } from "@ngx-translate/core";
import { CommonModule } from '@angular/common';
import {ConfigSelectListComponent } from './config-select-list';
import {ConfigSelectItemComponent } from '../../components/config-select-item/config-select-item';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    TranslateModule,
  ],
  exports: [ConfigSelectListComponent,ConfigSelectItemComponent],
  declarations: [ConfigSelectListComponent,ConfigSelectItemComponent],
  entryComponents: [ConfigSelectListComponent,ConfigSelectItemComponent]

})
export class ConfigSelectListModule { }


