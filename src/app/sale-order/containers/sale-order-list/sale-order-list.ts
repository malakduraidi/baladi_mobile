import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import {SaleOrder, SaleOrderOdooFields} from "../../models/sale-order";
import { ISaleOrder} from "../../models/sale-order";
import {   ModalController } from "@ionic/angular";
import * as fromSaleOrderStore from "../../store/state";
import * as fromSaleOrderSelectors from "../../store/selectors";
import * as fromSaleOrderActions from "../../store/actions";

import { Store } from "@ngrx/store";
import {SaleOrderDetailComponent } from "../sale-order-detail/sale-order-detail";
import { FormControl } from "@angular/forms";
import { take, debounceTime } from 'rxjs/operators';


/**
 * Generated class for theSaleOrderListComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: "sale-order-list",
  templateUrl: "sale-order-list.html",
  styleUrls: ['./sale-order-list.scss'],
  providers: [Store]
})
export class SaleOrderListComponent implements OnInit {
  searchControl: FormControl;
  navData: { name: string, info: string };

  searching = {
    is_searching: false,
    search_value: "",
    search_param: ""
  };

  public saleOrders$: Observable < ISaleOrder[] >;
  public saleOrderSearchInput: string = "";

  constructor(
    // privatesaleOrderActions:SaleOrderActions,
    private saleOrderStore: Store <fromSaleOrderStore.SaleOrderState >,
    private modalCtrl: ModalController,

  ) {
    this.initSearch()
  }

  ngOnInit() {
    this.saleOrders$ = this.saleOrderStore.select<any>(fromSaleOrderSelectors.selectAllData);
    this.saleOrderStore.dispatch(new fromSaleOrderActions.LoadHTTP({ domain: [], limit: 10, offset: 0, fields:SaleOrderOdooFields }));
}

showRecordDetail(obj?){
  if (!obj) {
    // initialize
    obj =SaleOrder.init();
  }

  const modal = this.modalCtrl.create({
    component:SaleOrderDetailComponent,
    componentProps: { obj: obj }

  });

modal.then(ml => ml.present());
}

itemSelected(recordDetail) {
  // Either dismiss the item
  // or open the detail of that item
  if (!!this.navData) {
    // then it is been called from else where 
    this.modalCtrl.dismiss(recordDetail)

  }
  else {
    this.showRecordDetail(recordDetail)
  }
}

initSearch(){
  this.searchControl = new FormControl();
  this.searchControl.valueChanges.pipe(debounceTime(1000)).subscribe(search => {
    this.setFilteredItems();
  });
}

onSearchInput() {
}
setFilteredItems() {
  this.saleOrders$ = this.saleOrderStore.select<any>(
    fromSaleOrderSelectors.getSaleOrderBySearchTerm(this.searching.search_value)
  );
}

doRefresh(event) {

  this.saleOrderStore.dispatch(new fromSaleOrderActions.RefreshHTTP({ domain: [], limit: 10, offset: 0, fields:SaleOrderOdooFields }));

setTimeout(() => {
  console.log('Async operation has ended');
  event.target.complete();
}, 2000);


}

loadData(event) {
  this.saleOrderStore
    .select(fromSaleOrderSelectors.selectTotalRecords)
    .pipe(take(1))
    .subscribe(totalRecords => {

      if (totalRecords || totalRecords === 0) {
        this.saleOrderStore.dispatch(new fromSaleOrderActions.LoadHTTP({ domain: [], limit: 10, offset: totalRecords }));
      }
    });
  setTimeout(() => {
    console.log('Done');
    event.target.complete();
  }, 500);

  // get current offset
  // update the limit
}

closeModal() {
  this.modalCtrl.dismiss();
}




}
