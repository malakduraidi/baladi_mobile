import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ConfigService } from 'src/providers/config/config.service';
import { SharedDataService } from 'src/providers/shared-data/shared-data.service';
import { Observable } from 'rxjs';
import { IProductTemplate, ProductTemplateOdooFields } from 'src/app/product-template/models/product-template';
import { Store } from '@ngrx/store';
import * as fromProductTemplateStore from "src/app/product-template/store/state";
import * as fromProductTemplateSelectors from "src/app/product-template/store/selectors";
import * as fromProductTemplateActions from "src/app/product-template/store/actions";
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-home5',
  templateUrl: './home5.page.html',
  styleUrls: ['./home5.page.scss'],
})
export class Home5Page implements OnInit {

  customers_basket_quantity = [0,0,0,0,0,0,0,0,0,0,0,0,]


  public productTemplates$: Observable < IProductTemplate[] >;

  constructor(private sanitizer:DomSanitizer,
    public nav: NavController,
    public config: ConfigService,
    // public events: Events,
    public shared: SharedDataService,
    private productTemplateStore: Store <fromProductTemplateStore.ProductTemplateState >,
  ) {

  }
  ionViewDidEnter() {
    this.shared.hideSplashScreen();
  }
  openSubCategories(parent) {
    let count = 0;
    for (let value of this.shared.allCategories) {
      if (parent.id == value.parent_id) count++;
    }
    if (count != 0)
      this.nav.navigateForward(this.config.currentRoute + "/categories6/" + parent.id + "/" + parent.name);
    else
      this.nav.navigateForward(this.config.currentRoute + "/products/" + parent.id + "/" + parent.name + "/newest");
  }
  ngOnInit() {
    this.productTemplates$ = this.productTemplateStore.select<any>(fromProductTemplateSelectors.selectAllData);
    this.productTemplateStore.dispatch(new fromProductTemplateActions.LoadHTTP({ domain: [], limit: 10, offset: 0, fields:ProductTemplateOdooFields }));
  }

  qunatPlus = function (q) {
    this.customers_basket_quantity[q.id]++;
  }
  //function decreasing the quantity
  qunatMinus = function (q) {
    if (this.customers_basket_quantity[q.id] == 1) {
      return 0;
    }
    this.customers_basket_quantity[q.id]--;
  }

}
