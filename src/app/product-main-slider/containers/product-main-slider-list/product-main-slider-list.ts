import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import {ProductMainSlider, ProductMainSliderOdooFields} from "../../models/product-main-slider";
import { IProductMainSlider} from "../../models/product-main-slider";
import { ModalController } from "@ionic/angular";
import * as fromProductMainSliderStore from "../../store/state";
import * as fromProductMainSliderSelectors from "../../store/selectors";
import * as fromProductMainSliderActions from "../../store/actions";

import { Store } from "@ngrx/store";
// import {ProductMainSliderDetailComponent } from "../product-main-slider-detail/product-main-slider-detail";
import { FormControl } from "@angular/forms";
import { take, debounceTime } from 'rxjs/operators';


/**
 * Generated class for theProductMainSliderListComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: "product-main-slider-list",
  templateUrl: "product-main-slider-list.html",
  styleUrls: ['./product-main-slider-list.scss'],
  providers: [Store]
})
export class ProductMainSliderListComponent implements OnInit {
  searchControl: FormControl;
  navData: { name: string, info: string };

  searching = {
    is_searching: false,
    search_value: "",
    search_param: ""
  };

  public productMainSliders$: Observable < IProductMainSlider[] >;
  public productMainSliderSearchInput: string = "";

  constructor(
    // privateproductMainSliderActions:ProductMainSliderActions,
    private productMainSliderStore: Store <fromProductMainSliderStore.ProductMainSliderState >,
    private modalCtrl: ModalController,
    // private navParams: NavParams,

  ) {
    // this.navData = this.navParams.get('modelData');
    this.initSearch()
  }

  ngOnInit() {
    this.productMainSliders$ = this.productMainSliderStore.select<any>(fromProductMainSliderSelectors.selectAllData);
    this.productMainSliderStore.dispatch(new fromProductMainSliderActions.LoadHTTP({ domain: [], limit: 10, offset: 0, fields:ProductMainSliderOdooFields }));
}

showRecordDetail(obj?){
  // if (!obj) {
  //   // initialize
  //   obj =ProductMainSlider.init();
  // }

  // const modal = this.modalCtrl.create({
  //   component:ProductMainSliderDetailComponent,
  //   componentProps: { obj: obj }

  // });

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
  this.productMainSliders$ = this.productMainSliderStore.select<any>(
    fromProductMainSliderSelectors.getProductMainSliderBySearchTerm(this.searching.search_value)
  );
}

doRefresh(event) {

  this.productMainSliderStore.dispatch(new fromProductMainSliderActions.RefreshHTTP({ domain: [], limit: 10, offset: 0, fields:ProductMainSliderOdooFields }));

setTimeout(() => {
  console.log('Async operation has ended');
  event.target.complete();
}, 2000);


}

loadData(event) {
  this.productMainSliderStore
    .select(fromProductMainSliderSelectors.selectTotalRecords)
    .pipe(take(1))
    .subscribe(totalRecords => {

      if (totalRecords || totalRecords === 0) {
        this.productMainSliderStore.dispatch(new fromProductMainSliderActions.LoadHTTP({ domain: [], limit: 10, offset: totalRecords }));
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
