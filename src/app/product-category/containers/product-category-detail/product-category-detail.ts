import { Component, OnInit } from "@angular/core";
import { IProductCategory,ProductCategory} from "../../models/product-category";
import {ModalController } from "@ionic/angular";
import { Store } from "@ngrx/store";
import * as fromProductCategoryActions from "../../store/actions";
import * as fromProductCategoryStore from "../../store/state";


@Component({
  selector: "product-category-detail",
  templateUrl: "product-category-detail.html",
  styleUrls: ['./product-category-detail.scss'],
  providers: [ProductCategory]
})
export class ProductCategoryDetailComponent implements OnInit {
   productCategory: IProductCategory;
   valid: boolean;

  constructor(
    public modalCtrl: ModalController,
    private store: Store < fromProductCategoryStore.ProductCategoryState >
  ) {
    // this.productCategory= obj;

  }

  ngOnInit() {
    // dispatch load product id
  }

  onSubmitChange(value: {productCategory: IProductCategory; valid: boolean
}) {
  // submit the form
  this.productCategory= value.productCategory;
  this.valid = value.valid;
  if (!this.valid) return;
  if (!this.productCategory.id) {
    // so it is new add
    this.store.dispatch(new fromProductCategoryActions.AddHTTP({data:this.productCategory}));
  } else {
    //just update
    this.store.dispatch(new fromProductCategoryActions.UpdateHTTP({ id: this.productCategory.id, data: this.productCategory}));
}
// since submit we can now dismiss this view
this.modalCtrl.dismiss(this.productCategory);
  }

onProductCategoryChange(value: {productCategory: IProductCategory; valid: boolean }) {
  this.productCategory= value.productCategory;
  this.valid = value.valid;
}

delete () {
  this.store.dispatch(new fromProductCategoryActions.DeleteHTTP({ id: this.productCategory.id}));
// dispatch delete event
this.modalCtrl.dismiss();
}
closeModal() {
  this.modalCtrl.dismiss();

}
}
