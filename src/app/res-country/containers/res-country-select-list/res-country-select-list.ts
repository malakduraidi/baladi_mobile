import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import {ResCountryOdooFields} from "../../models/res-country";
import { IResCountry} from "../../models/res-country";
import {   ModalController } from "@ionic/angular";
import * as fromResCountryStore from "../../store/state";
import * as fromResCountrySelectors from "../../store/selectors";
import * as fromResCountryActions from "../../store/actions";
import { Store } from "@ngrx/store";
import { FormControl } from "@angular/forms";
import { take, debounceTime } from 'rxjs/operators';

@Component({
  selector: "res-country-select-list",
  templateUrl: "res-country-select-list.html",
  styleUrls: ['./res-country-select-list.scss'],
  providers: [Store]
})

export class ResCountrySelectListComponent implements OnInit {
  searchControl: FormControl;
  navData: { name: string, info: string };

  searching = {
    is_searching: false,
    search_value: "",
    search_param: ""
  };

  public resCountrys$: Observable < IResCountry[] >;
  public resCountrySearchInput: string = "";

  constructor(
    // privateresCountryActions:ResCountryActions,
    private resCountryStore: Store <fromResCountryStore.ResCountryState >,
    private modalCtrl: ModalController,

  ) {
    // this.navData = this.navParams.get('modelData');
    this.initSearch()
  }

  ngOnInit() {
    this.resCountrys$ = this.resCountryStore.select<any>(fromResCountrySelectors.selectAllData);
    this.resCountryStore.dispatch(new fromResCountryActions.LoadHTTP({ domain: [], limit: 10, offset: 0, fields:ResCountryOdooFields }));
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
  this.resCountrys$ = this.resCountryStore.select<any>(
    fromResCountrySelectors.getResCountryBySearchTerm(this.searching.search_value)
  );
}

doRefresh(event) {

  this.resCountryStore.dispatch(new fromResCountryActions.LoadHTTP({ domain: [], limit: 10, offset: 0, fields:ResCountryOdooFields }));

setTimeout(() => {
  console.log('Async operation has ended');
  event.target.complete();
}, 2000);


}

loadData(event) {
  this.resCountryStore
    .select(fromResCountrySelectors.selectTotalRecords)
    .pipe(take(1))
    .subscribe(totalRecords => {

      if (totalRecords || totalRecords === 0) {
        this.resCountryStore.dispatch(new fromResCountryActions.LoadHTTP({ domain: [], limit: 10, offset: totalRecords }));
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
