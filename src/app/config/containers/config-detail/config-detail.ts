import { Component, OnInit } from "@angular/core";
import { IConfig,Config} from "../../models/config";
import { ModalController } from "@ionic/angular";
import { Store } from "@ngrx/store";
import * as fromConfigActions from "../../store/actions";
import * as fromConfigStore from "../../store/state";


@Component({
  selector: "config-detail",
  templateUrl: "config-detail.html",
  styleUrls: ['./config-detail.scss'],
  providers: [Config]
})
export class ConfigDetailComponent implements OnInit {
   config: IConfig;
   valid: boolean;

  constructor(
    // public navParams: NavParams,
    public modalCtrl: ModalController,
    private store: Store < fromConfigStore.ConfigState >
  ) {
    // let obj = this.navParams.get("obj");
    // this.config= obj;

  }

  ngOnInit() {
    // dispatch load product id
  }

  onSubmitChange(value: {config: IConfig; valid: boolean
}) {
  // submit the form
  this.config= value.config;
  this.valid = value.valid;
  if (!this.valid) return;
  if (!this.config.id) {
    // so it is new add
    this.store.dispatch(new fromConfigActions.AddHTTP({data:this.config}));
  } else {
    //just update
    this.store.dispatch(new fromConfigActions.UpdateHTTP({ id: this.config.id, data: this.config}));
}
// since submit we can now dismiss this view
this.modalCtrl.dismiss(this.config);
  }

onConfigChange(value: {config: IConfig; valid: boolean }) {
  this.config= value.config;
  this.valid = value.valid;
}

delete () {
  this.store.dispatch(new fromConfigActions.DeleteHTTP({ id: this.config.id}));
// dispatch delete event
this.modalCtrl.dismiss();
}
closeModal() {
  this.modalCtrl.dismiss();

}
}
