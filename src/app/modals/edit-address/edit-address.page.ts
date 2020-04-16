import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { ConfigService } from 'src/providers/config/config.service';
import { LoadingService } from 'src/providers/loading/loading.service';
import { SharedDataService } from 'src/providers/shared-data/shared-data.service';
import { SelectZonesPage } from '../select-zones/select-zones.page';
import { SelectCountryPage } from '../select-country/select-country.page';
import { Store } from '@ngrx/store';
import { ResPartnerState } from 'src/app/res-partner/store';
import * as fromResPartnerActions from 'src/app/res-partner/store/actions';
import { ResPartnerOdooFields, IResPartner } from 'src/app/res-partner/models/res-partner';
import * as fromResPartnerSelectors from 'src/app/res-partner/store/selectors'
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { ResCountrySelectListComponent } from 'src/app/res-country/containers/res-country-select-list/res-country-select-list';


@Component({
  selector: 'app-edit-address',
  templateUrl: './edit-address.page.html',
  styleUrls: ['./edit-address.page.scss'],
})

export class EditAddressPage implements OnInit {
  shippingAddressData: { [k: string]: any } = {};
  data;
  type = 'update';
  partner_id: number=0;
  destroyed$=new Subject<void>();
  

  constructor(
    // public events: Events,
    public config: ConfigService,
    public modalCtrl: ModalController,
    public loading: LoadingService,
    public shared: SharedDataService,
    // public navParams: NavParams,
    private resPartnerStore:Store<ResPartnerState>,
  ) {

    // this.data = navParams.get('data');
    // this.type = navParams.get('type');

    if (this.type != 'add') {
      this.shippingAddressData.street = this.data.street;
      this.shippingAddressData.country_id = this.data.country.id;
      this.shippingAddressData.state_id = this.data.state.id;
    } else{
      this.shippingAddressData.street = "";
      this.shippingAddressData.country_id = "";
      this.shippingAddressData.state_id = ""; 
      this.shippingAddressData.type = 'delivery'
    }
  }

  // ============================================================================================  
  // malak: close modal
  dismiss() {
    this.modalCtrl.dismiss();
  }

  // ============================================================================================  
  // malak: adding shipping address of the user
  addShippingAddress = function (form) {

    this.shippingAddressData.parent_id = this.partner_id
    var addressData = this.shippingAddressData;

    this.resPartnerStore.dispatch(new fromResPartnerActions.AddNewShippingAddressHttp(addressData))

    this.dismiss();

  };

  // ============================================================================================  
  // malak: update shipping address of the user
  updateShippingAddress = function (form) {

    var addressData = {
      "id" : this.data.id,
      "data" : this.shippingAddressData};

    this.resPartnerStore.dispatch(new fromResPartnerActions.UpdateShippingAddressHttp(addressData))

    this.dismiss();

  };

  // =========================================================================================== 
  // malak: initialize the component
  ngOnInit() {
    // malak: get id of logged user
    this.resPartnerStore.select(fromResPartnerSelectors.selectLoggedUser).pipe().subscribe(User=>{
      if(User){
        this.partner_id = User.id
      }
    })

    // this.resPartnerStore.select(fromResPartnerSelectors.selectLoading).pipe(takeUntil(this.destroyed$)).subscribe(loading=>{
    //   if(loading) this.loading.show()
    //   else if(!loading){
    //     this.loading.hide()
    //     this.dismiss();
    //   }
    // })

  }
  
  // =========================================================================================== 
  // malak: end the component 
  ionViewWillLeave() {
    this.destroyed$.next()
    this.destroyed$.complete()
  }

  // =========================================================================================== 

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
