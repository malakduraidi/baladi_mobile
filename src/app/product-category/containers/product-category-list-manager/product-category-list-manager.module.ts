import { NgModule } from "@angular/core";
import { IonicModule } from "@ionic/angular";
import { TranslateModule } from "@ngx-translate/core";
import { CommonModule } from '@angular/common';
import { ProductCategoryListManagerComponent } from './product-category-list-manager';
import { ProductCategoryItemManagerComponent } from '../../components/product-category-item-manager/product-category-item-manager';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PipesModule } from 'src/pipes/pipes.module';
import { ProductCategoryDetailModule } from '../product-category-detail/product-category-detail.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    TranslateModule,
    IonicModule,
    CommonModule,
    TranslateModule,
    FormsModule,
    ReactiveFormsModule,
    PipesModule,
    ProductCategoryDetailModule
  ],
  exports: [ProductCategoryListManagerComponent,ProductCategoryItemManagerComponent],
  declarations: [ProductCategoryListManagerComponent,ProductCategoryItemManagerComponent],
  entryComponents: [ProductCategoryListManagerComponent,ProductCategoryItemManagerComponent]

})
export class ProductCategoryListManagerModule { }


