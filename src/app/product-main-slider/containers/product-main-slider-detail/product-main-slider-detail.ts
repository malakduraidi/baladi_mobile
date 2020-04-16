import { Component, OnInit } from "@angular/core";
import { IProductMainSlider,ProductMainSlider} from "../../models/product-main-slider";
import { ModalController } from "@ionic/angular";
import { Store } from "@ngrx/store";
import * as fromProductMainSliderActions from "../../store/actions";
import * as fromProductMainSliderStore from "../../store/state";


@Component({
  selector: "product-main-slider-detail",
  templateUrl: "product-main-slider-detail.html",
  styleUrls: ['./product-main-slider-detail.scss'],
  providers: [ProductMainSlider]
})
export class ProductMainSliderDetailComponent implements OnInit {
   productMainSlider: IProductMainSlider;
   valid: boolean;

  constructor(
    public modalCtrl: ModalController,
    private store: Store < fromProductMainSliderStore.ProductMainSliderState >
  ) {
    // this.productMainSlider= obj;

  }

  ngOnInit() {
    // dispatch load product id
  }

  onSubmitChange(value: {productMainSlider: IProductMainSlider; valid: boolean
}) {
  // submit the form
  this.productMainSlider= value.productMainSlider;
  this.valid = value.valid;
  if (!this.valid) return;
  if (!this.productMainSlider.id) {
    // so it is new add
    this.store.dispatch(new fromProductMainSliderActions.AddHTTP({data:this.productMainSlider}));
  } else {
    //just update
    this.store.dispatch(new fromProductMainSliderActions.UpdateHTTP({ id: this.productMainSlider.id, data: this.productMainSlider}));
}
// since submit we can now dismiss this view
this.modalCtrl.dismiss(this.productMainSlider);
  }

onProductMainSliderChange(value: {productMainSlider: IProductMainSlider; valid: boolean }) {
  this.productMainSlider= value.productMainSlider;
  this.valid = value.valid;
}

delete () {
  this.store.dispatch(new fromProductMainSliderActions.DeleteHTTP({ id: this.productMainSlider.id}));
// dispatch delete event
this.modalCtrl.dismiss();
}
closeModal() {
  this.modalCtrl.dismiss();

}
}
