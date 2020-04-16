import { NgModule } from "@angular/core";
import { IonicModule } from "@ionic/angular";
import { TranslateModule } from "@ngx-translate/core";
import { CommonModule } from '@angular/common';

import { PipesModule } from 'src/pipes/pipes.module';
import { SaleOrderLineOrderCartItemComponent } from '../../components/sale-order-line-order-cart-item/sale-order-line-order-cart-item';
import { SaleOrderLineOrderCartListComponent } from './sale-order-line-order-cart-list';



// const routes: Routes = [
//   {
//     path: '',
//     component: SaleOrderLineOrderCartListComponent
//   }
// ];

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    PipesModule,
    TranslateModule,
    // RouterModule.forChild(routes),
  ],
  exports: [SaleOrderLineOrderCartListComponent,SaleOrderLineOrderCartItemComponent],
  declarations: [SaleOrderLineOrderCartListComponent,SaleOrderLineOrderCartItemComponent],
  entryComponents: [SaleOrderLineOrderCartListComponent,SaleOrderLineOrderCartItemComponent]

})
export class SaleOrderLineOrderCartListModule { }


