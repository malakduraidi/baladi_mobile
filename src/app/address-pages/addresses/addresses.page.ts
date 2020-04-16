import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { ConfigService } from 'src/providers/config/config.service';
import { SharedDataService } from 'src/providers/shared-data/shared-data.service';
import { ModalController, NavController } from '@ionic/angular';
import { LoadingService } from 'src/providers/loading/loading.service';
import { EditAddressPage } from 'src/app/modals/edit-address/edit-address.page';
import { Store } from '@ngrx/store';
import { ResPartnerState } from 'src/app/res-partner/store';
import * as fromResPartnerActions from 'src/app/res-partner/store/actions';
import { ResPartnerOdooFields, IResPartner } from 'src/app/res-partner/models/res-partner';
import * as fromResPartnerSelectors from 'src/app/res-partner/store/selectors'
import { takeUntil, take } from 'rxjs/operators';
import { Subject, Observable } from 'rxjs';
import { ResCountryState } from 'src/app/res-country/store';
import * as fromResCountryActions from 'src/app/res-country/store/actions';
import { ResCountryOdooFields } from 'src/app/res-country/models/res-country';
import { ResCountryStateOdooFields } from 'src/app/res-country-state/models/res-country-state';
import { ResCountryStateState } from 'src/app/res-country-state/store';
import * as fromResCountryStateActions from 'src/app/res-country-state/store/actions';

@Component({
  selector: 'app-addresses',
  templateUrl: './addresses.page.html',
  styleUrls: ['./addresses.page.scss'],
})

export class AddressesPage implements OnInit {

  allShippingAddress = new Array;

  offset: number=0;
  limit: number=50;
  domain: any=[];
  partner_id: number=0;
  destroyed$=new Subject<void>();
  allShippingAddresses$: Observable<any>;



  constructor(
    public navCtrl: NavController,
    public shared: SharedDataService,
    public modalCtrl: ModalController,
    public config: ConfigService,
    public storage: Storage,
    // public events: Events,
    private resPartnerStore:Store<ResPartnerState>,
    private resCountryStore:Store<ResCountryState>,
    private resCountryStateStore:Store<ResCountryStateState>,
    public loading: LoadingService, ) {

  }
  // ===========================================================================================  
  // malak: get all shipping addresses
  getAllAddress() {
    
    this.domain=[['parent_id','=',this.partner_id]]

    let data = {
      domain : this.domain,
      limit : this.limit,
      offset: this.offset,
      fields: ResPartnerOdooFields
    }

    this.resPartnerStore.dispatch(new fromResPartnerActions.LoadShippingAddressHttp(data))

  }

  //============================================================================================  
  // delete shipping address
  deleteAddress = function (id) {
    this.loading.show();
    var dat = {
      customers_id: this.shared.customerData.customers_id,
      address_book_id: id
    };
    this.config.postHttp('deleteshippingaddress', dat).then((data: any) => {
      this.loading.hide();
      if (data.success == 1) {
        this.getAllAddress();
      }
    }, function (response) {
      this.loading.hide();
      this.shared.toast("Error server not reponding");
    });
  };

  async openEditShippingPage(data) {

    let modal = await this.modalCtrl.create({
      component: EditAddressPage,
      componentProps: { data: data, type: 'update' }
    });
    modal.onDidDismiss().then(() => {
      // this.getAllAddress();
    })
    return await modal.present();
  }

  // =========================================================================================== 
  // malak: used to add new shipping address so will open the modal 
  async addShippingAddress() {
    let modal = await this.modalCtrl.create({
      component: EditAddressPage,
      componentProps: { type: 'add' }
    });
    modal.onDidDismiss().then(() => {
        // this.getAllAddress();
    })
    return await modal.present();
  }

  // =========================================================================================== 
  // malak : when enter view get all addreses
  ionViewWillEnter() {
    this.getAllAddress();
  }

  // =========================================================================================== 
  // malak: initialize the component
  ngOnInit() {

    // malak: get id of logged user
    this.resPartnerStore.select(fromResPartnerSelectors.selectLoggedUser).pipe(take(1)).subscribe(User=>{
      if(User){
        this.partner_id = User.id
      }
    })
    
    // malak: load all countries
    this.resCountryStore.dispatch(new fromResCountryActions.LoadHTTP({ domain: [], limit: 10, offset: 0, fields:ResCountryOdooFields }));

     // malak: load all countries states
    this.resCountryStateStore.dispatch(new fromResCountryStateActions.LoadHTTP({ domain: [], limit: 10, offset: 0, fields:ResCountryStateOdooFields }));

    // malak: get all logged user shipping addresses

    // this.resPartnerStore.select(fromResPartnerSelectors.selectShippingAddress(this.partner_id)).subscribe(result=>{
    //   if(result){
    //     // state_id, country_id , address ( street ) 
    //     this.allShippingAddress = result.slice()
    //   }
    // })

    this.allShippingAddresses$=this.shared.getAddressView()
    
    // malak: hide or show loading
    this.resPartnerStore.select(fromResPartnerSelectors.selectLoading).pipe(takeUntil(this.destroyed$)).subscribe(loading=>{
      if(loading) this.loading.show()
      else if(!loading){
        this.loading.hide()
      }
    })
  }

  // =========================================================================================== 
  // malak: end the component
  ionViewWillLeave(){
    this.destroyed$.next()
    this.destroyed$.complete()

  }

}
