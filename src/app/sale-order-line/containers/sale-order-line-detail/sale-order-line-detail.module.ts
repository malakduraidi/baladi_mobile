import { NgModule } from "@angular/core";
import { IonicModule } from "@ionic/angular";
import { TranslateModule } from "@ngx-translate/core";
import {SaleOrderLineDetailComponent } from "./sale-order-line-detail";
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import {SaleOrderLineFormComponent } from '../../components/sale-order-line-form/sale-order-line-form';

@NgModule({
  imports: [
    IonicModule,
    ReactiveFormsModule,
    CommonModule,
    TranslateModule
  ],
  exports: [SaleOrderLineDetailComponent,SaleOrderLineFormComponent],
  declarations: [SaleOrderLineDetailComponent,SaleOrderLineFormComponent],
  entryComponents: [SaleOrderLineDetailComponent]
})
export class SaleOrderLineDetailModule { }