import { NgModule } from "@angular/core";
import { IonicModule } from "@ionic/angular";
import { TranslateModule } from "@ngx-translate/core";
import { CommonModule } from '@angular/common';
import {ConfigListComponent } from './config-list';
import {ConfigItemComponent } from '../../components/config-item/config-item';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    TranslateModule,
  ],
  exports: [ConfigListComponent,ConfigItemComponent],
  declarations: [ConfigListComponent,ConfigItemComponent],
  entryComponents: [ConfigListComponent,ConfigItemComponent]

})
export class ConfigListModule { }


