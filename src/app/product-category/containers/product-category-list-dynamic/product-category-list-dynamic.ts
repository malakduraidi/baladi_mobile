import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges } from "@angular/core";
import { Observable } from "rxjs";
import {ProductCategory, ProductCategoryOdooFields} from "../../models/product-category";
import { IProductCategory} from "../../models/product-category";
import {  ModalController } from "@ionic/angular";
import * as fromProductCategoryStore from "../../store/state";
import * as fromProductCategorySelectors from "../../store/selectors";
import * as fromProductCategoryActions from "../../store/actions";

import { Store, select } from "@ngrx/store";
// import {ProductCategoryDetailComponent } from "../product-category-detail/product-category-detail";
import { FormControl } from "@angular/forms";
import { take, debounceTime, map } from 'rxjs/operators';
import { getProductCategoryEntities } from '../../store/selectors';
import { getMergedRoute } from 'src/app/store/reducers/router/router-state.selectors';


/**
 * Generated class for theProductCategoryListComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: "product-category-list-dynamic",
  templateUrl: "product-category-list-dynamic.html",
  styleUrls: ['./product-category-list-dynamic.scss'],
  providers: [Store]
})
export class ProductCategoryListDynamicComponent implements OnInit {
  @Input() searchable:boolean=true
  // id of category if -1 then select the top categories
  @Input() viewType:string='list'; 
  @Output() onItemClick = new EventEmitter <{category:IProductCategory}> ();

  searchControl: FormControl;
  navData: { name: string, info: string };

  searching = {
    is_searching: false,
    search_value: "",
    search_param: ""
  };

  public productCategorys$: Observable < IProductCategory[] >;
  public productCategorySearchInput: string = "";
  domain: any=[];

  constructor(
    // privateproductCategoryActions:ProductCategoryActions,
    private productCategoryStore: Store <fromProductCategoryStore.ProductCategoryState >,
    private modalCtrl: ModalController,
    // private navParams: NavParams,

  ) {

    // this.navData = this.navParams.get('modelData');
    this.initSearch()
  }

  
  ngOnInit() {

    // this.productCategoryStore.select(fromProductCategorySelectors.getSelectedCategory).subscribe(data=>{
    //   if(data)
    //   {
    //     this.updateCategoryLevel(parseInt(data))
    //     this.getProductCategories()
    //   }
    //   else {

    //   }

    // })
    
    this.productCategorys$ = this.productCategoryStore.
    select<any>(fromProductCategorySelectors.selectAllDataWithRoutes).
    pipe(map(data=>{return data}));

    // this.updateCategoryLevel(-1)
    this.getProductCategories()

  }
  updateCategoryLevel(level) {
    if (level == -1) {
      this.domain = [['parent_id', '=', null]]

    }
    else {
      this.domain = [['parent_id', '=', parseInt(level)]]

    }

  }



  getProductCategories() {
    this.productCategoryStore.dispatch(new fromProductCategoryActions.RefreshHTTP({ domain: this.domain, limit: 10, offset: 0, fields: ProductCategoryOdooFields }));
  }


  itemSelected(category) {
    this.onItemClick.emit(category)
  }



  initSearch() {
    this.searchControl = new FormControl();
    this.searchControl.valueChanges.pipe(debounceTime(1000)).subscribe(search => {
      this.setFilteredItems();
    });
  }

  onSearchInput() {
  }
  setFilteredItems() {
    this.productCategorys$ = this.productCategoryStore.select<any>(
      fromProductCategorySelectors.getProductCategoryBySearchTerm(this.searching.search_value)
    );
  }

  doRefresh(event) {
    this.productCategoryStore.dispatch(new fromProductCategoryActions.RefreshHTTP({ domain: [], limit: 10, offset: 0, fields: ProductCategoryOdooFields }));

    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);


  }

  loadData(event) {
    this.productCategoryStore
      .select(fromProductCategorySelectors.selectTotalRecords)
      .pipe(take(1))
      .subscribe(totalRecords => {

        if (totalRecords || totalRecords === 0) {
          this.productCategoryStore.dispatch(new fromProductCategoryActions.LoadHTTP({ domain: [], limit: 10, offset: totalRecords }));
        }
      });
    setTimeout(() => {
      console.log('Done');
      event.target.complete();
    }, 500);

    // get current offset
    // update the limit
  }

  closeModal() {
    this.modalCtrl.dismiss();
  }




}
