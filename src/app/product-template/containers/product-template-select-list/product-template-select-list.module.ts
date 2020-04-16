import { NgModule } from "@angular/core";
import { IonicModule } from "@ionic/angular";
import { TranslateModule } from "@ngx-translate/core";
import { CommonModule } from '@angular/common';
import {ProductTemplateSelectListComponent } from './product-template-select-list';
import {ProductTemplateSelectItemComponent } from '../../components/product-template-select-item/product-template-select-item';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    TranslateModule,
  ],
  exports: [ProductTemplateSelectListComponent,ProductTemplateSelectItemComponent],
  declarations: [ProductTemplateSelectListComponent,ProductTemplateSelectItemComponent],
  entryComponents: [ProductTemplateSelectListComponent,ProductTemplateSelectItemComponent]

})
export class ProductTemplateSelectListModule { }


