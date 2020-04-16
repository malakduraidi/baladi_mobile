import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {IonSlides } from '@ionic/angular';
import { NavController, IonContent } from '@ionic/angular';
import { SharedDataService } from 'src/providers/shared-data/shared-data.service';
import { ConfigService } from 'src/providers/config/config.service';
import { NavigationExtras, Router } from '@angular/router';
import { ProductTemplateState } from 'src/app/product-template/store/state';
import * as fromProductTemplateSelectors  from 'src/app/product-template/store/selectors';
import * as fromProductTemplateActions  from 'src/app/product-template/store/actions';

import { ProductTemplateOdooFields, IProductTemplate, ProductTemplate } from 'src/app/product-template/models/product-template';

import { Store } from '@ngrx/store';
import { Observable, combineLatest, of } from 'rxjs';
import { switchMap, map, distinctUntilChanged } from 'rxjs/operators';


@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {


  @ViewChild(IonContent) content: IonContent;
  @ViewChild('recentSlider') slider: IonSlides;

  segments = "top_sold"//first segment by default 
  scrollTopButton = false;//for scroll down fab 
  //for product slider after banner
  sliderConfig = {
    slidesPerView: this.config.productSlidesPerPage,
    spaceBetween: 0
  }
  selectedRadioGroup: any;
  selectedRadioItem: any;
  products$ :Observable<IProductTemplate[]>
  mostLikedProducts$ :Observable<IProductTemplate[]>
  newProducts$ :Observable<IProductTemplate[]>
  topSoldProducts$ :Observable<IProductTemplate[]>
  offset:number=0
  limit:number=10
  domain: any=[]=[['ks_product_tags.name','=','Top Sold']]
  typeSelected: string="top_sold";
  topSoldProducts: any;


  constructor(
    public nav: NavController,
    public config: ConfigService,
    // public events: Events,
    public router: Router,
    public shared: SharedDataService,
    private productTemplateStore:Store<ProductTemplateState>
     ) {

  }

  setMethod(d) {
    console.log(d);
  }
  ngOnInit() {
      this.mostLikedProducts$=this.productTemplateStore. select(fromProductTemplateSelectors.selectByFeature('most_liked'))
      this.newProducts$=this.productTemplateStore. select(fromProductTemplateSelectors.selectByFeature('new'))
      this.topSoldProducts$=this.productTemplateStore. select(fromProductTemplateSelectors.selectByFeature('top_sold'))

  }
  ionViewDidEnter() {
    this.shared.hideSplashScreen();
    this.getProducts();
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

  //changing tab
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

}
