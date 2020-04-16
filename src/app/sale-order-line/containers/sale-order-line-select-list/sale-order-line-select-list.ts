import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import {SaleOrderLineOdooFields} from "../../models/sale-order-line";
import { ISaleOrderLine} from "../../models/sale-order-line";
import {  ModalController } from "@ionic/angular";
import * as fromSaleOrderLineStore from "../../store/state";
import * as fromSaleOrderLineSelectors from "../../store/selectors";
import * as fromSaleOrderLineActions from "../../store/actions";
import { Store } from "@ngrx/store";
import { FormControl } from "@angular/forms";
import { take, debounceTime } from 'rxjs/operators';

@Component({
  selector: "sale-order-line-select-list",
  templateUrl: "sale-order-line-select-list.html",
  styleUrls: ['./sale-order-line-select-list.scss'],
  providers: [Store]
})

export class SaleOrderLineSelectListComponent implements OnInit {
  searchControl: FormControl;
  navData: { name: string, info: string };

  searching = {
    is_searching: false,
    search_value: "",
    search_param: ""
  };

  public saleOrderLines$: Observable < ISaleOrderLine[] >;
  public saleOrderLineSearchInput: string = "";

  constructor(
    // privatesaleOrderLineActions:SaleOrderLineActions,
    private saleOrderLineStore: Store <fromSaleOrderLineStore.SaleOrderLineState >,
    private modalCtrl: ModalController,

  ) {
    this.initSearch()
  }

  ngOnInit() {
    this.saleOrderLines$ = this.saleOrderLineStore.select<any>(fromSaleOrderLineSelectors.selectAllData);
    this.saleOrderLineStore.dispatch(new fromSaleOrderLineActions.LoadHTTP({ domain: [], limit: 10, offset: 0, fields:SaleOrderLineOdooFields }));
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
  this.saleOrderLines$ = this.saleOrderLineStore.select<any>(
    fromSaleOrderLineSelectors.getSaleOrderLineBySearchTerm(this.searching.search_value)
  );
}

doRefresh(event) {

  this.saleOrderLineStore.dispatch(new fromSaleOrderLineActions.LoadHTTP({ domain: [], limit: 10, offset: 0, fields:SaleOrderLineOdooFields }));

setTimeout(() => {
  console.log('Async operation has ended');
  event.target.complete();
}, 2000);


}

loadData(event) {
  this.saleOrderLineStore
    .select(fromSaleOrderLineSelectors.selectTotalRecords)
    .pipe(take(1))
    .subscribe(totalRecords => {

      if (totalRecords || totalRecords === 0) {
        this.saleOrderLineStore.dispatch(new fromSaleOrderLineActions.LoadHTTP({ domain: [], limit: 10, offset: totalRecords }));
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
