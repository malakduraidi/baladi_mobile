import { Component, OnInit } from '@angular/core';
import { ConfigService } from '../../providers/config/config.service';
import { SharedDataService } from 'src/providers/shared-data/shared-data.service';
import { ModalController } from '@ionic/angular';
import { LoadingService } from 'src/providers/loading/loading.service';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { ProductTemplateListDynamicComponent } from '../product-template/containers/product-template-list-dynamic/product-template-list-dynamic';
import { ProductCategoryListManagerComponent } from '../product-category/containers/product-category-list-manager/product-category-list-manager';
// import { ProductPage } from '../modals/product/product.page';


@Component({
  selector: 'app-manager',
  templateUrl: './manager.page.html',
  styleUrls: ['./manager.page.scss'],
})
export class ManagerPage implements OnInit {

  constructor(
    public shared: SharedDataService,
    public config: ConfigService,
    public modalCtrl: ModalController,
    public loading: LoadingService,
    public iab: InAppBrowser,
  
    ) {
  }

  async showModal(value) {
    if (value == 'products') {
      let modal = await this.modalCtrl.create({
        component: ProductTemplateListDynamicComponent
      });
      return await modal.present();
    }
    else if(value == 'productCategory'){
      let modal = await this.modalCtrl.create({
        component: ProductCategoryListManagerComponent
      });
      return await modal.present();
    }
  }
  

  ngOnInit() {
  }




}
