import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';

import { ToastController, ModalController, NavController } from '@ionic/angular';
import { ConfigService } from 'src/providers/config/config.service';

import { LoadingService } from 'src/providers/loading/loading.service';
import { SharedDataService } from 'src/providers/shared-data/shared-data.service';
import { NavigationExtras } from '@angular/router';
import { Storage } from '@ionic/storage';
import { LoginPage } from 'src/app/modals/login/login.page';
import { Store } from '@ngrx/store';
import { ProductTemplateState } from 'src/app/product-template/store/state';
import *  as fromProductTemplateActions  from 'src/app/product-template/store/actions';
import { DomSanitizer } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-product',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {

  @Input('data') p;//product data
  @Input('type') type;
  // @Output() someEvent = new EventEmitter();

  expired = false;
  is_upcomming = false;
  convertedImage: any;
  constructor(public config: ConfigService,
    public shared: SharedDataService,
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    public loading: LoadingService,
    private productTemplateStore:Store<ProductTemplateState>,
    private sanitizer:DomSanitizer,

  ) {
    // flash_expires_date
    // flash_start_date
    // server_time
    // events.subscribe('wishListUpdate', (id, value) => {
    //   if (this.p.products_id == id) this.p.isLiked = value
    // });

    // events.subscribe('productExpired', (id) => {
    //   if (this.p.products_id == id) this.productExpired();
    // });
  }
  productExpired() 
  {
    console.log("expired " + this.p.products_name);
    this.expired = true
  }


  

  loadImage() 
  {
    // image prop does not exist
    if(this.p && this.p.name && this.p.image==undefined)
    {
    this.productTemplateStore.dispatch(new fromProductTemplateActions.LoadFeatureImageHttp({ id: this.p.id, image_field_name: 'image' }))
    }

    // image prop does not exist and there is an image
    else if(this.p && this.p.name && this.p.image  )
    {
    this.convertedImage= this.sanitizer.bypassSecurityTrustUrl("data:image/jpeg;base64," + this.p.image)
    }

    // image prop does  exist but no imge for the product
    else if(this.p && this.p.name && this.p.image==false)
    {
      // TODO  should show default box
    }

  }

  pDiscount() {
    var rtn = "";
    var p1 = parseInt(this.p.products_price);
    var p2 = parseInt(this.p.discount_price);
    if (p1 == 0 || p2 == null || p2 == undefined || p2 == 0) { rtn = ""; }
    var result = Math.abs((p1 - p2) / p1 * 100);
    result = parseInt(result.toString());
    if (result == 0) { rtn = "" }
    rtn = result + '%';
    return rtn;
  }

  showProductDetail() {
    if (this.type == 'flash') {
      this.loading.show();
      var dat: { [k: string]: any } = {};
      if (this.shared.customerData != null)
        dat.customers_id = this.shared.customerData.customers_id;
      else
        dat.customers_id = null;

      dat.products_id = this.p.products_id;
      dat.language_id = this.config.langId;
      dat.currency_code = this.config.currecnyCode;
      dat.type = 'flashsale';
      
      this.config.postHttp('getallproducts', dat).then((data: any) => {
        this.loading.hide();
        if (data.success == 1) {
          this.shared.singleProductPageData.push(data.product_data[0]);
          this.navCtrl.navigateForward(this.config.currentRoute + "/product-detail/" + this.p.id);
        }
      }, err => {
        console.log(err);
      });
    }
    else {
      this.shared.singleProductPageData.push(this.p);
      this.navCtrl.navigateForward(this.config.currentRoute + "/product-detail/" + this.p.id);
    }

    if (this.type != 'recent' && this.type != 'flash') this.shared.addToRecent(this.p);
  }

  checkProductNew() 
  {
    var pDate = new Date(this.p.products_date_added);
    var date = pDate.getTime() + this.config.newProductDuration * 86400000;
    var todayDate = new Date().getTime();
    if (date > todayDate)
      return true;
    else
      return false
  }

  addToCart() { 
    
    // this.shared.addToCart(this.p, []); 
    this.shared.addToCart_v2(this.p)
    // let saleOrderLine=new SaleOrderLine()
    // saleOrderLine.product_id=this.p.id
    // saleOrderLine.product_uom_qty=1
    // saleOrderLine.price_total=this.p.list_price
    // this.saleOrderLine.dispatch(new fromSaleOrderLineActions.AddToCartDb(saleOrderLine))

    // create new saleorderline 
  
  
  
  }

  isInCart() {
    var found = false;

    for (let value of this.shared.cartProducts) {
      if (value && value.products_id && this.p && this.p.products_id && value.products_id == this.p.products_id) { found = true; }
    }

    if (found == true) return true;
    else return false;
  }
  removeRecent() {
    this.shared.removeRecent(this.p);

  }

  async clickWishList() {

    if (this.shared.customerData.customers_id == null || this.shared.customerData.customers_id == undefined) {
      let modal = await this.modalCtrl.create({
        component: LoginPage,
        componentProps: {
          'hideGuestLogin': true
        }
      });
      await modal.present();
    }
    else {
      if (this.p.isLiked == '0') { this.addWishList(); }
      else this.removeWishList();
    }
  }
  addWishList() {
    this.shared.addWishList(this.p);
  }
  removeWishList() {
    this.shared.removeWishList(this.p);
  }

  ngOnInit() {
    if (this.type == 'flash') {
      if (this.p.server_time < this.p.flash_start_date) this.is_upcomming = true;
      //console.log("server time less than " + (this.p.server_time - this.p.flash_start_date));
    }
    this.loadImage()
  }

}
