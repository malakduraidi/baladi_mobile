import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import {SaleOrderLine, SaleOrderLineOdooFields} from "../../models/sale-order-line";
import { ISaleOrderLine} from "../../models/sale-order-line";
import {  ModalController, NavController } from "@ionic/angular";
import * as fromSaleOrderLineStore from "../../store/state";
import * as fromSaleOrderLineSelectors from "../../store/selectors";
import * as fromSaleOrderLineActions from "../../store/actions";
import { Store } from "@ngrx/store";
import { FormControl } from "@angular/forms";
import { take, debounceTime, map } from 'rxjs/operators';
import { SharedDataService } from 'src/providers/shared-data/shared-data.service';
import { ConfigService } from 'src/providers/config/config.service';
import { LoginPage } from 'src/app/modals/login/login.page';


/**
 * Generated class for theSaleOrderLineListComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: "sale-order-line-order-cart-list",
  templateUrl: "sale-order-line-order-cart-list.html",
  styleUrls: ['./sale-order-line-order-cart-list.scss'],
  providers: [Store]
})
export class SaleOrderLineOrderCartListComponent implements OnInit {
  searchControl: FormControl;
  navData: { name: string, info: string };
  cart$: Observable<any>;

  searching = {
    is_searching: false,
    search_value: "",
    search_param: ""
  };

  public saleOrderLines$: Observable < ISaleOrderLine[] >;
  public saleOrderLineSearchInput: string = "";
  total: number=0;
  totalTax: number;

  constructor(
    // privatesaleOrderLineActions:SaleOrderLineActions,
    public navCtrl: NavController,
    private saleOrderLineStore: Store < fromSaleOrderLineStore.SaleOrderLineState >,
    private modalCtrl: ModalController,
    private shared:SharedDataService,
    public config: ConfigService,

  ) {
    this.initSearch()
  }


  ngOnInit() {
    // this.saleOrderLines$ = this.saleOrderLineStore.select<any>(fromSaleOrderLineSelectors.selectAllData);
    // this.saleOrderLineStore.dispatch(new fromSaleOrderLineActions.LoadHTTP({ domain: [], limit: 10, offset: 0, fields:SaleOrderLineOdooFields }));
    
    this.cart$=this.shared.getCartView()
    .pipe(map(orderLines=>{
      this.total=0;
      this.totalTax=0;
      for(let i=0;i<orderLines.length;i++)
      {
      this.total=(orderLines[i].product.list_price*orderLines[i].product_uom_qty)+this.total
      this.totalTax=(orderLines[i].product.list_price*orderLines[i].price_tax)+this.totalTax
      }
      return orderLines

    }))
}

showRecordDetail(obj?){

  
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
  this.searchControl.valueChanges.pipe(debounceTime(1000)).subscribe(search => {
    this.setFilteredItems();
  });
}

onSearchInput() {
}
setFilteredItems() {
  this.saleOrderLines$ = this.saleOrderLineStore.select<any>(
    fromSaleOrderLineSelectors.getSaleOrderLineBySearchTerm(this.searching.search_value)
  );
}

doRefresh(event) {

  this.saleOrderLineStore.dispatch(new fromSaleOrderLineActions.RefreshHTTP({ domain: [], limit: 10, offset: 0, fields:SaleOrderLineOdooFields }));

setTimeout(() => {
  console.log('Async operation has ended');
  event.target.complete();
}, 2000);


}

loadData(event) {
  this.saleOrderLineStore
    .select(fromSaleOrderLineSelectors.selectTotalRecords)
    .pipe(take(1))
    .subscribe(totalRecords => {

      if (totalRecords || totalRecords === 0) {
        this.saleOrderLineStore.dispatch(new fromSaleOrderLineActions.LoadHTTP({ domain: [], limit: 10, offset: totalRecords }));
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


quantityMinus(cart){
    this.shared.removeFromCart_v2(cart.product)
  }

  quantityPlus(cart){
    this.shared.addToCart_v2(cart.product)
  }

  viewProduct(product){
        this.navCtrl.navigateForward(this.config.currentRoute + "/product-detail/" + product.id);
  }

  removeAllTheCart(cart){
    this.shared.removeTheCart_v2(cart)
    // this.removeAllTheCart.emit(cart)
  }
  async proceedToCheckOut() {

    if (this.shared.customerData.customers_id == null || this.shared.customerData.customers_id == undefined) {
      let modal = await this.modalCtrl.create({
        component: LoginPage,

        componentProps: {
          'hideGuestLogin': false
        }
      });
      return await modal.present();
    }
    else {
      this.navCtrl.navigateForward(this.config.currentRoute + "/shipping-address");
    }
  }

}
