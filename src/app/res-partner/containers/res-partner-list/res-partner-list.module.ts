import { NgModule } from "@angular/core";
import { IonicModule } from "@ionic/angular";
import { TranslateModule } from "@ngx-translate/core";
import { CommonModule } from '@angular/common';
import {ResPartnerListComponent } from './res-partner-list';
import {ResPartnerItemComponent } from '../../components/res-partner-item/res-partner-item';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    TranslateModule,
  ],
  exports: [ResPartnerListComponent,ResPartnerItemComponent],
  declarations: [ResPartnerListComponent,ResPartnerItemComponent],
  entryComponents: [ResPartnerListComponent,ResPartnerItemComponent]

})
export class ResPartnerListModule { }


