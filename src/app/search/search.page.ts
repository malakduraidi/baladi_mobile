import { Component, OnInit, ApplicationRef } from '@angular/core';
import { LoadingService } from 'src/providers/loading/loading.service';
import { SharedDataService } from 'src/providers/shared-data/shared-data.service';

import { ConfigService } from 'src/providers/config/config.service';
import { NavController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';

import { ProductCategoryState } from 'src/app/product-category/store/state';
import * as fromProductCategorySelectors  from 'src/app/product-category/store/selectors';
import * as fromProductCategoryActions  from 'src/app/product-category/store/actions';

import { ProductTemplateState } from '../product-template/store/state';
import  * as fromProductTemplateSelectors  from '../product-template/store/selectors';
import  * as fromProductTemplateActions  from '../product-template/store/actions';



import { ProductCategoryOdooFields, IProductCategory } from 'src/app/product-category/models/product-category';
import { Store } from '@ngrx/store';
import { DomSanitizer } from '@angular/platform-browser';
import { filter, switchMap, startWith, debounceTime, takeUntil } from 'rxjs/operators';
import { Observable, of, combineLatest, Subject } from 'rxjs';
import { IProductTemplate, ProductTemplateOdooFields } from '../product-template/models/product-template';
import { FormControl } from '@angular/forms';



@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {
  search: any;
  products: any;
  showCategories = true;
  limit: number=10;
  offset: number=0;
  categories$:Observable<IProductCategory[]>
  products$: Observable<IProductTemplate[]>;
  search$: any;
  searchControl: FormControl;
  private destroyed$ = new Subject<void>();
  constructor(
    public navCtrl: NavController,
    public config: ConfigService,
    public http: HttpClient,
    public loading: LoadingService,
    public shared: SharedDataService,
    private productCategoryStore:Store<ProductCategoryState>,
    private sanitizer:DomSanitizer,
    private productTemplateStore:Store<ProductTemplateState>,
    ) { }

  onChangeKeyword = function (e) {
    //console.log(this.search);
    // if (search != undefined) {
    //rchResult = [];
    //  }
  }


  initSearch() {
    this.searchControl = new FormControl();

    this.search$ = this.searchControl.valueChanges.pipe(startWith(null),debounceTime(500)).subscribe(data=>{
      if(data && data !="")
      {
        this.getProductsForSearch(data)
        this.productTemplateStore.dispatch(new fromProductTemplateActions.UpdateSearchValue({search_value:'data'}))

      }
      if(data =="")
      {
        // clear the search
        this.productTemplateStore.dispatch(new fromProductTemplateActions.ClearSearchData())
        this.productTemplateStore.dispatch(new fromProductTemplateActions.UpdateSearchValue({search_value:''}))
      }
    });

    // combineLatest(
    // this.search$.pipe(debounceTime(500)),
    // this.absanceStore.select(fromAbsanceSelectors.selectSearchFilter).pipe(takeUntil(this.destroyed$))
    // ).subscribe(data=>{
    //   let odooDomain=[]
    //   let searchValue=data[0]
    //   let searchFilter=data[1]

    //   if(searchValue)
    //   {
    //       odooDomain.push(['class_id.name', 'ilike', searchValue])
    //   }
    //   if(searchFilter)
    //   {
    //       odooDomain=odooDomain.concat(searchFilter.odooDomain)
    //   }
    //   this.searchFilter=searchFilter
    //   this.absanceStore.dispatch(new fromAbsanceActions.RefreshHTTP({ domain: odooDomain, limit: 10, offset: 0, fields: AbsanceOdooFields }));

    // })
  }

  getSearchData = function () {
    if (this.search != undefined) {
      if (this.search == null || this.search == '') {
        this.shared.toast("Please enter something");
        return 0;
      }
    }
    else {
      this.shared.toast("Please enter something");
      return 0;
    }
    // this.loading.show();
    // TODO why they are sending language id and the currenct id 
    this.getProductsForSearch(this.search)
    // this.config.postHttp('getsearchdata', { 'searchValue': this.search, 'language_id': this.config.langId, "currency_code": this.config.currecnyCode }).then((data: any) => {
    //   this.loading.hide();
    //   if (data.success == 1) {
    //     this.products = data.product_data.products;
    //     this.showCategories = false;
    //   }
    //   if (data.success == 0) {
    //     this.shared.toast(data.message);
    //   }
    // });
  };


  getCategories(){
    this.productCategoryStore.dispatch(new 
      fromProductCategoryActions.LoadHTTP({domain:[],limit:this.limit,offset:this.offset,fields:ProductCategoryOdooFields}))
  }

  openProducts(category) 
  {
    let id=category.id
    let name=category.name
    this.navCtrl.navigateForward(this.config.currentRoute + "/products/" + id + "/" + name + "/newest");
  }

  getProductsForSearch(search_value){

    this.productTemplateStore.dispatch(new fromProductTemplateActions.SearchHTTP({domain:[['name','ilike',search_value]],limit:this.limit,offset:this.offset,fields:ProductTemplateOdooFields}))

  }

  ngOnInit() {

    this.categories$=this.productCategoryStore.select(fromProductCategorySelectors.selectAllData).pipe(filter(products => products && products.length > 0))

    // this.searchProducts$=this.productCategoryStore.select(fromProductCategorySelectors.selectAllData).pipe(filter(products => products && products.length > 0))
    this.products$ = combineLatest(
      this.productTemplateStore.select(fromProductTemplateSelectors.selectSearchData)
      , this.productTemplateStore.select(fromProductTemplateSelectors.selectSearching)).
      pipe(switchMap(([products, searching]) => {
        if (searching) 
        {
          return of([null,null,null,null])
        }

        else 
        {
          this.loading.hide()
          return of(products)
        }

      }))

    this.getCategories()
    this.initSearch()
  }

}
