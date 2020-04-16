import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import {ProductTemplateOdooFields} from "../../models/product-template";
import { IProductTemplate} from "../../models/product-template";
import {  ModalController } from "@ionic/angular";
import * as fromProductTemplateStore from "../../store/state";
import * as fromProductTemplateSelectors from "../../store/selectors";
import * as fromProductTemplateActions from "../../store/actions";
import { Store } from "@ngrx/store";
import { FormControl } from "@angular/forms";
import { take, debounceTime } from 'rxjs/operators';

@Component({
  selector: "product-template-select-list",
  templateUrl: "product-template-select-list.html",
  styleUrls: ['./product-template-select-list.scss'],
  providers: [Store]
})

export class ProductTemplateSelectListComponent implements OnInit {
  searchControl: FormControl;
  navData: { name: string, info: string };

  searching = {
    is_searching: false,
    search_value: "",
    search_param: ""
  };

  public productTemplates$: Observable < IProductTemplate[] >;
  public productTemplateSearchInput: string = "";

  constructor(
    // privateproductTemplateActions:ProductTemplateActions,
    private productTemplateStore: Store <fromProductTemplateStore.ProductTemplateState >,
    private modalCtrl: ModalController,

  ) {
    this.initSearch()
  }

  ngOnInit() {
    this.productTemplates$ = this.productTemplateStore.select<any>(fromProductTemplateSelectors.selectAllData);
    this.productTemplateStore.dispatch(new fromProductTemplateActions.LoadHTTP({ domain: [], limit: 10, offset: 0, fields:ProductTemplateOdooFields }));
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
  this.productTemplates$ = this.productTemplateStore.select<any>(
    fromProductTemplateSelectors.getProductTemplateBySearchTerm(this.searching.search_value)
  );
}

doRefresh(event) {

  this.productTemplateStore.dispatch(new fromProductTemplateActions.LoadHTTP({ domain: [], limit: 10, offset: 0, fields:ProductTemplateOdooFields }));

setTimeout(() => {
  console.log('Async operation has ended');
  event.target.complete();
}, 2000);


}

loadData(event) {
  this.productTemplateStore
    .select(fromProductTemplateSelectors.selectTotalRecords)
    .pipe(take(1))
    .subscribe(totalRecords => {

      if (totalRecords || totalRecords === 0) {
        this.productTemplateStore.dispatch(new fromProductTemplateActions.LoadHTTP({ domain: [], limit: 10, offset: totalRecords }));
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
