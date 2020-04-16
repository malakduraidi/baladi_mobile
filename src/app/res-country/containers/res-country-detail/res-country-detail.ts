import { Component, OnInit } from "@angular/core";
import { IResCountry,ResCountry} from "../../models/res-country";
import { ModalController } from "@ionic/angular";
import { Store } from "@ngrx/store";
import * as fromResCountryActions from "../../store/actions";
import * as fromResCountryStore from "../../store/state";


@Component({
  selector: "res-country-detail",
  templateUrl: "res-country-detail.html",
  styleUrls: ['./res-country-detail.scss'],
  providers: [ResCountry]
})
export class ResCountryDetailComponent implements OnInit {
   resCountry: IResCountry;
   valid: boolean;

  constructor(
    public modalCtrl: ModalController,
    private store: Store < fromResCountryStore.ResCountryState >
  ) {
    this.resCountry= obj;

  }

  ngOnInit() {
    // dispatch load product id
  }

  onSubmitChange(value: {resCountry: IResCountry; valid: boolean
}) {
  // submit the form
  this.resCountry= value.resCountry;
  this.valid = value.valid;
  if (!this.valid) return;
  if (!this.resCountry.id) {
    // so it is new add
    this.store.dispatch(new fromResCountryActions.AddHTTP({data:this.resCountry}));
  } else {
    //just update
    this.store.dispatch(new fromResCountryActions.UpdateHTTP({ id: this.resCountry.id, data: this.resCountry}));
}
// since submit we can now dismiss this view
this.modalCtrl.dismiss(this.resCountry);
  }

onResCountryChange(value: {resCountry: IResCountry; valid: boolean }) {
  this.resCountry= value.resCountry;
  this.valid = value.valid;
}

delete () {
  this.store.dispatch(new fromResCountryActions.DeleteHTTP({ id: this.resCountry.id}));
// dispatch delete event
this.modalCtrl.dismiss();
}
closeModal() {
  this.modalCtrl.dismiss();

}
}
