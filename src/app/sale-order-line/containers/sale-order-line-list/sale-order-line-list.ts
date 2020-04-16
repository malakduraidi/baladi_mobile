import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import {SaleOrderLine, SaleOrderLineOdooFields} from "../../models/sale-order-line";
import { ISaleOrderLine} from "../../models/sale-order-line";
import {  ModalController } from "@ionic/angular";
import * as fromSaleOrderLineStore from "../../store/state";
import * as fromSaleOrderLineSelectors from "../../store/selectors";
import * as fromSaleOrderLineActions from "../../store/actions";

import { Store } from "@ngrx/store";
import {SaleOrderLineDetailComponent } from "../sale-order-line-detail/sale-order-line-detail";
import { FormControl } from "@angular/forms";
import { take, debounceTime } from 'rxjs/operators';


/**
 * Generated class for theSaleOrderLineListComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: "sale-order-line-list",
  templateUrl: "sale-order-line-list.html",
  styleUrls: ['./sale-order-line-list.scss'],
  providers: [Store]
})
export class SaleOrderLineListComponent implements OnInit {
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
    // this.navData = this.navParams.get('modelData');
    this.initSearch()
  }

  ngOnInit() {
    this.saleOrderLines$ = this.saleOrderLineStore.select<any>(fromSaleOrderLineSelectors.selectAllData);
    this.saleOrderLineStore.dispatch(new fromSaleOrderLineActions.LoadHTTP({ domain: [], limit: 10, offset: 0, fields:SaleOrderLineOdooFields }));
}

showRecordDetail(obj?){
  if (!obj) {
    // initialize
    obj =SaleOrderLine.init();
  }

  const modal = this.modalCtrl.create({
    component:SaleOrderLineDetailComponent,
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
  this.saleOrderLines$ = this.saleOrderLineStore.select<any>(
    fromSaleOrderLineSelectors.getSaleOrderLineBySearchTerm(this.searching.search_value)
  );
}

doRefresh(event) {

  this.saleOrderLineStore.dispatch(new fromSaleOrderLineActions.RefreshHTTP({ domain: [], limit: 10, offset: 0, fields:SaleOrderLineOdooFields }));

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
