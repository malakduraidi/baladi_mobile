import { NgModule } from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AppVersion } from '@ionic-native/app-version/ngx';
import { SpinnerDialog } from '@ionic-native/spinner-dialog/ngx';
import { IonicStorageModule } from '@ionic/storage';
import { ThemeableBrowser } from '@ionic-native/themeable-browser/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { NativeGeocoder } from '@ionic-native/native-geocoder/ngx';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { AdMobFree } from '@ionic-native/admob-free/ngx';
import { Network } from '@ionic-native/network/ngx';
import { Deeplinks } from '@ionic-native/deeplinks/ngx';
import { HTTP } from '@ionic-native/http/ngx';
import { EmailComposer } from '@ionic-native/email-composer/ngx';
// Providers Import
import { ConfigService } from '../providers/config/config.service';
import { SharedDataService } from 'src/providers/shared-data/shared-data.service';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
// For Translation

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { HttpClientModule, HttpClient } from '@angular/common/http';
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
//for side menu expandable
import { MenuComponentComponent } from '../components/menu-component/menu-component.component';
import { Facebook } from '@ionic-native/facebook/ngx';
import { FormsModule } from '@angular/forms';
import { PipesModule } from 'src/pipes/pipes.module';
import { RefundPolicyPageModule } from './modals/refund-policy/refund-policy.module';
import { CurrencyListPageModule } from './modals/currency-list/currency-list.module';
import { LoginPageModule } from './modals/login/login.module';
import { SignUpPageModule } from './modals/sign-up/sign-up.module';
import { ForgotPasswordPageModule } from './modals/forgot-password/forgot-password.module';
import { PrivacyPolicyPageModule } from './modals/privacy-policy/privacy-policy.module';
import { SelectCountryPageModule } from './modals/select-country/select-country.module';
import { SelectZonesPageModule } from './modals/select-zones/select-zones.module';
import { TermServicesPageModule } from './modals/term-services/term-services.module';
import { LanguagePageModule } from './modals/language/language.module';
import { BlankModalPageModule } from './modals/blank-modal/blank-modal.module';
import { PhotoViewer } from '@ionic-native/photo-viewer/ngx';
import { Md5 } from 'ts-md5/dist/md5';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
import { FCM } from '@ionic-native/fcm/ngx';
import { Device } from '@ionic-native/device/ngx';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { EditAddressPageModule } from './modals/edit-address/edit-address.module';
import { PayPal } from '@ionic-native/paypal/ngx';
import { Stripe } from '@ionic-native/stripe/ngx';
import { RouteReuseStrategy } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { AppSettingModule } from 'src/stores/app-setting/app-setting.module';
import { DBModule } from 'src/providers/db/db.module';
import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from './reducers';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from 'src/environments/environment';
import { TimeService } from 'src/providers/time.service';
import { OdooAPI } from 'src/providers/odoo/services/odooAPI';
import { ConfigModule } from './config/config.module';
import { ResPartnerModule } from './res-partner/res-partner.module';
import { ProductTemplateModule } from './product-template/product-template.module';
import { ProductCategoryModule } from './product-category/product-category.module';
import { NgrxRouterStoreModule } from './store/reducers/router/ngrx-router.module';
import { ProductMainSliderModule } from './product-main-slider/product-main-slider.module';
import { SaleOrderModule } from './sale-order/sale-order.module';
import { SaleOrderLineModule } from './sale-order-line/sale-order-line.module';
import { ResCountryModule } from './res-country/res-country.module';
import { ResCountryStateModule } from './res-country-state/res-country-state.module';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponentComponent,
  ],
  entryComponents: [
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot({
      mode: 'md'
    }),
    DBModule,
    IonicStorageModule.forRoot(),
    StoreModule.forRoot(reducers, { metaReducers }),
    StoreDevtoolsModule.instrument({
      maxAge: 200, // Retains last 200 states
      logOnly: environment.production // Restrict extension to log-only mode
    }),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    EffectsModule.forRoot([]),
    AppSettingModule,
    AppRoutingModule,
    HttpClientModule,
    PipesModule,
    FormsModule,
    BlankModalPageModule,
    LanguagePageModule,
    RefundPolicyPageModule,
    CurrencyListPageModule,
    LoginPageModule,
    SignUpPageModule,
    ForgotPasswordPageModule,
    PrivacyPolicyPageModule,
    TermServicesPageModule,
    SelectCountryPageModule,
    SelectZonesPageModule,
    EditAddressPageModule,
    ConfigModule,
    ResPartnerModule,
    ProductTemplateModule,
    ProductCategoryModule,
    ProductMainSliderModule,
    SaleOrderModule,
    SaleOrderLineModule,
    ResCountryModule,
    ResCountryStateModule,
    NgrxRouterStoreModule,
  ],
  providers: [
    StatusBar,
    ConfigService,
    SharedDataService,
    SplashScreen,
    AppVersion,
    SpinnerDialog,
    // OneSignal,
    ThemeableBrowser,
    Geolocation,
    NativeGeocoder,
    SocialSharing,
    InAppBrowser,
    AdMobFree,
    Network,
    Deeplinks,
    HTTP,
    Facebook,
    EmailComposer,
    PhotoViewer,
    Md5,
    LocalNotifications,
    FCM,
    Device,
    GooglePlus,
    PayPal,
    Stripe,
    TimeService,
    OdooAPI,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
