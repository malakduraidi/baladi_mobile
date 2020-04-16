import { Component, OnInit } from "@angular/core";
import { IResPartner,ResPartner} from "../../models/res-partner";
import { ModalController } from "@ionic/angular";
import { Store } from "@ngrx/store";
import * as fromResPartnerActions from "../../store/actions";
import * as fromResPartnerStore from "../../store/state";


@Component({
  selector: "res-partner-detail",
  templateUrl: "res-partner-detail.html",
  styleUrls: ['./res-partner-detail.scss'],
  providers: [ResPartner]
})
export class ResPartnerDetailComponent implements OnInit {
   resPartner: IResPartner;
   valid: boolean;

  constructor(
    public modalCtrl: ModalController,
    private store: Store < fromResPartnerStore.ResPartnerState >
  ) {
    // let obj = this.navParams.get("obj");
    // this.resPartner= obj;

  }

  ngOnInit() {
    // dispatch load product id
  }

  onSubmitChange(value: {resPartner: IResPartner; valid: boolean
}) {
  // submit the form
  this.resPartner= value.resPartner;
  this.valid = value.valid;
  if (!this.valid) return;
  if (!this.resPartner.id) {
    // so it is new add
    this.store.dispatch(new fromResPartnerActions.AddHTTP({data:this.resPartner}));
  } else {
    //just update
    this.store.dispatch(new fromResPartnerActions.UpdateHTTP({ id: this.resPartner.id, data: this.resPartner}));
}
// since submit we can now dismiss this view
this.modalCtrl.dismiss(this.resPartner);
  }

onResPartnerChange(value: {resPartner: IResPartner; valid: boolean }) {
  this.resPartner= value.resPartner;
  this.valid = value.valid;
}

delete () {
  this.store.dispatch(new fromResPartnerActions.DeleteHTTP({ id: this.resPartner.id}));
// dispatch delete event
this.modalCtrl.dismiss();
}
closeModal() {
  this.modalCtrl.dismiss();

}
}
