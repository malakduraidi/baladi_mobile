import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import {ResPartner, ResPartnerOdooFields} from "../../models/res-partner";
import { IResPartner} from "../../models/res-partner";
import {  ModalController } from "@ionic/angular";
import * as fromResPartnerStore from "../../store/state";
import * as fromResPartnerSelectors from "../../store/selectors";
import * as fromResPartnerActions from "../../store/actions";

import { Store } from "@ngrx/store";
import {ResPartnerDetailComponent } from "../res-partner-detail/res-partner-detail";
import { FormControl } from "@angular/forms";
import { take, debounceTime } from 'rxjs/operators';


/**
 * Generated class for theResPartnerListComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: "res-partner-list",
  templateUrl: "res-partner-list.html",
  styleUrls: ['./res-partner-list.scss'],
  providers: [Store]
})
export class ResPartnerListComponent implements OnInit {
  searchControl: FormControl;
  navData: { name: string, info: string };

  searching = {
    is_searching: false,
    search_value: "",
    search_param: ""
  };

  public resPartners$: Observable < IResPartner[] >;
  public resPartnerSearchInput: string = "";

  constructor(
    // privateresPartnerActions:ResPartnerActions,
    private resPartnerStore: Store <fromResPartnerStore.ResPartnerState >,
    private modalCtrl: ModalController,

  ) {
    this.initSearch()
  }

  ngOnInit() {
    this.resPartners$ = this.resPartnerStore.select<any>(fromResPartnerSelectors.selectAllData);
    this.resPartnerStore.dispatch(new fromResPartnerActions.LoadHTTP({ domain: [], limit: 10, offset: 0, fields:ResPartnerOdooFields }));
}

showRecordDetail(obj?){
  if (!obj) {
    // initialize
    obj =ResPartner.init();
  }

  const modal = this.modalCtrl.create({
    component:ResPartnerDetailComponent,
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
  this.resPartners$ = this.resPartnerStore.select<any>(
    fromResPartnerSelectors.getResPartnerBySearchTerm(this.searching.search_value)
  );
}

doRefresh(event) {

  this.resPartnerStore.dispatch(new fromResPartnerActions.RefreshHTTP({ domain: [], limit: 10, offset: 0, fields:ResPartnerOdooFields }));

setTimeout(() => {
  console.log('Async operation has ended');
  event.target.complete();
}, 2000);


}

loadData(event) {
  this.resPartnerStore
    .select(fromResPartnerSelectors.selectTotalRecords)
    .pipe(take(1))
    .subscribe(totalRecords => {

      if (totalRecords || totalRecords === 0) {
        this.resPartnerStore.dispatch(new fromResPartnerActions.LoadHTTP({ domain: [], limit: 10, offset: totalRecords }));
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
