import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import {ProductCategoryOdooFields} from "../../models/product-category";
import { IProductCategory} from "../../models/product-category";
import {  ModalController } from "@ionic/angular";
import * as fromProductCategoryStore from "../../store/state";
import * as fromProductCategorySelectors from "../../store/selectors";
import * as fromProductCategoryActions from "../../store/actions";
import { Store } from "@ngrx/store";
import { FormControl } from "@angular/forms";
import { take, debounceTime } from 'rxjs/operators';

@Component({
  selector: "product-category-select-list",
  templateUrl: "product-category-select-list.html",
  styleUrls: ['./product-category-select-list.scss'],
  providers: [Store]
})

export class ProductCategorySelectListComponent implements OnInit {
  searchControl: FormControl;
  navData: { name: string, info: string };

  searching = {
    is_searching: false,
    search_value: "",
    search_param: ""
  };

  public productCategorys$: Observable < IProductCategory[] >;
  public productCategorySearchInput: string = "";

  constructor(
    // privateproductCategoryActions:ProductCategoryActions,
    private productCategoryStore: Store <fromProductCategoryStore.ProductCategoryState >,
    private modalCtrl: ModalController,

  ) {
    this.initSearch()
  }

  ngOnInit() {
    this.productCategorys$ = this.productCategoryStore.select<any>(fromProductCategorySelectors.selectAllData);
    this.productCategoryStore.dispatch(new fromProductCategoryActions.LoadHTTP({ domain: [], limit: 10, offset: 0, fields:ProductCategoryOdooFields }));
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
  this.productCategorys$ = this.productCategoryStore.select<any>(
    fromProductCategorySelectors.getProductCategoryBySearchTerm(this.searching.search_value)
  );
}

doRefresh(event) {

  this.productCategoryStore.dispatch(new fromProductCategoryActions.LoadHTTP({ domain: [], limit: 10, offset: 0, fields:ProductCategoryOdooFields }));

setTimeout(() => {
  console.log('Async operation has ended');
  event.target.complete();
}, 2000);


}

loadData(event) {
  this.productCategoryStore
    .select(fromProductCategorySelectors.selectTotalRecords)
    .pipe(take(1))
    .subscribe(totalRecords => {

      if (totalRecords || totalRecords === 0) {
        this.productCategoryStore.dispatch(new fromProductCategoryActions.LoadHTTP({ domain: [], limit: 10, offset: totalRecords }));
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
