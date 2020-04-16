import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import {SaleOrderOdooFields} from "../../models/sale-order";
import { ISaleOrder} from "../../models/sale-order";
import {   ModalController } from "@ionic/angular";
import * as fromSaleOrderStore from "../../store/state";
import * as fromSaleOrderSelectors from "../../store/selectors";
import * as fromSaleOrderActions from "../../store/actions";
import { Store } from "@ngrx/store";
import { FormControl } from "@angular/forms";
import { take, debounceTime } from 'rxjs/operators';

@Component({
  selector: "sale-order-select-list",
  templateUrl: "sale-order-select-list.html",
  styleUrls: ['./sale-order-select-list.scss'],
  providers: [Store]
})

export class SaleOrderSelectListComponent implements OnInit {
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
    // this.navData = this.navParams.get('modelData');
    this.initSearch()
  }

  ngOnInit() {
    this.saleOrders$ = this.saleOrderStore.select<any>(fromSaleOrderSelectors.selectAllData);
    this.saleOrderStore.dispatch(new fromSaleOrderActions.LoadHTTP({ domain: [], limit: 10, offset: 0, fields:SaleOrderOdooFields }));
}



itemSelected(recordDetail) {
    this.modalCtrl.dismiss(recordDetail)
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

  this.saleOrderStore.dispatch(new fromSaleOrderActions.LoadHTTP({ domain: [], limit: 10, offset: 0, fields:SaleOrderOdooFields }));

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
