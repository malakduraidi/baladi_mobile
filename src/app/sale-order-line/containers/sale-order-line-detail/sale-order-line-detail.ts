import { Component, OnInit } from "@angular/core";
import { ISaleOrderLine,SaleOrderLine} from "../../models/sale-order-line";
import { ModalController } from "@ionic/angular";
import { Store } from "@ngrx/store";
import * as fromSaleOrderLineActions from "../../store/actions";
import * as fromSaleOrderLineStore from "../../store/state";


@Component({
  selector: "sale-order-line-detail",
  templateUrl: "sale-order-line-detail.html",
  styleUrls: ['./sale-order-line-detail.scss'],
  providers: [SaleOrderLine]
})
export class SaleOrderLineDetailComponent implements OnInit {
   saleOrderLine: ISaleOrderLine;
   valid: boolean;

  constructor(
    public modalCtrl: ModalController,
    private store: Store < fromSaleOrderLineStore.SaleOrderLineState >
  ) {
    // let obj = this.navParams.get("obj");
    // this.saleOrderLine= obj;

  }

  ngOnInit() {
    // dispatch load product id
  }

  onSubmitChange(value: {saleOrderLine: ISaleOrderLine; valid: boolean
}) {
  // submit the form
  this.saleOrderLine= value.saleOrderLine;
  this.valid = value.valid;
  if (!this.valid) return;
  if (!this.saleOrderLine.id) {
    // so it is new add
    this.store.dispatch(new fromSaleOrderLineActions.AddHTTP({data:this.saleOrderLine}));
  } else {
    //just update
    this.store.dispatch(new fromSaleOrderLineActions.UpdateHTTP({ id: this.saleOrderLine.id, data: this.saleOrderLine}));
}
// since submit we can now dismiss this view
this.modalCtrl.dismiss(this.saleOrderLine);
  }

onSaleOrderLineChange(value: {saleOrderLine: ISaleOrderLine; valid: boolean }) {
  this.saleOrderLine= value.saleOrderLine;
  this.valid = value.valid;
}

delete () {
  this.store.dispatch(new fromSaleOrderLineActions.DeleteHTTP({ id: this.saleOrderLine.id}));
// dispatch delete event
this.modalCtrl.dismiss();
}
closeModal() {
  this.modalCtrl.dismiss();

}
}
