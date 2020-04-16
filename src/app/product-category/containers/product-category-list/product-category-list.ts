import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import {ProductCategory, ProductCategoryOdooFields} from "../../models/product-category";
import { IProductCategory} from "../../models/product-category";
import {  ModalController } from "@ionic/angular";
import * as fromProductCategoryStore from "../../store/state";
import * as fromProductCategorySelectors from "../../store/selectors";
import * as fromProductCategoryActions from "../../store/actions";

import { Store } from "@ngrx/store";
import { FormControl } from "@angular/forms";
import { take, debounceTime } from 'rxjs/operators';


/**
 * Generated class for theProductCategoryListComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: "product-category-list",
  templateUrl: "product-category-list.html",
  styleUrls: ['./product-category-list.scss'],
  providers: [Store]
})
export class ProductCategoryListComponent implements OnInit {
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
        // private navParams: NavParams,

  ) 
  {
// this.navData = this.navParams.get('modelData');
    this.initSearch()
  }

  ngOnInit() {
    // this.productCategorys$ = this.productCategoryStore.select<any>(fromProductCategorySelectors.selectAllData);
    // this.productCategoryStore.dispatch(new fromProductCategoryActions.LoadHTTP({ domain: [], limit: 10, offset: 0, fields:ProductCategoryOdooFields }));

}
ionViewWillEnter(){
     this.productCategorys$ = this.productCategoryStore.select<any>(fromProductCategorySelectors.selectAllData);
     this.productCategoryStore.dispatch(new fromProductCategoryActions.LoadHTTP({ domain: [], limit: 10, offset: 0, fields:ProductCategoryOdooFields }));



}

showRecordDetail(obj?){
  if (!obj) {
    // initialize
    obj =ProductCategory.init();
  }

//   const modal = this.modalCtrl.create({
//     component:ProductCategoryDetailComponent,
//     componentProps: { obj: obj }

//   });

// modal.then(ml => ml.present());
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
  this.productCategorys$ = this.productCategoryStore.select<any>(
    fromProductCategorySelectors.getProductCategoryBySearchTerm(this.searching.search_value)
  );
}

doRefresh(event) {

  this.productCategoryStore.dispatch(new fromProductCategoryActions.RefreshHTTP({ domain: [], limit: 10, offset: 0, fields:ProductCategoryOdooFields }));

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
