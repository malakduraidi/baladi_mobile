import { Component, OnInit, ViewChild } from '@angular/core';
import { NavController, IonContent, IonInfiniteScroll } from '@ionic/angular';
import { ConfigService } from 'src/providers/config/config.service';
import { SharedDataService } from 'src/providers/shared-data/shared-data.service';
import { ProductTemplateState } from 'src/app/product-template/store/state';
import * as fromProductTemplateSelectors  from 'src/app/product-template/store/selectors';
import * as fromProductTemplateActions  from 'src/app/product-template/store/actions';

import { ProductTemplateOdooFields, IProductTemplate, ProductTemplate } from 'src/app/product-template/models/product-template';

import { Store } from '@ngrx/store'
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home9',
  templateUrl: './home9.page.html',
  styleUrls: ['./home9.page.scss'],
})
export class Home9Page implements OnInit {

  @ViewChild(IonContent) content: IonContent;
  @ViewChild(IonInfiniteScroll) infinite: IonInfiniteScroll;
  segments = "top_sold"//first segment by default 
  scrollTopButton = false;//for scroll down fab 
  //for product slider after banner
  sliderConfig = {
    slidesPerView: this.config.productSlidesPerPage,
    spaceBetween: 0
  }

  products: any = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
  page = 0;
  count = 0;
  loadingServerData = false;
  offset: number=0;
  domain: any=[]=[['ks_product_tags.name','=','Top Sold']];
  limit: any=10;
  typeSelected: string="top_sold";
  products$ :Observable<IProductTemplate[]>

  mostLikedProducts$ :Observable<IProductTemplate[]>
  newProducts$ :Observable<IProductTemplate[]>
  topSoldProducts$ :Observable<IProductTemplate[]>

  constructor(
    public nav: NavController,
    public config: ConfigService,
    // public events: Events,
    public shared: SharedDataService,
    private productTemplateStore:Store<ProductTemplateState>
  ) {

  }
  ionViewDidEnter() {
    this.shared.hideSplashScreen();
  }
  // For FAB Scroll
  onScroll(e) {
    if (e.detail.scrollTop >= 500) {
      this.scrollTopButton = true;
    }
    if (e.detail.scrollTop < 500) {
      this.scrollTopButton = false;
    }
  }
  // For Scroll To Top Content
  scrollToTop() {
    this.content.scrollToTop(700);
    this.scrollTopButton = false;
  }
  openProducts(value) {
    this.nav.navigateForward(this.config.currentRoute + "/products/0/0/" + value);
  }
  openCategoryPage(category) {
     if (category.child_id && category.child_id.length > 0) {
      let parent = {
        id: category.id,
        name: category.name
      }
    this.nav.navigateForward(this.config.currentRoute + "/" + 'categories'+ "/"+parent.id+"/"+parent.name);
    }
    else 
    {
      this.nav.navigateForward(this.config.currentRoute + "/products/" + category.id + "/" + category.name + "/newest");

    }



  }
  // getProducts() {
  //   if (this.loadingServerData) return 0;
  //   if (this.page == 0) {
  //     this.count++;
  //     this.loadingServerData = false;
  //   }
  //   this.loadingServerData = true;

  //   let data: { [k: string]: any } = {};
  //   if (this.shared.customerData.customers_id != null)
  //     data.customers_id = this.shared.customerData.customers_id;
  //   data.page_number = this.page;
  //   data.language_id = this.config.langId;
  //   data.currency_code = this.config.currecnyCode;

  //   this.config.postHttp('getallproducts', data).then((data: any) => {
  //     let dat = data.product_data;
  //     this.infinite.complete();
  //     if (this.page == 0) {
  //       this.products = new Array;
  //     }
  //     if (dat.length != 0) {
  //       this.page++;
  //       for (let value of dat) {
  //         this.products.push(value);
  //       }
  //     }
  //     if (dat.length == 0) { this.infinite.disabled = true; }
  //     this.loadingServerData = false;

  //   });
  // }
  changeTab(c) {
    this.offset = 0;

    if (c == 'most_liked') 
    {
    // this.selected = c
    this.domain=[['ks_product_tags.name','=','Most Popular']]

    }
    else if (c == 'new') 
    {
    // this.selected = c
  this.domain=[['ks_product_tags.name','=','New']]
    }
    else if (c == 'top_sold') 
    {
    // this.selected = c
    this.domain=[['ks_product_tags.name','=','Top Sold']]
    }
    this.typeSelected=c

    this.getProducts();
  }
  getProducts(){
    this.productTemplateStore.dispatch(new fromProductTemplateActions.LoadFeatureHttp
      ({type:this.typeSelected,data:{domain:this.domain,limit:this.limit,offset:this.offset,fields:ProductTemplateOdooFields}}))
  }
  ngOnInit() {
    this.mostLikedProducts$=this.productTemplateStore. select(fromProductTemplateSelectors.selectByFeature('most_liked'))
    this.newProducts$=this.productTemplateStore. select(fromProductTemplateSelectors.selectByFeature('new'))
    this.topSoldProducts$=this.productTemplateStore. select(fromProductTemplateSelectors.selectByFeature('top_sold'))

    this.getProducts();
  }

}
