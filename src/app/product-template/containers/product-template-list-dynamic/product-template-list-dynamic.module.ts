import { NgModule } from "@angular/core";
import { IonicModule } from "@ionic/angular";
import { TranslateModule } from "@ngx-translate/core";
import { CommonModule } from '@angular/common';
import {ProductTemplateItemComponent } from '../../components/product-template-item/product-template-item';
import { PipesModule } from 'src/pipes/pipes.module';
import { ProductTemplateDetailModule } from '../product-template-detail/product-template-detail.module';
import { ProductTemplateListDynamicComponent } from './product-template-list-dynamic';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    TranslateModule,
    FormsModule,
    ReactiveFormsModule,
    PipesModule,
    ProductTemplateDetailModule

  ],
  exports: [ProductTemplateListDynamicComponent,ProductTemplateItemComponent],
  declarations: [ProductTemplateListDynamicComponent,ProductTemplateItemComponent],
  entryComponents: [ProductTemplateListDynamicComponent,ProductTemplateItemComponent]

})
export class ProductTemplateListDynamicModule { }


