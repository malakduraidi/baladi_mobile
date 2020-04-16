import { Component, OnInit } from "@angular/core";
import { IProductTemplate,ProductTemplate} from "../../models/product-template";
import { ModalController } from "@ionic/angular";
import { Store } from "@ngrx/store";
import * as fromProductTemplateActions from "../../store/actions";
import { ProductCategorySelectListComponent } from 'src/app/product-category/containers/product-category-select-list/product-category-select-list';
import * as fromProductCategorySelectors from "src/app/product-category/store/selectors";
import { take } from 'rxjs/operators';
import { ProductCategoryState } from 'src/app/product-category/store';
import { ProductTemplateState } from '../../store/state';
import { IProductCategory } from 'src/app/product-category/models/product-category';


@Component({
  selector: "product-template-detail",
  templateUrl: "product-template-detail.html",
  styleUrls: ['./product-template-detail.scss'],
  providers: [ProductTemplate]
})
export class ProductTemplateDetailComponent implements OnInit {
  productTemplate: IProductTemplate;
  valid: boolean;
  selectedCategory: IProductCategory;

  constructor(
    public modalCtrl: ModalController,
    private store: Store < ProductTemplateState >,
    private productCategoryStore: Store <ProductCategoryState >
  ) {

    // malak : get category info and pass it to form
 
  }

  ngOnInit() {
    // dispatch load product id
  }
  
  // malak : when click on category field in form
  async onFocusCategory(){
    let modal = await this.modalCtrl.create({
      component: ProductCategorySelectListComponent
    });
    // Get returned data
    await modal.present();
    const { data } = await modal.onWillDismiss();
    this.selectedCategory = data
    return 

    
  }
  
  // malak : when save to submit form
  onSubmitChange(value: {productTemplate: IProductTemplate; valid: boolean}) {
    // submit the form
    this.productTemplate= value.productTemplate;
    
    this.valid = value.valid;
    if (!this.valid) return;
    if (!this.productTemplate.id) {
    // so it is new add
      this.store.dispatch(new fromProductTemplateActions.AddHTTP({data:this.productTemplate}));
    } else {
      //just update
      this.store.dispatch(new fromProductTemplateActions.UpdateHTTP({ id: this.productTemplate.id, data: this.productTemplate}));
    }
    // since submit we can now dismiss this view
    this.modalCtrl.dismiss(this.productTemplate);
  }

  onProductTemplateChange(value: {productTemplate: IProductTemplate; valid: boolean }) {
    this.productTemplate= value.productTemplate;
    this.valid = value.valid;
  }

  // malak : in case delete product
  delete () {
    this.store.dispatch(new fromProductTemplateActions.DeleteHTTP({ id: this.productTemplate.id}));
    this.modalCtrl.dismiss();
  }
  
  // malak : in case close modal
  closeModal() {
    this.modalCtrl.dismiss();
  }

}
