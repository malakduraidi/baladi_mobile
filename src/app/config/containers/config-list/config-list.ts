import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import {Config, ConfigOdooFields} from "../../models/config";
import { IConfig} from "../../models/config";
import {   ModalController } from "@ionic/angular";
import * as fromConfigStore from "../../store/state";
import * as fromConfigSelectors from "../../store/selectors";
import * as fromConfigActions from "../../store/actions";

import { Store } from "@ngrx/store";
import {ConfigDetailComponent } from "../config-detail/config-detail";
import { FormControl } from "@angular/forms";
import { take, debounceTime } from 'rxjs/operators';


/**
 * Generated class for theConfigListComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: "config-list",
  templateUrl: "config-list.html",
  styleUrls: ['./config-list.scss'],
  providers: [Store]
})
export class ConfigListComponent implements OnInit {
  searchControl: FormControl;
  navData: { name: string, info: string };

  searching = {
    is_searching: false,
    search_value: "",
    search_param: ""
  };

  public configs$: Observable < IConfig[] >;
  public configSearchInput: string = "";

  constructor(
    // privateconfigActions:ConfigActions,
    private configStore: Store <fromConfigStore.ConfigState >,
    private modalCtrl: ModalController,

  ) {
    this.initSearch()
  }

  ngOnInit() {
    this.configs$ = this.configStore.select<any>(fromConfigSelectors.selectAllData);
    this.configStore.dispatch(new fromConfigActions.LoadHTTP({ domain: [], limit: 10, offset: 0, fields:ConfigOdooFields }));
}

showRecordDetail(obj?){
  if (!obj) {
    // initialize
    obj =Config.init();
  }

  const modal = this.modalCtrl.create({
    component:ConfigDetailComponent,
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
  this.configs$ = this.configStore.select<any>(
    fromConfigSelectors.getConfigBySearchTerm(this.searching.search_value)
  );
}

doRefresh(event) {

  this.configStore.dispatch(new fromConfigActions.RefreshHTTP({ domain: [], limit: 10, offset: 0, fields:ConfigOdooFields }));

setTimeout(() => {
  console.log('Async operation has ended');
  event.target.complete();
}, 2000);


}

loadData(event) {
  this.configStore
    .select(fromConfigSelectors.selectTotalRecords)
    .pipe(take(1))
    .subscribe(totalRecords => {

      if (totalRecords || totalRecords === 0) {
        this.configStore.dispatch(new fromConfigActions.LoadHTTP({ domain: [], limit: 10, offset: totalRecords }));
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
