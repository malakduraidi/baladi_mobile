import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import {ProductMainSliderOdooFields} from "../../models/product-main-slider";
import { IProductMainSlider} from "../../models/product-main-slider";
import {   ModalController } from "@ionic/angular";
import * as fromProductMainSliderStore from "../../store/state";
import * as fromProductMainSliderSelectors from "../../store/selectors";
import * as fromProductMainSliderActions from "../../store/actions";
import { Store } from "@ngrx/store";
import { FormControl } from "@angular/forms";
import { take, debounceTime } from 'rxjs/operators';

@Component({
  selector: "product-main-slider-select-list",
  templateUrl: "product-main-slider-select-list.html",
  styleUrls: ['./product-main-slider-select-list.scss'],
  providers: [Store]
})

export class ProductMainSliderSelectListComponent implements OnInit {
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
  this.productMainSliders$ = this.productMainSliderStore.select<any>(
    fromProductMainSliderSelectors.getProductMainSliderBySearchTerm(this.searching.search_value)
  );
}

doRefresh(event) {

  this.productMainSliderStore.dispatch(new fromProductMainSliderActions.LoadHTTP({ domain: [], limit: 10, offset: 0, fields:ProductMainSliderOdooFields }));

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
