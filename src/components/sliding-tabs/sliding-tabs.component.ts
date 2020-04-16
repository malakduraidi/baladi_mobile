import { Component, OnInit, Input, ViewChild, ApplicationRef } from '@angular/core';
import { SharedDataService } from 'src/providers/shared-data/shared-data.service';
import { IonInfiniteScroll } from '@ionic/angular';
import { ConfigService } from 'src/providers/config/config.service';
import { Store } from '@ngrx/store';
import { ProductTemplateState } from 'src/app/product-template/store/state';
import * as fromProductTemplateSelectors  from 'src/app/product-template/store/selectors';
import * as fromProductTemplateActions  from 'src/app/product-template/store/actions';
import { ProductTemplateOdooFields, IProductTemplate, ProductTemplate } from 'src/app/product-template/models/product-template';

import { filter, take, switchMap, startWith, withLatestFrom } from 'rxjs/operators';
import { ProductCategoryState } from 'src/app/product-category/store/state';
import * as fromProductCategorySelectors  from 'src/app/product-category/store/selectors';
import * as fromProductCategoryActions  from 'src/app/product-category/store/actions';
import { ProductCategoryOdooFields } from 'src/app/product-category/models/product-category';

import { Observable, of, combineLatest } from 'rxjs';


@Component({
  selector: 'app-sliding-tabs',
  templateUrl: './sliding-tabs.component.html',
  styleUrls: ['./sliding-tabs.component.scss'],
})
export class SlidingTabsComponent implements OnInit {
  @ViewChild(IonInfiniteScroll) infinite: IonInfiniteScroll;

  @Input('type') type;//product data
  @Input('segments') segments='all';//product data
  products :any = [1, 1, 1, 1];
  products$ :Observable<IProductTemplate[]>

  httpLoading=false
  categories :any ;
  selected:any = 0;
  page = 0;
  limit :number= 10 
  offset:number=0
  domain: any=[];
  productHttpLoading$: Observable<boolean>;
  constructor(
    public shared: SharedDataService,
    public config: ConfigService,
    private productTemplateStore:Store<ProductTemplateState>,
    private productCategoryStore:Store<ProductCategoryState>
  ) {

  }

 
  getProducts(infiniteScroll) {
    let catId: any = this.selected;

    if (this.selected == 0) catId = '';
    var dat: { [k: string]: any } = {};
    dat.customers_id = null;
    dat.categories_id = this.selected;
    dat.page_number = this.page;

    // if (d.type != undefined)
    //   data.type = d.type;
    // TODO get from settings
    dat.language_id = this.config.langId;
    dat.currency_code = this.config.currecnyCode;


    if(this.offset==0)
    {
    this.productTemplateStore.dispatch(new fromProductTemplateActions.RefreshHTTP({domain:this.domain,limit:this.limit,offset:this.offset,fields:ProductTemplateOdooFields}))
    }
    else {
    this.productTemplateStore.dispatch(new fromProductTemplateActions.LoadHTTP({domain:this.domain,limit:this.limit,offset:this.offset,fields:ProductTemplateOdooFields}))
    }
  }
  
  getCategories(){

    this.productCategoryStore.dispatch(new fromProductCategoryActions.LoadHTTP({domain:[],limit:this.limit,offset:this.offset,fields:ProductCategoryOdooFields}))

  }


  //changing tab
  changeTab(c) {
    this.infinite.disabled = false;
    this.offset = 0;

    if (c == '0') 
    {
    // this.selected = c
    this.domain=[]
    }
    else 
    {
      this.selected = c.id;
      this.domain=[['public_categ_ids.id','in',[c.id]]]
    }

    this.getProducts(null);
  }


  ngOnInit() {

    this.products$ = combineLatest(
      this.productTemplateStore.select(fromProductTemplateSelectors.selectAllData)
      , this.productTemplateStore.select(fromProductTemplateSelectors.selectLoading)).
      pipe(switchMap(([products, loading]) => {

        if (loading && this.offset == 0) {
          return of([null, null, null, null])
        }
        else {
          if (products.length != 0) {
            this.offset = this.limit + this.offset
          }
          if (this.infinite)
            this.infinite.complete();
          return of(products)
        }
      }))


    this.productCategoryStore.select(fromProductCategorySelectors.selectLeafs).pipe(filter(products => products && products.length > 0)).subscribe(
      (categories:any) => {
        this.categories = categories.slice();
      })

    this.getProducts(null);
    this.getCategories()

  }

}
