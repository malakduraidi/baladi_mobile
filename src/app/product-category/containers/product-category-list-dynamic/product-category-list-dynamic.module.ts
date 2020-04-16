import { NgModule } from "@angular/core";
import { IonicModule } from "@ionic/angular";
import { TranslateModule } from "@ngx-translate/core";
import { CommonModule } from '@angular/common';
import { ProductCategoryListDynamicComponent } from './product-category-list-dynamic';
import { ProductCategoryItemComponent } from '../../components/product-category-item/product-category-item';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    TranslateModule,
  ],
  exports: [ProductCategoryListDynamicComponent,ProductCategoryItemComponent],
  declarations: [ProductCategoryListDynamicComponent,ProductCategoryItemComponent],
  entryComponents: [ProductCategoryListDynamicComponent,ProductCategoryItemComponent]

})
export class ProductCategoryListDynamicModule { }


