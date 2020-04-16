import { Component, OnInit } from "@angular/core";
import { ISaleOrder,SaleOrder} from "../../models/sale-order";
import { ModalController } from "@ionic/angular";
import { Store } from "@ngrx/store";
import * as fromSaleOrderActions from "../../store/actions";
import * as fromSaleOrderStore from "../../store/state";


@Component({
  selector: "sale-order-detail",
  templateUrl: "sale-order-detail.html",
  styleUrls: ['./sale-order-detail.scss'],
  providers: [SaleOrder]
})
export class SaleOrderDetailComponent implements OnInit {
   saleOrder: ISaleOrder;
   valid: boolean;

  constructor(
    public modalCtrl: ModalController,
    private store: Store < fromSaleOrderStore.SaleOrderState >
  ) {
    // let obj = this.navParams.get("obj");
    // this.saleOrder= obj;

  }

  ngOnInit() {
    // dispatch load product id
  }

  onSubmitChange(value: {saleOrder: ISaleOrder; valid: boolean
}) {
  // submit the form
  this.saleOrder= value.saleOrder;
  this.valid = value.valid;
  if (!this.valid) return;
  if (!this.saleOrder.id) {
    // so it is new add
    this.store.dispatch(new fromSaleOrderActions.AddHTTP({data:this.saleOrder}));
  } else {
    //just update
    this.store.dispatch(new fromSaleOrderActions.UpdateHTTP({ id: this.saleOrder.id, data: this.saleOrder}));
}
// since submit we can now dismiss this view
this.modalCtrl.dismiss(this.saleOrder);
  }

onSaleOrderChange(value: {saleOrder: ISaleOrder; valid: boolean }) {
  this.saleOrder= value.saleOrder;
  this.valid = value.valid;
}

delete () {
  this.store.dispatch(new fromSaleOrderActions.DeleteHTTP({ id: this.saleOrder.id}));
// dispatch delete event
this.modalCtrl.dismiss();
}
closeModal() {
  this.modalCtrl.dismiss();

}
}
