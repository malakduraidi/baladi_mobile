
import { Injectable, ApplicationRef, NgZone } from '@angular/core';
import { ConfigService } from '../config/config.service';

import { Storage } from '@ionic/storage';
import { HttpClient } from '@angular/common/http';
import { LoadingService } from '../loading/loading.service';
import { Platform, ToastController, AlertController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { AppVersion } from '@ionic-native/app-version/ngx';
import { FCM } from '@ionic-native/fcm/ngx';
import { Device } from '@ionic-native/device/ngx';
import { SaleOrderLineState } from 'src/app/sale-order-line/store/state';
import * as fromSaleOrderLineSelectors  from 'src/app/sale-order-line/store/selectors'; 
import * as fromSaleOrderLineActions  from 'src/app/sale-order-line/store/actions'; 
import { SaleOrderLine } from 'src/app/sale-order-line/models/sale-order-line';
import { take, map, switchMap } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import { ResPartnerState } from 'src/app/res-partner/store';
import * as fromResPartnerActions from 'src/app/res-partner/store/actions'
import * as fromResPartnerSelectors from 'src/app/res-partner/store/selectors'

import { ResCountryState } from 'src/app/res-country/store';
import * as fromResCountryActions from 'src/app/res-country/store/actions'
import * as fromResCountrySelectors from 'src/app/res-country/store/selectors'

import { ResCountryStateState } from 'src/app/res-country-state/store';
import * as fromResCountryStateActions from 'src/app/res-country-state/store/actions'
import * as fromResCountryStateSelectors from 'src/app/res-country-state/store/selectors'






import { ConfigState } from 'src/app/config/store';
import * as fromConfigActions from 'src/app/config/store/actions'
import { SettingState } from 'src/stores/app-setting/reducers/app-setting.reducer';
import * as settingActions from 'src/stores/app-setting/actions';
import { ProductTemplateState } from 'src/app/product-template/store/state';
import * as fromProductTemplateActions from 'src/app/product-template/store/actions';
import * as fromProductTemplateSelectors from 'src/app/product-template/store/selectors';
import { ProductTemplate, ProductTemplateOdooFields } from 'src/app/product-template/models/product-template';
import { ResPartner } from 'src/app/res-partner/models/res-partner';
import { Observable, combineLatest } from 'rxjs';


@Injectable()
export class SharedDataService {

  public banners = [];
  public tab1 = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
  public tab2 = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
  public tab3 = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
  public flashSaleProducts = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
  public allCategories: any = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
  public categories: any = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
  public subCategories: any = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
  public customerData: { [k: string]: any } = {};
  public recentViewedProducts = new Array();
  public cartProducts = new Array();
  public privacyPolicy = "";
  public termServices = "";
  public refundPolicy = "";
  public aboutUs = "";
  public cartquantity = 0;
  public wishList = new Array();
  public tempdata: { [k: string]: any } = {};
  public dir = "ltr";
  public selectedFooterPage = "HomePage";
  public currentOpenedModel: any = null;

  public orderDetails = {
    guest_status: 0,
    email: "",
    tax_zone_id: "",
    delivery_firstname: "",
    delivery_lastname: "",
    delivery_state: "",
    delivery_city: "",
    delivery_postcode: "",
    delivery_zone: "",
    delivery_country: "",
    delivery_country_id: "",
    delivery_street_address: "",
    delivery_country_code: "",
    delivery_phone: "",

    billing_firstname: "",
    billing_lastname: "",
    billing_state: "",
    billing_city: "",
    billing_postcode: "",
    billing_zone: "",
    billing_country: "",
    billing_country_id: "",
    billing_street_address: "",
    billing_country_code: "",
    billing_phone: "",
    total_tax: '',
    shipping_cost: '',
    shipping_method: '',
    payment_method: '',
    comments: ''
  };
  public translationListArray = [];
  public singleProductPageData = [];
  public singlePostData: any;
  myOrderDetialPageData: any;
  lab = false;
  public missingValues = [];
  resPartners$: Observable<ResPartner[]>;
  productTempaltes$: Observable<ProductTemplate[]>;
  cart$: Observable<SaleOrderLine[]>;
  constructor(
    public config: ConfigService,
    public httpClient: HttpClient,
    public storage: Storage,
    public loading: LoadingService,
    // public events: Events,
    public platform: Platform,
    public device: Device,
    public fcm: FCM,
    public alertCtrl: AlertController,
    public appVersion: AppVersion,
    private toastCtrl: ToastController,
    public splashScreen: SplashScreen,
    private saleOrderLineStore:Store<SaleOrderLineState>,
    private settingStore: Store<SettingState>,
    private resPartnerStore:Store<ResPartnerState>,
    private productTemplateStore:Store<ProductTemplateState>,
    private configStore:Store<ConfigState>,
    private resCountryStore:Store<ResCountryState>,
    private resCountryStateStore:Store<ResCountryStateState>,


  ) {
    setTimeout(() => {
      this.lab = true;
    }, 10000);
    this.platform.ready().then(() => {
      // this.config.getHttp("applabels3?lang=" + this.config.langId).then((data: any) => {
      //   this.translationListArray = data;
      // });
    });
    // events.subscribe('settingsLoaded', () => {
      
    //   this.onStart();
    // });

    //getting recent viewed items from local storage
    storage.get('customerData').then((val) => {
      if (val != null || val != undefined) this.customerData = val;
    });
    //getting recent viewed items from local storage
    storage.get('recentViewedProducts').then((val) => {
      if (val != null) this.recentViewedProducts = val;
    });
    if (this.platform.is('cordova')) {
    }
    //getting recent viewed items from local storage
    storage.get('cartProducts').then((val) => {
      if (val != null) this.cartProducts = val;
      this.cartTotalItems();
      // console.log(val);
    });


    //---------------- end -----------------


  }
  public splashScreenHide = false;
  hideSplashScreen() {
    if (this.platform.is('cordova')) {
      if (!this.splashScreenHide) { this.splashScreen.hide(); this.splashScreenHide = true; }
    }
  }
  onStart() {
    //getting all banners
    this.config.getHttp('getbanners').then((data: any) => {
      this.banners = data.data;
    });
    //getting tab 1
    let data: { [k: string]: any } = {};
    if (this.customerData.customers_id != null)
      data.customers_id = this.customerData.customers_id;
    data.page_number = 0;
    data.language_id = this.config.langId;
    data.currency_code = this.config.currecnyCode;

    data.type = 'flashsale';
    
    this.config.postHttp('getallproducts', data).then((data: any) => {
      this.flashSaleProducts = data.product_data
    });
    data.type = 'top seller';
    
    this.config.postHttp('getallproducts', data).then((data: any) => {
      this.tab1 = data.product_data
    });
    //getting tab 2
    data.type = 'special';
    
    this.config.postHttp('getallproducts', data).then((data: any) => {
      this.tab2 = data.product_data
    });
    //getting tab 3
    data.type = 'most liked';
    
    this.config.postHttp('getallproducts', data).then((data: any) => {
      this.tab3 = data.product_data
    });
    //getting all allCategories
    this.config.postHttp('allcategories', data).then((data: any) => {
      if (this.allCategories[0] == 1) {
        this.allCategories = [];
        this.categories = [];
        this.subCategories = [];
      }
      for (let value of data.data) {

        value.id = value.categories_id;
        value.name = value.categories_name;

        this.allCategories.push(value);

        if (value.parent_id == 0)
          this.categories.push(value);
        else
          this.subCategories.push(value);
      }
    });

    //getting allpages from the server
    this.config.postHttp('getallpages', { language_id: this.config.langId, currency_code: this.config.currecnyCode }).then((data: any) => {
      if (data.success == 1) {
        let pages = data.pages_data;
        for (let value of pages) {
          if (value.slug == 'privacy-policy') this.privacyPolicy = value.description;
          if (value.slug == 'term-services') this.termServices = value.description;
          if (value.slug == 'refund-policy') this.refundPolicy = value.description;
          if (value.slug == 'about-us') this.aboutUs = value.description;
        }
      }
    });
  }
  //adding into recent array products
  addToRecent(p) {
    let found = false;
    for (let value of this.recentViewedProducts) {
      if (value.products_id == p.products_id) { found = true; }
    }
    if (found == false) {
      this.recentViewedProducts.push(p);
      this.storage.set('recentViewedProducts', this.recentViewedProducts);
    }
  }
  //removing from recent array products
  removeRecent(p) {
    this.recentViewedProducts.forEach((value, index) => {
      if (value.products_id == p.products_id) {
        this.recentViewedProducts.splice(index, 1);
        this.storage.set('recentViewedProducts', this.recentViewedProducts);
      }
    });
    // this.events.publish('recentDeleted');
  }

  loadDbInitialData(){
      this.settingStore.dispatch(new settingActions.LoadSetting());
      
      this.resPartnerStore.dispatch(new fromResPartnerActions.LoadDB());

      this.configStore.dispatch(new fromConfigActions.LoadDB());

      this.resPartnerStore.dispatch(new fromResPartnerActions.LoadloggedUserDB())
      this.saleOrderLineStore.dispatch(new fromSaleOrderLineActions.LoadCartDB())



  }
  cartTotalItems_v2(){

    return this.saleOrderLineStore.select(fromSaleOrderLineSelectors.selectAllDataCart)
    .pipe(map(data=>{
      if(!data) return 0
      else 
      return data.length
    }))
  }

  getCart(){
    return this.saleOrderLineStore.select(fromSaleOrderLineSelectors.selectAllDataCart)
  }
  getPublicPartner() {
    return this.resPartnerStore.select(fromResPartnerSelectors.selectPublicPartner)
  }
  getCartView() {
    this.cart$ = this.saleOrderLineStore.select(fromSaleOrderLineSelectors.selectAllDataCart)
    this.productTempaltes$ = this.productTemplateStore.select(fromProductTemplateSelectors.selectAllData)
    return combineLatest(this.cart$, this.productTempaltes$).pipe(map(([cartOrderLines, products]) => {
      let cartView = []

      cartOrderLines.map(orderLineCart => {
        let orderLine = Object.assign({}, orderLineCart)
        let filteredProducts = products.filter(product => orderLine.product_id == product.id)
        if (filteredProducts.length > 0) {
          // then we have the product in the store
          orderLine['product'] = filteredProducts[0]
          cartView.push(orderLine)
        }
        else {
          // product not in store try to fetch it from http
          this.productTemplateStore.dispatch(new fromProductTemplateActions.LoadHTTP({ domain: [['id', '=', orderLine.product_id]], limit: 1, offset: 0, fields: ProductTemplateOdooFields }))
        }

      })
      return cartView

    }))


    // return this.cart$.pipe(map(cartOrderLines=>{
    //   cartOrderLines.map(orderLine=>{
    //     debugger;
    //     this.productTemplateStore
    //     .select(fromProductTemplateSelectors.selectById(orderLine.product_id))
    //     .pipe(take(1)).subscribe(product=>{
    //     debugger;
    //       if(!product)
    //       {
    //         // product not exist fetch it from the server
    //         this.productTemplateStore.dispatch(new fromProductTemplateActions.LoadHTTP({
    //           domain:[['id','=',orderLine.product_id]],limit:1,offset:0
    //         }))

    //       }
    //       else {
    //         orderLine['product']=product
    //         cartView.push(orderLine)
    //       }

    //     })


    //   })

    //   return cartView
    // }))
    //  this.productTemplateStore.dispatch(new fromProductTemplateActions.LoadHTTP({
    //               domain:[['id','=',orderLine.product_id]],limit:1,offset:0
    //             })
    // this.resPartners$=this.resPartnerStore.select(fromResPartnerSelectors.selectByIds(ids))
    // this.productTempaltes$=this.productTemplateStore.select(fromProductTemplateSelectors.selectByIds)
    // return combineLatest(this.cart$,this.resPartners$,this.productTempaltes$)
    // .pipe(map(data=>{
    //   debugger;
    //   return cartView
    // }))
  }


  addToCart_v2(product) {
    // check if product already in cart to update
    this.saleOrderLineStore.
      select(fromSaleOrderLineSelectors.selectByProductIdOrderId(product.id, null))
      .pipe(take(1))
      .subscribe(cartOrder => {
        if (cartOrder && cartOrder.length > 0) {
          // exist 
          // then update
          let cartOrderData = Object.assign({}, cartOrder[0])
          cartOrderData.product_uom_qty++
          cartOrderData.price_total += product.list_price
          // TODO removed client_id for now
          delete cartOrderData['client_id']

          this.saleOrderLineStore.dispatch(new fromSaleOrderLineActions.UpdateToCartDb(cartOrderData))

        }
        else {
          // does not exist 
          // then insert
          let saleOrderLine = new SaleOrderLine()
          saleOrderLine.product_id = product.id
          saleOrderLine.product_uom_qty = 1
          saleOrderLine.price_total = product.list_price
          this.saleOrderLineStore.dispatch(new fromSaleOrderLineActions.AddToCartDb(saleOrderLine))
        }

      })

  }

  removeFromCart_v2(product) {
    // check if product already in cart to update
    this.saleOrderLineStore.
      select(fromSaleOrderLineSelectors.selectByProductIdOrderId(product.id, null))
      .pipe(take(1))
      .subscribe(cartOrder => {
        if (cartOrder && cartOrder.length > 0) {
          // exist 
          // then update
          if (cartOrder[0].product_uom_qty > 1) {
            let cartOrderData = Object.assign({}, cartOrder[0])
            cartOrderData.product_uom_qty--
            cartOrderData.price_total -= product.list_price
            // TODO removed client_id for now
            delete cartOrderData['client_id']

            this.saleOrderLineStore.dispatch(new fromSaleOrderLineActions.UpdateToCartDb(cartOrderData))
          }

        }
        else {
          // does not exist 
          // then insert
          let saleOrderLine = new SaleOrderLine()
          saleOrderLine.product_id = product.id
          saleOrderLine.product_uom_qty = 1
          saleOrderLine.price_total = product.list_price
          this.saleOrderLineStore.dispatch(new fromSaleOrderLineActions.AddToCartDb(saleOrderLine))
        }

      })

  }
  removeTheCart_v2(cart) {
    this.saleOrderLineStore.dispatch(new fromSaleOrderLineActions.RemoveFromCartDb(cart))
  }
  // removeTheCart_v2(product){
  //     // check if product already in cart to update
  //     this.saleOrderLineStore.
  //     select(fromSaleOrderLineSelectors.selectByProductIdOrderId(product.id,null))
  //     .pipe(take(1))
  //     .subscribe(cartOrder=>{
  //       if(cartOrder && cartOrder.length>0)
  //       {
  //         // exist 
  //         // then update
  //         if(cartOrder[0].product_uom_qty>1)
  //         {
  //         let cartOrderData=Object.assign({},cartOrder[0])
  //         cartOrderData.product_uom_qty--
  //         cartOrderData.price_total-=cartOrderData.price_total
  //         // TODO removed client_id for now
  //         delete cartOrderData['client_id']

  //         this.saleOrderLineStore.dispatch(new fromSaleOrderLineActions.UpdateToCartDb(cartOrderData))
  //         }

  //       }
  //       else {
  //         // does not exist 
  //         // then insert
  //         let saleOrderLine=new SaleOrderLine()
  //         saleOrderLine.product_id=product.id
  //         saleOrderLine.product_uom_qty=1
  //         saleOrderLine.price_total=product.list_price
  //         this.saleOrderLineStore.dispatch(new fromSaleOrderLineActions.AddToCartDb(saleOrderLine))
  //       }

  //     })

  //   }


  //adding into cart array products
  addToCart(product, attArray) {

    // console.log(this.cartProducts);
    let attributesArray = attArray;
    if (attArray.length == 0 || attArray == null) {
      //console.log("filling attirbutes");
      attributesArray = [];
      if (product.attributes != undefined) {
        // console.log("filling product default attibutes");
        product.attributes.forEach((value, index) => {
          let att = {
            products_options_id: value.option.id,
            products_options: value.option.name,
            products_options_values_id: value.values[0].id,
            options_values_price: value.values[0].price,
            price_prefix: value.values[0].price_prefix,
            products_options_values: value.values[0].value,
            name: value.values[0].value + ' ' + value.values[0].price_prefix + value.values[0].price + " " + this.config.currency
          };
          attributesArray.push(att);
        });
      }
    }
    //  if(checkDublicateService(product.products_id,$rootScope.cartProducts)==false){

    let pprice = product.products_price
    let on_sale = false;
    if (product.discount_price != null) {
      pprice = product.discount_price;
      on_sale = true;
    }
    if (product.flash_price != null) {
      pprice = product.flash_price;
    }
    // console.log("in side producs detail");
    // console.log(attributesArray);
    // console.log(this.cartProducts);
    let finalPrice = this.calculateFinalPriceService(attributesArray) + parseFloat(pprice);
    let obj = {
      cart_id: product.products_id + this.cartProducts.length,
      products_id: product.products_id,
      manufacture: product.manufacturers_name,
      customers_basket_quantity: 1,
      final_price: finalPrice,
      model: product.products_model,
      categories: product.categories,
      // categories_id: product.categories_id,
      // categories_name: product.categories_name,
      // quantity: product.products_quantity,
      weight: product.products_weight,
      on_sale: on_sale,
      unit: product.products_weight_unit,
      image: product.products_image,

      attributes: attributesArray,
      products_name: product.products_name,
      price: pprice,
      subtotal: finalPrice,
      total: finalPrice
    }
    this.cartProducts.push(obj);
    this.storage.set('cartProducts', this.cartProducts);

    this.cartTotalItems();

    // console.log(this.cartProducts);
    //console.log(this.cartProducts);
  }
  //removing from recent array products
  removeCart(p) {
    this.cartProducts.forEach((value, index) => {
      if (value.cart_id == p) {
        this.cartProducts.splice(index, 1);
        this.storage.set('cartProducts', this.cartProducts);
      }
    });
    this.cartTotalItems();
  }
  emptyCart() {
    this.orderDetails.guest_status = 0;
    this.cartProducts = [];
    this.storage.set('cartProducts', this.cartProducts);
    this.cartTotalItems();
  }
  emptyRecentViewed() {
    this.recentViewedProducts = [];
    this.storage.set('recentViewedProducts', this.recentViewedProducts);
  }
  calculateFinalPriceService(attArray) {
    let total = 0;
    attArray.forEach((value, index) => {
      let attPrice = parseFloat(value.options_values_price);
      if (value.price_prefix == '+') {
        //  console.log('+');
        total += attPrice;
      }
      else {
        //  console.log('-');
        total -= attPrice;
      }
    });
    // console.log("max "+total);
    return total;
  }

  //Function calcualte the total items of cart
  cartTotalItems = function () {
    // this.events.publish('cartChange');
    let total = 0;
    for (let value of this.cartProducts) {
      total += value.customers_basket_quantity;
    }
    this.cartquantity = total;
    // console.log("updated");
    return total;
  };

  removeWishList(p) {
    this.loading.show();
    let data: { [k: string]: any } = {};
    data.liked_customers_id = this.customerData.customers_id;
    data.liked_products_id = p.products_id;
    this.config.postHttp('unlikeproduct', data).then((data: any) => {
      this.loading.hide();
      if (data.success == 1) {
        // this.events.publish('wishListUpdate', p.products_id, 0);
        p.isLiked = 0;
        this.wishList.forEach((value, index) => {
          if (value.products_id == p.products_id) this.wishList.splice(index, 1);
        });
      }
      if (data.success == 0) {

      }
    });
  }
  addWishList(p) {
    this.loading.show();
    let data: { [k: string]: any } = {};
    data.liked_customers_id = this.customerData.customers_id;
    data.liked_products_id = p.products_id;
    this.config.postHttp('likeproduct', data).then((data: any) => {
      this.loading.hide();
      if (data.success == 1) {
        // this.events.publish('wishListUpdate', p.products_id, 1);
        p.isLiked = 1;
      }

      if (data.success == 0) { }
    });
  }


  login(data) {
    this.customerData = data;
    this.customerData.customers_telephone = data.phone;
    this.customerData.phone = data.phone;
    this.customerData.customers_id = data.id;
    this.customerData.customers_firstname = data.first_name;
    this.customerData.avatar = data.avatar;
    this.customerData.customers_dob = data.dob;
    this.storage.set('customerData', this.customerData);
    this.subscribePush();
  }
  logOut() {
    this.loading.autoHide(500);
    this.customerData = {};
    this.storage.set('customerData', this.customerData);
    // this.fb.logout();
  }


  //============================================================================================
  //getting token and passing to server
  subscribePush() {
    if (this.platform.is('cordova')) {
      // pushObject.on('error').subscribe(error => console.error('Error with Push plugin', error));
      if (this.config.notificationType == "fcm") {
        try {
          this.fcm.subscribeToTopic('marketing');

          this.fcm.getToken().then(token => {
            //alert("registration" + token);
            console.log(token);
            //this.storage.set('registrationId', token);
            this.registerDevice(token);
          })

          this.fcm.onNotification().subscribe(data => {
            if (data.wasTapped) {
              console.log("Received in background");
            } else {
              console.log("Received in foreground");
            };
          })

          this.fcm.onTokenRefresh().subscribe(token => {
            // this.storage.set('registrationId', token);
            this.registerDevice(token);
          });

        } catch (error) {

        }
      }
      // else if (this.config.notificationType == "onesignal") {
      //   this.oneSignal.startInit(this.config.onesignalAppId, this.config.onesignalSenderId);
      //   this.oneSignal.endInit();
      //   this.oneSignal.getIds().then((data) => {
      //     this.registerDevice(data.userId);
      //   })
      // }
    }
  }
  //============================================================================================
  //registering device for push notification function
  registerDevice(registrationId) {
    //this.storage.get('registrationId').then((registrationId) => {
    console.log(registrationId);
    let data: { [k: string]: any } = {};
    if (this.customerData.customers_id == null)
      data.customers_id = null;
    else
      data.customers_id = this.customerData.customers_id;
    //	alert("device ready fired");
    let deviceInfo = this.device;
    data.device_model = deviceInfo.model;
    data.device_type = deviceInfo.platform;
    data.device_id = registrationId;
    data.device_os = deviceInfo.version;
    data.manufacturer = deviceInfo.manufacturer;
    data.ram = '2gb';
    data.processor = 'mediatek';
    data.location = 'empty';

    // alert(JSON.stringify(data));
    this.config.postHttp("registerdevices", data).then(data => {
      //  alert(registrationId + " " + JSON.stringify(data));
    });
    //  });

  }

  showAd() {
    //this.loading.autoHide(2000);
    // this.events.publish('showAd');
  }

  toast(msg) {
    this.translateString(msg).then(async (res: string) => {
      const toast = await this.toastCtrl.create({
        message: res,
        duration: 3500,
        position: 'bottom'
      });
      toast.present();
    });
  }
  toastMiddle(msg) {

    this.translateString(msg).then(async (res: string) => {
      let toast = await this.toastCtrl.create({
        message: res,
        duration: 3500,
        position: 'middle'
      });

      toast.present();
    });
  }

  toastWithCloseButton(msg) {

    this.translateString(msg).then(async (res: string) => {
      let toast = await this.toastCtrl.create({
        message: res,
        // showCloseButton: true,
        position: 'middle',
        // closeButtonText: "X"
      });

      toast.present();
    });
  }


  //categories page

  getCategoriesPageItems(parent) {
    let c = [];
    if (parent == undefined)
      c = this.categories;
    else {
      for (let v of this.allCategories) {
        if (v.parent == parent) {
          c.push(v);
        }
      }
    }
    return c;
  }

  // translation services
  translateString(value) {
    return new Promise(resolve => {
      let v = this.translationListArray[value];
      console.log(v);
      if (v == undefined) {
        this.missingValues[value] = value;
        v = value;
      }
      resolve(v);
    });
  }
  translateArray(value) {
    return new Promise(resolve => {
      let tempArray = [];
      value.forEach(element => {
        if (this.translationListArray[element] != undefined) {
          tempArray[element] = this.translationListArray[element];

        }
        else {
          tempArray[element] = element;
          this.missingValues[value] = value;
        }
      });
      resolve(tempArray);
    });
  }
  //=================================================

  showAlert(text) {
    this.translateArray([text, "ok", "Alert"]).then(async (res) => {
      console.log(res);
      const alert = await this.alertCtrl.create({
        header: res["Alert"],
        message: res[text],
        buttons: [res["ok"]]
      });
      await alert.present();
    });
  }

  showAlertWithTitle(text, title) {
    this.translateArray([text, "ok", title]).then(async (res) => {
      let alert = await this.alertCtrl.create({
        header: res[title],
        message: res[text],
        buttons: [res["ok"]]
      });
      await alert.present();
    });
  }

  getNameFirstLetter() {
    return this.customerData.first_name.charAt(0);
  }


  getAddressView(){

    let country$=this.resCountryStore.select(fromResCountrySelectors.selectAllData)
    let state$=this.resCountryStateStore.select(fromResCountryStateSelectors.selectAllData)
    let partner$=this.resPartnerStore.select(fromResPartnerSelectors.selectAllData)

    return combineLatest(partner$,country$,state$).
    pipe
    (map(([partners,countries,states])=>{ 
      return partners.map(partnerObj=>{
        let partner=Object.assign({},partnerObj)
        let filteredCountry=countries.filter(
          country=>
          {
            if(partner.country_id && (partner.country_id+"")!='false')
            {
              return country.id==partner.country_id
            }
            else return null
        }

          )
        let filteredState=states.filter(state=>
          
          {
            if(partner.state_id && (partner.state_id+"")!='false')
            {
              return state.id==partner.state_id
            }
            else return null
          
          }
            
            )

        partner['country']=filteredCountry?filteredCountry[0]:null
        partner['state']=filteredState?filteredState[0]:null

        return partner
      })

    }))


  }

}
