import { Component } from '@angular/core';
import { SharedDataService } from 'src/providers/shared-data/shared-data.service';
import { ConfigService } from 'src/providers/config/config.service';
import { NavController, ModalController } from '@ionic/angular';
import { SaleOrderLineCartListComponent } from '../sale-order-line/containers/sale-order-line-cart-list/sale-order-line-cart-list';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {
  public homePath = "./home-pages/home/home.module#HomePageModule"
  totalCart: number;
  currentHomePage="1"
  constructor(
    public shared: SharedDataService,
    public config: ConfigService,
    public navCtrl: NavController,
    private modalCtrl:ModalController
     ) {

  }

  showImg() {
    if (this.config.defaultIcons == true) return false;
    else return true;
  }
  ionChange(appTabs) {
    this.config.currentRoute = "tabs/" + appTabs.getSelected();
    //console.log(this.config.currentRoute);
    if (this.shared.customerData.customers_id == null && this.config.currentRoute == 'tabs/cart') {
      this.navCtrl.navigateForward("/tabs/cart");
    }
  }
  openCart()
  {

    let modal =  this.modalCtrl.create({
      component: SaleOrderLineCartListComponent,
    });
    modal.then(mdl=>mdl.present())

  }
  ngOnInit(){
    this.shared.cartTotalItems_v2().subscribe(data=>{
      this.totalCart=data
    })

    this.currentHomePage=this.config.getCurrentHomePage()
  }

}
