import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from 'src/providers/config/config.service';
import { ModalController, Platform } from '@ionic/angular';
import { LoadingService } from 'src/providers/loading/loading.service';
import { SharedDataService } from 'src/providers/shared-data/shared-data.service';
import { TermServicesPage } from '../term-services/term-services.page';
import { RefundPolicyPage } from '../refund-policy/refund-policy.page';
import { PrivacyPolicyPage } from '../privacy-policy/privacy-policy.page';
import { OdooAPI } from 'src/providers/odoo/services/odooAPI';
import { Store } from '@ngrx/store';
import { ResPartnerState } from 'src/app/res-partner/store';
import * as fromResPartnerActions from 'src/app/res-partner/store/actions'
import * as fromResPartnerSelectors from 'src/app/res-partner/store/selectors'
import { RegisterOdooData } from 'src/providers/odoo/models/ModelRemoteOdoo';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
})

export class SignUpPage implements OnInit {

  formData = {
    customers_firstname: '',
    email: '',
    password: '',
    confirm_password: '',
    customers_telephone: '',
  };

  image = "";
  errorMessage = '';
  consumerKeyEncript: any;
  consumerSecretEncript: any;
  destroyed$=new Subject<void>();

  constructor(
    public http: HttpClient,
    public config: ConfigService,
    public modalCtrl: ModalController,
    public loading: LoadingService,
    public shared: SharedDataService,
    public platform: Platform,
    public odooAPI:OdooAPI,
    private resPartnerStore:Store<ResPartnerState>

  ) {
    this.shared.currentOpenedModel = this;
  }

  ngOnInit() {
    this.resPartnerStore.select(fromResPartnerSelectors.selectLoading).pipe(takeUntil(this.destroyed$)).subscribe(loading=>{
      if(loading) this.loading.show()
      else if(!loading) this.loading.hide()
    })
  }

  ngOnDidLeave(){
    this.destroyed$.next()
    this.destroyed$.complete()
  }

  registerUser() {
    
    this.errorMessage = '';
    let regData:RegisterOdooData=this.formData
    this.resPartnerStore.dispatch(new fromResPartnerActions.RegisterHttp(regData))

    // this.odooAPI.register(this.formData).subscribe(data => {
    //         this.loading.hide();
    //         this.shared.login(data);
    //         this.dismiss();
    //     }, err => {
    //       this.loading.hide();
    //       this.errorMessage = err.message;
    //     })
  }

  async  openPrivacyPolicyPage() {
    let modal = await this.modalCtrl.create({
      component: PrivacyPolicyPage
    });
    return await modal.present();
  }
  async  openTermServicesPage() {
    let modal = await this.modalCtrl.create({
      component: TermServicesPage
    });
    return await modal.present();
  }
  async  openRefundPolicyPage() {
    let modal = await this.modalCtrl.create({
      component: RefundPolicyPage
    });
    return await modal.present();
  }
  async dismiss() {
    this.modalCtrl.dismiss();
  }

}
