import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
//for home banner
import { BannerComponent } from '../banner/banner.component';
//for home footer segment

// for product
import { ProductComponent } from '../product/product.component';
//for sliding tab
import { SlidingTabsComponent } from '../sliding-tabs/sliding-tabs.component';
//for featrued product scrolling
import { ScrollingFeaturedProductsComponent } from '../scrolling-featured-products/scrolling-featured-products.component';
//for categories
import { CategoriesComponent } from '../categories/categories.component';
import { PipesModule } from 'src/pipes/pipes.module';
import { TimerComponent } from '../timer/timer.component';
import { TranslateModule } from '@ngx-translate/core';
import { OrderItemComponent } from 'src/components/order-item/order-item.component';




@NgModule({
  declarations: [
    BannerComponent,
    ProductComponent,
    SlidingTabsComponent,
    ScrollingFeaturedProductsComponent,
    CategoriesComponent,
    TimerComponent,
    OrderItemComponent
  ],
  exports: [
    BannerComponent,
    ProductComponent,
    SlidingTabsComponent,
    ScrollingFeaturedProductsComponent,
    CategoriesComponent,
    TimerComponent,
    TranslateModule,
    OrderItemComponent
  ],
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    PipesModule,
    TranslateModule

  ],
})
export class ShareModule { }
