import { Component, OnInit } from '@angular/core';


import { ConfigService } from 'src/providers/config/config.service';
import { SharedDataService } from 'src/providers/shared-data/shared-data.service';
import { ModalController, NavController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { LoadingService } from 'src/providers/loading/loading.service';
import { Store, select } from '@ngrx/store';
import { ResPartnerState } from 'src/app/res-partner/store/state';
import { selectPublicPartner, UpdatePublicPartner } from 'src/app/res-partner/store';
import { take } from 'rxjs/operators';
import { ResPartner } from 'src/app/res-partner/models/res-partner';
@Component({
  selector: 'app-shipping-address',
  templateUrl: './shipping-address.page.html',
  styleUrls: ['./shipping-address.page.scss'],
})
export class ShippingAddressPage implements OnInit {

  shippingAddressData: { [k: string]: any } = {};

  constructor(
    public navCtrl: NavController,
    public config: ConfigService,
    public http: HttpClient,
    public shared: SharedDataService,
    public modalCtrl: ModalController,
    public loading: LoadingService,
    public partnerStore:Store<ResPartnerState>
    ) {
    if (this.shared.orderDetails.guest_status == 0) {
      this.getUserAddress();
    }
  }
  getUserAddress() {
    // if user is already registered
    // if not then  get public address
        // if exist then show the form to be edit also
    // if not exist then show empty form to insert in
    this.loading.show();
  }
  

  
  submit() {
    // this.navCtrl.navigateForward(this.config.currentRoute + "/billing-address");
    // if User is logged in 
    let resPartner=new ResPartner()
    this.partnerStore.dispatch(new UpdatePublicPartner(resPartner))
    this.navCtrl.navigateForward(this.config.currentRoute + "/order");
  }

  ngOnInit() {
  }

  ionViewWillEnter() {
    // suppose this page only open for public user

    // if there is public partner then show it 
    this.partnerStore.pipe(select(selectPublicPartner)).pipe(take(1)).subscribe(data=>{
      if(data)
      {
        // if there is data then load it to the form

      }

    })
    
    // else show empty form




    

  }


    // malak: return country of component 
    selectedCountry(country){
      this.shippingAddressData.country_id = country.id
    }

  
    // =========================================================================================== 
    // malak: return state of component 
    selectedCountryState(state){
      this.shippingAddressData.state_id = state.id
    }
}
