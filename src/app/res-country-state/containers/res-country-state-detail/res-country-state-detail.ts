import { Component, OnInit } from "@angular/core";
import { IResCountryState,ResCountryState} from "../../models/res-country-state";
import {ModalController } from "@ionic/angular";
import { Store } from "@ngrx/store";
import * as fromResCountryStateActions from "../../store/actions";
import * as fromResCountryStateStore from "../../store/state";


@Component({
  selector: "res-country-state-detail",
  templateUrl: "res-country-state-detail.html",
  styleUrls: ['./res-country-state-detail.scss'],
  providers: [ResCountryState]
})
export class ResCountryStateDetailComponent implements OnInit {
   resCountryState: IResCountryState;
   valid: boolean;

  constructor(
    public modalCtrl: ModalController,
    private store: Store < fromResCountryStateStore.ResCountryStateState >
  ) {
    // this.resCountryState= obj;

  }

  ngOnInit() {
    // dispatch load product id
  }

  onSubmitChange(value: {resCountryState: IResCountryState; valid: boolean
}) {
  // submit the form
  this.resCountryState= value.resCountryState;
  this.valid = value.valid;
  if (!this.valid) return;
  if (!this.resCountryState.id) {
    // so it is new add
    this.store.dispatch(new fromResCountryStateActions.AddHTTP({data:this.resCountryState}));
  } else {
    //just update
    this.store.dispatch(new fromResCountryStateActions.UpdateHTTP({ id: this.resCountryState.id, data: this.resCountryState}));
}
// since submit we can now dismiss this view
this.modalCtrl.dismiss(this.resCountryState);
  }

onResCountryStateChange(value: {resCountryState: IResCountryState; valid: boolean }) {
  this.resCountryState= value.resCountryState;
  this.valid = value.valid;
}

delete () {
  this.store.dispatch(new fromResCountryStateActions.DeleteHTTP({ id: this.resCountryState.id}));
// dispatch delete event
this.modalCtrl.dismiss();
}
closeModal() {
  this.modalCtrl.dismiss();

}
}
