import { Component, OnInit } from '@angular/core';
import { ConfigService } from 'src/providers/config/config.service';
import { NavController } from '@ionic/angular';
import { SharedDataService } from 'src/providers/shared-data/shared-data.service';
import { ProductTemplateState } from 'src/app/product-template/store/state';
import * as fromProductTemplateSelectors  from 'src/app/product-template/store/selectors';
import * as fromProductTemplateActions  from 'src/app/product-template/store/actions';

import { ProductTemplateOdooFields, IProductTemplate, ProductTemplate } from 'src/app/product-template/models/product-template';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { DomSanitizer } from '@angular/platform-browser';



@Component({
  selector: 'app-home4',
  templateUrl: './home4.page.html',
  styleUrls: ['./home4.page.scss'],
})
export class Home4Page implements OnInit {
  sliderConfig = {
    slidesPerView: this.config.productSlidesPerPage,
    spaceBetween: 0
  }
  newProducts$ :Observable<IProductTemplate[]>
  dealProducts$ :Observable<IProductTemplate[]>
  topSoldProducts$ :Observable<IProductTemplate[]>
  limit: number=10;
  offset: number=0;
  convertedAppIconImage: any;
  constructor(
    public nav: NavController,
    public config: ConfigService,
    // public events: Events,
    public shared: SharedDataService,
    private productTemplateStore:Store<ProductTemplateState>,
    private sanitizer:DomSanitizer
  ) { }

  ionViewDidEnter() {
    this.shared.hideSplashScreen();

  }
getProducts(){
  this.productTemplateStore.dispatch(new fromProductTemplateActions.LoadFeatureHttp
    ({type:'new',data:{domain:[['ks_product_tags.name','=','New']],limit:this.limit,offset:this.offset,fields:ProductTemplateOdooFields}}))
  this.productTemplateStore.dispatch(new fromProductTemplateActions.LoadFeatureHttp
    ({type:'deal',data:{domain:[['ks_product_tags.name','=','Deal']],limit:this.limit,offset:this.offset,fields:ProductTemplateOdooFields}}))
  this.productTemplateStore.dispatch(new fromProductTemplateActions.LoadFeatureHttp
    ({type:'top_sold',data:{domain:[['ks_product_tags.name','=','Top Sold']],limit:this.limit,offset:this.offset,fields:ProductTemplateOdooFields}}))




}
  // openSubCategories(parent) {
  //   let count = 0;
  //   for (let value of this.shared.allCategories) {
  //     if (parent.id == value.parent_id) count++;
  //   }
  //   if (count != 0)
  //     this.nav.navigateForward(this.config.currentRoute + "/categories/" + parent.id + "/" + parent.name);
  //   else
  //     this.nav.navigateForward(this.config.currentRoute + "/products/" + parent.id + "/" + parent.name + "/newest");

  // }
openSubCategories(category) {
     if (category.child_id && category.child_id.length > 0) {
      let parent = {
        id: category.id,
        name: category.name
      }
    this.nav.navigateForward(this.config.currentRoute + "/" + 'categories'+ "/"+parent.id+"/"+parent.name);
    }
    else 
    {
      this.nav.navigateForward(this.config.currentRoute + "/products/" + category.id + "/" + category.name + "/newest");

    }



  }

  openProducts(value) {
    this.nav.navigateForward(this.config.currentRoute + "/products/0/0/" + value);
  }
  ngOnInit() {
      this.newProducts$=this.productTemplateStore.select(fromProductTemplateSelectors.selectByFeature('new'))
      this.dealProducts$=this.productTemplateStore.select(fromProductTemplateSelectors.selectByFeature('deal'))
      this.topSoldProducts$=this.productTemplateStore.select(fromProductTemplateSelectors.selectByFeature('top_sold'))
      this.getProducts()

    setTimeout( () => { this.convertedAppIconImage = this.sanitizer.bypassSecurityTrustUrl("data:image/jpeg;base64," + this.config.appSettings.app_icon_image) } , 3000)

  }

}
