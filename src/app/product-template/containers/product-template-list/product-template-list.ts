import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import {ProductTemplate, ProductTemplateOdooFields} from "../../models/product-template";
import { IProductTemplate} from "../../models/product-template";
import {   ModalController } from "@ionic/angular";
import * as fromProductTemplateStore from "../../store/state";
import * as fromProductTemplateSelectors from "../../store/selectors";
import * as fromProductTemplateActions from "../../store/actions";

import { Store } from "@ngrx/store";
import { FormControl } from "@angular/forms";
import { take, debounceTime } from 'rxjs/operators';
import { ProductTemplateDetailComponent } from '../product-template-detail/product-template-detail';


/**
 * Generated class for theProductTemplateListComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: "product-template-list",
  templateUrl: "product-template-list.html",
  styleUrls: ['./product-template-list.scss'],
  providers: [Store]
})
export class ProductTemplateListComponent implements OnInit {
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

showRecordDetail(obj?){
  if (!obj) {
    // initialize
    obj =ProductTemplate.init();
  }

  const modal = this.modalCtrl.create({
    component:ProductTemplateDetailComponent,
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
  this.productTemplates$ = this.productTemplateStore.select<any>(
    fromProductTemplateSelectors.getProductTemplateBySearchTerm(this.searching.search_value)
  );
}

doRefresh(event) {

  this.productTemplateStore.dispatch(new fromProductTemplateActions.RefreshHTTP({ domain: [], limit: 10, offset: 0, fields:ProductTemplateOdooFields }));

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
