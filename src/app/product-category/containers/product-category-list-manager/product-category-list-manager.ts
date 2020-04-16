import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges } from "@angular/core";
import { Observable, combineLatest, of } from "rxjs";
import {ProductCategory, ProductCategoryOdooFields} from "../../models/product-category";
import { IProductCategory} from "../../models/product-category";
import {  ModalController } from "@ionic/angular";
import * as fromProductCategoryStore from "../../store/state";
import * as fromProductCategorySelectors from "../../store/selectors";
import * as fromProductCategoryActions from "../../store/actions";
import { Store, select } from "@ngrx/store";
// import {ProductCategoryDetailComponent } from "../product-category-detail/product-category-detail";
import { FormControl } from "@angular/forms";
import { take, debounceTime, map, switchMap, startWith } from 'rxjs/operators';
import { getProductCategoryEntities } from '../../store/selectors';
import { getMergedRoute } from 'src/app/store/reducers/router/router-state.selectors';
import { ProductCategoryDetailComponent } from '../product-category-detail/product-category-detail';


/**
 * Generated class for theProductCategoryListComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: "product-category-list-manager",
  templateUrl: "product-category-list-manager.html",
  styleUrls: ['./product-category-list-manager.scss'],
  providers: [Store]
})
export class ProductCategoryListManagerComponent implements OnInit {
  // id of category if -1 then select the top categories
  @Input() viewType:string='kanban'; 

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

  ) {

  }

  
  ngOnInit() {

    this.productCategorys$ = this.productCategoryStore.select<any>(fromProductCategorySelectors.selectAllData);
    
    this.productCategorys$ = combineLatest(
      this.productCategoryStore.select(fromProductCategorySelectors.selectAllData)
      , this.productCategoryStore.select(fromProductCategorySelectors.selectLoading)).
      pipe(switchMap(([categories, loading]) => {
        if (loading) 
        {
          return of([null,null,null,null])
        }

        else 
        {
          return of(categories)
        }

      }))
    this.initSearch()

  }

  showRecordDetail(obj?){

    if (!obj) {
      // initialize
      obj =ProductCategory.init();
    }

    const modal = this.modalCtrl.create({
      component:ProductCategoryDetailComponent,
      componentProps: { obj: obj }
    });

    modal.then(ml => ml.present());

  }

  itemSelected(recordDetail) {
    // Either dismiss the item
    // or open the detail of that item
    if (!!this.navData) {
      // then it is been called from else where 
      this.modalCtrl.dismiss(recordDetail)
    }
    else {
      this.showRecordDetail(recordDetail)
    }
  }

  initSearch(){
    this.searchControl = new FormControl();
    this.searchControl.valueChanges.pipe(startWith(null),debounceTime(500)).subscribe(search => {
      let domain=[]
      if(search && search !="")
      {  
        domain=[['name','ilike',search]]
      }
   
      this.productCategoryStore.dispatch(new fromProductCategoryActions.RefreshHTTP({ domain: domain, limit: 100, offset: 0, fields:ProductCategoryOdooFields }));

    });
  }

  setFilteredItems(search) {
    
    this.productCategorys$ = this.productCategoryStore.select<any>(
      fromProductCategorySelectors.getProductCategoryBySearchTerm(search)
    );

  }

  // malak : to refresh (load data from odoo db)
  doRefresh(event) {
    this.productCategoryStore.dispatch(new fromProductCategoryActions.RefreshHTTP({ domain: [], limit: 10, offset: 0, fields:ProductCategoryOdooFields }));

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

  loadImage(productCategoryId){
    this.productCategoryStore.dispatch(new fromProductCategoryActions.LoadImageHttp({id:productCategoryId,image_field_name:'image_medium'}))
  }

}
