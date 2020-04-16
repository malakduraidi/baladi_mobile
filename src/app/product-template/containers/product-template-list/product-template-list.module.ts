import { NgModule } from "@angular/core";
import { IonicModule } from "@ionic/angular";
import { TranslateModule } from "@ngx-translate/core";
import { CommonModule } from '@angular/common';
import {ProductTemplateListComponent } from './product-template-list';
import {ProductTemplateItemComponent } from '../../components/product-template-item/product-template-item';
import { PipesModule } from 'src/pipes/pipes.module';
import { ProductTemplateDetailModule } from '../product-template-detail/product-template-detail.module';



@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    TranslateModule,
    PipesModule,
    ProductTemplateDetailModule

  ],
  exports: [ProductTemplateListComponent,ProductTemplateItemComponent],
  declarations: [ProductTemplateListComponent,ProductTemplateItemComponent],
  entryComponents: [ProductTemplateListComponent,ProductTemplateItemComponent]

})
export class ProductTemplateListModule { }


