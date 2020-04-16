import { Component, OnInit, Input } from "@angular/core";
import { Observable, combineLatest, of } from "rxjs";
import {ProductTemplate, ProductTemplateOdooFields} from "../../models/product-template";
import { IProductTemplate} from "../../models/product-template";
import {  ModalController } from "@ionic/angular";
import * as fromProductTemplateStore from "../../store/state";
import * as fromProductTemplateSelectors from "../../store/selectors";
import * as fromProductTemplateActions from "../../store/actions";
import { Store } from "@ngrx/store";
import { FormControl } from "@angular/forms";
import { take, debounceTime, startWith, switchMap } from 'rxjs/operators';
import { ProductTemplateDetailComponent } from '../product-template-detail/product-template-detail';

/**
 * Generated class for theProductTemplateListDynamicComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: "product-template-list-dynamic",
  templateUrl: "product-template-list-dynamic.html",
  styleUrls: ['./product-template-list-dynamic.scss'],
  providers: [Store]
})
export class ProductTemplateListDynamicComponent implements OnInit {

  @Input() viewType:string='kanban'; 
  
  searchControl: FormControl;
  navData: { name: string, info: string };

  searching = {
    is_searching: false,
    search_value: "",
    search_param: ""
  };

  public productTemplates$: Observable < IProductTemplate[] >;
  public productTemplateSearchInput: string = "";

  constructor(
    // privateproductTemplateActions:ProductTemplateActions,
    private productTemplateStore: Store <fromProductTemplateStore.ProductTemplateState >,
    private modalCtrl: ModalController,

  ) {
  }

  ngOnInit() {
    this.productTemplates$ = this.productTemplateStore.select<any>(fromProductTemplateSelectors.selectAllData);
    // this.productTemplateStore.dispatch(new fromProductTemplateActions.LoadHTTP({ domain: [], limit: 10, offset: 0, fields:ProductTemplateOdooFields }));
    
    this.productTemplates$ = combineLatest(
      this.productTemplateStore.select(fromProductTemplateSelectors.selectAllData)
      , this.productTemplateStore.select(fromProductTemplateSelectors.selectLoading)).
      pipe(switchMap(([products, loading]) => {
        if (loading) 
        {
          return of([null,null,null,null])
        }

        else 
        {
          return of(products)
        }

      }))
      this.initSearch()

  
  }

  showRecordDetail(obj?){
    if (!obj) {
      // initialize
      obj =ProductTemplate.init();
    }

    const modal = this.modalCtrl.create({
      component:ProductTemplateDetailComponent,
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

      // this.setFilteredItems(search);
      }
   
    
      this.productTemplateStore.dispatch(new fromProductTemplateActions.RefreshHTTP({ domain: domain, limit: 100, offset: 0, fields:ProductTemplateOdooFields }));

    });
  }


  
  setFilteredItems(search) {
    this.productTemplates$ = this.productTemplateStore.select<any>(
      fromProductTemplateSelectors.getProductTemplateBySearchTerm(search)
    );

  }
  
  // malak : to refresh (load data from odoo db)
  doRefresh(event) {
    this.productTemplateStore.dispatch(new fromProductTemplateActions.RefreshHTTP({ domain: [], limit: 10, offset: 0, fields:ProductTemplateOdooFields }));

    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }
  
  // malak : to load data from odoo db
  loadData(event) {
    this.productTemplateStore
      .select(fromProductTemplateSelectors.selectTotalRecords)
      .pipe(take(1))
      .subscribe(totalRecords => {
        if (totalRecords || totalRecords === 0) {
          this.productTemplateStore.dispatch(new fromProductTemplateActions.LoadHTTP({ domain: [], limit: 10, offset: totalRecords }));
        }
      });
      setTimeout(() => {
        event.target.complete();
       }, 500);
  // get current offset
  // update the limit
  }

  // malak : in case close modal
  closeModal() {
    this.modalCtrl.dismiss();
  }

  loadImage(productId){
    this.productTemplateStore.dispatch(new fromProductTemplateActions.LoadImageHttp({id:productId,image_field_name:'image_medium'}))
  }

}
