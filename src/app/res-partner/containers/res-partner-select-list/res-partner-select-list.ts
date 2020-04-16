import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import {ResPartnerOdooFields} from "../../models/res-partner";
import { IResPartner} from "../../models/res-partner";
import {  ModalController } from "@ionic/angular";
import * as fromResPartnerStore from "../../store/state";
import * as fromResPartnerSelectors from "../../store/selectors";
import * as fromResPartnerActions from "../../store/actions";
import { Store } from "@ngrx/store";
import { FormControl } from "@angular/forms";
import { take, debounceTime } from 'rxjs/operators';

@Component({
  selector: "res-partner-select-list",
  templateUrl: "res-partner-select-list.html",
  styleUrls: ['./res-partner-select-list.scss'],
  providers: [Store]
})

export class ResPartnerSelectListComponent implements OnInit {
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
  this.resPartners$ = this.resPartnerStore.select<any>(
    fromResPartnerSelectors.getResPartnerBySearchTerm(this.searching.search_value)
  );
}

doRefresh(event) {

  this.resPartnerStore.dispatch(new fromResPartnerActions.LoadHTTP({ domain: [], limit: 10, offset: 0, fields:ResPartnerOdooFields }));

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
