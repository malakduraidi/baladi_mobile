import { Component, OnInit, Input } from "@angular/core";
import { Observable, combineLatest, of } from "rxjs";
import {ResCountryStateOdooFields} from "../../models/res-country-state";
import { IResCountryState} from "../../models/res-country-state";
import {   ModalController } from "@ionic/angular";
import * as fromResCountryStateStore from "../../store/state";
import * as fromResCountryStateSelectors from "../../store/selectors";
import * as fromResCountryStateActions from "../../store/actions";
import { Store } from "@ngrx/store";
import { FormControl } from "@angular/forms";
import { take, debounceTime, switchMap } from 'rxjs/operators';

@Component({
  selector: "res-country-state-select-list",
  templateUrl: "res-country-state-select-list.html",
  styleUrls: ['./res-country-state-select-list.scss'],
  providers: [Store]
})

export class ResCountryStateSelectListComponent implements OnInit {
  searchControl: FormControl;
  @Input() countryId;

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

    // this.resCountryStates$ = this.resCountryStateStore.select<any>(fromResCountryStateSelectors.selectAllData);

    this.resCountryStates$ = combineLatest(
      this.resCountryStateStore.select(fromResCountryStateSelectors.selectAllData)
      , this.resCountryStateStore.select(fromResCountryStateSelectors.selectLoading)).
      pipe(switchMap(([resCountryStates, loading]) => {
        if (loading) 
        {
          return of([null,null,null,null])
        }

        else 
        {
          return of(resCountryStates)
        }

      }))

    if(this.getDomain()!=[])
    {
     this.resCountryStateStore.dispatch(new fromResCountryStateActions.RefreshHTTP({ domain: this.getDomain(), limit: 10, offset: 0, fields:ResCountryStateOdooFields }));
    }
    else 
    {
     this.resCountryStateStore.dispatch(new fromResCountryStateActions.LoadHTTP({ domain: this.getDomain(), limit: 10, offset: 0, fields:ResCountryStateOdooFields }));
    }

}

getDomain(){
  let domain=[]
  if(this.countryId)
  {
  return domain=[['country_id','=',this.countryId]]
  }
  else return domain
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
  this.resCountryStates$ = this.resCountryStateStore.select<any>(
    fromResCountryStateSelectors.getResCountryStateBySearchTerm(this.searching.search_value)
  );
}

doRefresh(event) {

  this.resCountryStateStore.dispatch(new fromResCountryStateActions.RefreshHTTP({ domain: this.getDomain, limit: 10, offset: 0, fields:ResCountryStateOdooFields }));

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
        this.resCountryStateStore.dispatch(new fromResCountryStateActions.LoadHTTP({ domain: this.getDomain(), limit: 10, offset: totalRecords }));
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
