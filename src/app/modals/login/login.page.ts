import { Component, OnInit, ApplicationRef } from '@angular/core';
import { ConfigService } from 'src/providers/config/config.service';
import { ModalController, NavController } from '@ionic/angular';
import { SharedDataService } from 'src/providers/shared-data/shared-data.service';
import { ForgotPasswordPage } from '../forgot-password/forgot-password.page';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook/ngx';
import { LoadingService } from 'src/providers/loading/loading.service';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { OdooAPI } from 'src/providers/odoo/services/odooAPI';
import { Store } from '@ngrx/store';
import { ResPartnerState } from 'src/app/res-partner/store/state';
import * as fromResPartnerActions from 'src/app/res-partner/store/actions'
import * as fromResPartnerSelectors from 'src/app/res-partner/store/selectors'
import { AuthOdooData } from 'src/providers/odoo/models/ModelRemoteOdoo';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { AccountTypePage } from '../account-type/account-type.page';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})

export class LoginPage implements OnInit {

  formData = { db: 'baladi', email: '', password: '' };
  errorMessage = '';
  hideGuestLogin: true;
  destroyed$=new Subject<void>();
  
  constructor(
    public config: ConfigService,
    public modalCtrl: ModalController,
    public loading: LoadingService,
    public shared: SharedDataService,
    private fb: Facebook,
    private applicationRef: ApplicationRef,
    // public events: Events,
    private odooAPI: OdooAPI,
    public navCtrl: NavController,
    private googlePlus: GooglePlus,
    private resPartnerStore:Store<ResPartnerState>,
    private router:Router
  ) {
    // this.hideGuestLogin = navParams.get('hideGuestLogin');
    this.shared.currentOpenedModel = this;
  }

  ngOnInit() {

    this.resPartnerStore.select(fromResPartnerSelectors.selectLoading).pipe(takeUntil(this.destroyed$)).subscribe(loading=>{
      if(loading) this.loading.show()
      else if(!loading) this.loading.hide()
    })

    this.resPartnerStore.select(fromResPartnerSelectors.selectLoggedUser).subscribe(loggedUser=>{
      if(loggedUser && loggedUser.id )
      {
        this.dismiss();
      }

    }

  )

  }

  ngOnDidLeave(){
    this.destroyed$.next()
    this.destroyed$.complete()
  }

  /* login function to log user */
  login() {

    if (this.formData.email == "ahmad") {
      // customer
      this.navCtrl.navigateForward('/tabs/home')

    } else if(this.formData.email=="abed")
    {
      // driver
      this.navCtrl.navigateForward('/tabs-driver/home')

    } 
    else if(this.formData.email=="alaa")
    {
      // supplier
      this.navCtrl.navigateForward('/tabs-supply/home')

    }
    // this.errorMessage = '';
    // let authData:AuthOdooData=this.formData
    // this.resPartnerStore.dispatch(new fromResPartnerActions.AuthenticateHttp(authData))

  }

  async openAccountTypePage() {
    this.dismiss();
    const modal = await this.modalCtrl.create({
      component: AccountTypePage
    });
    return await modal.present();
  }

  async openForgetPasswordPage() {
    const modal = await this.modalCtrl.create({
      component: ForgotPasswordPage
    });
    return await modal.present();
  }

  facebookLogin() {
    this.fb.getLoginStatus().then((res: any) => {
      if (res.status == 'connected') {
        console.log("user connected already" + res.authResponse.accessToken);
        this.createAccount(res.authResponse.accessToken, 'fb');

      }
      else {
        console.log("USer Not login ");
        this.fb.login(['public_profile', 'email'])
          .then((res: FacebookLoginResponse) => {
            // this.alert.show('Logged into Facebook!' + JSON.stringify(res));
            console.log("successfully login ");
            this.createAccount(res.authResponse.accessToken, 'fb');
          })
          .catch(e => this.shared.showAlert('Error logging into Facebook' + JSON.stringify(e)));
      }
    }).catch(e => this.shared.showAlert('Error Check Login Status Facebook' + JSON.stringify(e)));
  }

  googleLogin() {
    this.loading.autoHide(500);
    this.googlePlus.login({})
      .then(res => {
        //  alert(JSON.stringify(res))
        this.createAccount(res, 'google');
      })
      .catch(err => this.shared.showAlert(JSON.stringify(err)));
  }
  //============================================================================================  
  //creating new account using function facebook or google details 
  createAccount(info, type) {
    // alert(info);
    this.loading.show();
    var dat: { [k: string]: any } = {};
    var url = '';
    if (type == 'fb') {
      url = 'facebookregistration';
      dat.access_token = info;
    }
    else {
      url = 'googleregistration';
      dat = info;
    }
    this.config.postHttp(url, dat).then((data: any) => {
      this.loading.hide();
      // alert("data get");
      if (data.success == 1) {
        this.shared.login(data.data[0]);
        //alert('login');
        this.shared.showAlertWithTitle("<h3>Your Account has been created successfully !</h3><ul><li>Your Email: "
          + "<span>" + this.shared.customerData.email + "</span>" + "</li><li>Your Password: "
          + "<span>" + this.shared.customerData.password + "</span>" +
          " </li></ul><p>You can login using this Email and Password.<br>You can change your password in Menu -> My Account</p>", "Account Information");
        //  $ionicSideMenuDelegate.toggleLeft();
        this.dismiss();

      }
      else if (data.success == 2) {
        //  alert("login with alreday");
        this.dismiss();
        this.shared.login(data.data[0]);
      }

    }, error => {
      this.loading.hide();
      this.shared.showAlert("error " + JSON.stringify(error));
      // console.log("error " + JSON.stringify(error));
    });
  };
  //close modal
  dismiss() {
    this.modalCtrl.dismiss();
  }


  guestLogin() {

    this.shared.orderDetails.guest_status = 1;
    // this.events.publish('openShippingAddressPage');
    this.navCtrl.navigateForward("/tabs/cart/public-partner-address");

    // this.navCtrl.navigateForward(this.config.currentRoute + "/public-partner-address");
    // this.navCtrl.navigateForward(this.config.currentRoute + "/order");
    // this.navCtrl.navigateRoot(this.config.currentRoute + "/thank-you");
    // this.navCtrl.navigateForward(this.config.currentRoute + "/order");
    this.dismiss();
  }

}
