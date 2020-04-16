import { Component, OnInit } from "@angular/core";
import { IResPartner,ResPartner} from "../../models/res-partner";
import { ModalController, NavController } from "@ionic/angular";
import { Store } from "@ngrx/store";
import * as fromResPartnerActions from "../../store/actions";
import * as fromResPartnerStore from "../../store/state";
import { ResCountrySelectListComponent } from 'src/app/res-country/containers/res-country-select-list/res-country-select-list';
import { ResCountryStateSelectListComponent } from 'src/app/res-country-state/containers/res-country-state-select-list/res-country-state-select-list';
import { IResCountryState } from 'src/app/res-country-state/models/res-country-state';
import { IResCountry } from 'src/app/res-country/models/res-country';
import { ConfigService } from 'src/providers/config/config.service';
import { Subject } from 'rxjs';


@Component({
  selector: "res-partner-public-partner",
  templateUrl: "res-partner-public-partner.html",
  styleUrls: ['./res-partner-public-partner.scss'],
  providers: [ResPartner]
})
export class ResPartnerPublicPartnerComponent implements OnInit {
   resPartner: IResPartner;
   valid: boolean;
  resCountry: IResCountry;
  resCountryState: IResCountryState;
  submitAttempt$: Subject<void> = new Subject<void>();


  constructor(
    public modalCtrl: ModalController,
    private store: Store < fromResPartnerStore.ResPartnerState >,
    private navCtrl:NavController,
    public config: ConfigService,
  ) {
    // let obj = this.navParams.get("obj");
    // this.resPartner= obj;

  }

  ngOnInit() {
    // dispatch load product id
  }

  submit() {
    this.submitAttempt$.next();
    if (!this.valid) return;
    if (!this.resPartner.id) {
      this.store.dispatch(new fromResPartnerActions.UpdatePublicPartner(this.resPartner));
      this.navCtrl.navigateForward(this.config.currentRoute + "/order");
    } else {
      //just update
      // this.store.dispatch(new fromResPartnerActions.UpdateHTTP({ id: this.resPartner.id, data: this.resPartner}));
    }


  }


  onResPartnerChange(value: { resPartner: IResPartner; valid: boolean }) {
    this.resPartner = value.resPartner;
    this.valid = value.valid;
  }

  delete() {
    this.store.dispatch(new fromResPartnerActions.DeleteHTTP({ id: this.resPartner.id }));
    // dispatch delete event
    this.modalCtrl.dismiss();
  }
  closeModal() {
    this.modalCtrl.dismiss();

  }

  selectCountry() {
    let modal = this.modalCtrl.create({
      component: ResCountrySelectListComponent
    });
    modal.then(mdl => {
      mdl.present()
      mdl.onDidDismiss().then((country_data: any) => {
        if (country_data) {
          this.resCountry = country_data.data
        }

      })

    })
  }
  selectCountryState(countryId) {

    let modal = this.modalCtrl.create({
      component: ResCountryStateSelectListComponent,
      componentProps: { countryId: countryId }
    });
    modal.then(mdl => {
      mdl.present()
      mdl.onDidDismiss().then((state_data: any) => {
        if (state_data) {
          this.resCountryState = state_data.data
        }

      })

    })
  }

}
