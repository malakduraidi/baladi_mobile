import { NgModule } from "@angular/core";
import { IonicModule } from "@ionic/angular";
import { TranslateModule } from "@ngx-translate/core";
import { CommonModule } from '@angular/common';
import {ResPartnerSelectListComponent } from './res-partner-select-list';
import {ResPartnerSelectItemComponent } from '../../components/res-partner-select-item/res-partner-select-item';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    TranslateModule,
  ],
  exports: [ResPartnerSelectListComponent,ResPartnerSelectItemComponent],
  declarations: [ResPartnerSelectListComponent,ResPartnerSelectItemComponent],
  entryComponents: [ResPartnerSelectListComponent,ResPartnerSelectItemComponent]

})
export class ResPartnerSelectListModule { }


