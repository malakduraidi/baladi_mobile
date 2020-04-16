import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import {ResCountryState, ResCountryStateOdooFields} from "../../models/res-country-state";
import { IResCountryState} from "../../models/res-country-state";
import {   ModalController } from "@ionic/angular";
import * as fromResCountryStateStore from "../../store/state";
import * as fromResCountryStateSelectors from "../../store/selectors";
import * as fromResCountryStateActions from "../../store/actions";

import { Store } from "@ngrx/store";
import {ResCountryStateDetailComponent } from "../res-country-state-detail/res-country-state-detail";
import { FormControl } from "@angular/forms";
import { take, debounceTime } from 'rxjs/operators';


/**
 * Generated class for theResCountryStateListComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: "res-country-state-list",
  templateUrl: "res-country-state-list.html",
  styleUrls: ['./res-country-state-list.scss'],
  providers: [Store]
})
export class ResCountryStateListComponent implements OnInit {
  searchControl: FormControl;
  navData: { name: string, info: string };

  searching = {
    is_searching: false,
    search_value: "",
    search_param: ""
  };

  public resCountryStates$: Observable < IResCountryState[] >;
  public resCountryStateSearchInput: string = "";

  constructor(
    // privateresCountryStateActions:ResCountryStateActions,
    private resCountryStateStore: Store <fromResCountryStateStore.ResCountryStateState >,
    private modalCtrl: ModalController,

  ) {
    this.initSearch()
  }

  ngOnInit() {
    this.resCountryStates$ = this.resCountryStateStore.select<any>(fromResCountryStateSelectors.selectAllData);
    this.resCountryStateStore.dispatch(new fromResCountryStateActions.LoadHTTP({ domain: [], limit: 10, offset: 0, fields:ResCountryStateOdooFields }));
}

showRecordDetail(obj?){
  if (!obj) {
    // initialize
    obj =ResCountryState.init();
  }

  const modal = this.modalCtrl.create({
    component:ResCountryStateDetailComponent,
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
  this.resCountryStates$ = this.resCountryStateStore.select<any>(
    fromResCountryStateSelectors.getResCountryStateBySearchTerm(this.searching.search_value)
  );
}

doRefresh(event) {

  this.resCountryStateStore.dispatch(new fromResCountryStateActions.RefreshHTTP({ domain: [], limit: 10, offset: 0, fields:ResCountryStateOdooFields }));

setTimeout(() => {
  console.log('Async operation has ended');
  event.target.complete();
}, 2000);


}

loadData(event) {
  this.resCountryStateStore
    .select(fromResCountryStateSelectors.selectTotalRecords)
    .pipe(take(1))
    .subscribe(totalRecords => {

      if (totalRecords || totalRecords === 0) {
        this.resCountryStateStore.dispatch(new fromResCountryStateActions.LoadHTTP({ domain: [], limit: 10, offset: totalRecords }));
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
