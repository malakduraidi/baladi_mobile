import { Component, OnInit, forwardRef, Input } from "@angular/core";
import { ISaleOrder,SaleOrder} from "../../models/sale-order";
import { ModalController} from "@ionic/angular";
import { Store } from "@ngrx/store";
import * as fromSaleOrderActions from "../../store/actions";
import * as fromSaleOrderSelectors from "../../store/selectors";
import * as fromSaleOrderStore from "../../store/state";
import { SaleOrderSelectListComponent } from '../sale-order-select-list/sale-order-select-list';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormControl } from '@angular/forms';
import { take } from 'rxjs/operators';


// export function validateCounterRange(c: FormControl) {
//   let err = {
//     requiredError: {
//       given: c.value,
//       required: true,
//     }
//   };

//   return (c.value > 10 || c.value < 0) ? err : null;
// }

@Component({
  selector: "sale-order-select",
  templateUrl: "sale-order-select.html",
  styleUrls: ['./sale-order-select.scss'],
  providers: [SaleOrder,
      { 
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => SaleOrderSelectComponent),
        multi: true
      }
  ]
})
export class SaleOrderSelectComponent implements OnInit , ControlValueAccessor{

  @Input()
  training_place_id :any= 0;

  @Input()
  view_only=false

  private saleOrder: ISaleOrder;
  propagateChange = (_: any) => {};


  constructor(
    public modalCtrl: ModalController,
    private saleOrderStore: Store < fromSaleOrderStore.SaleOrderState >
  ) {
  }

  ngOnInit() {
    // get the item if exist 
    if (this.training_place_id !== undefined && this.training_place_id !== null) {
      if (this.training_place_id.length > 0) {
        this.training_place_id = this.training_place_id[0]
      }
      this.saleOrderStore.select(fromSaleOrderSelectors.
        selectById(this.training_place_id))
        .pipe(take(1)).subscribe((saleOrder: any) => {
          if (saleOrder && saleOrder.length > 0) {
            this.saleOrder = saleOrder[0]
          }
        }
        )
    }
  }

  writeValue(training_place_id: any) {
    console.log(training_place_id)
    // this.training_place_id = training_place_id
    if (training_place_id !== undefined && training_place_id !== null) {
      if (training_place_id.length > 0) {
        training_place_id = training_place_id[0]
      }
      this.saleOrderStore.select(fromSaleOrderSelectors.
        selectById(training_place_id))
        .pipe(take(1)).subscribe((saleOrder: any) => {
          if (saleOrder && saleOrder.length > 0) {
            this.saleOrder = saleOrder[0]
          }
        }
        )
    }
  }

  registerOnChange(fn) {
    this.propagateChange = fn;
  }

  registerOnTouched() { }


  select(event) {
    // prevent opening other windows ( like when background is clickable)
    event.stopPropagation();

    const modal = this.modalCtrl.create({
      component: SaleOrderSelectListComponent,
      componentProps: {}
    });
    modal.then((mdl) => mdl.present())
    modal.then((mdl) => mdl.onDidDismiss().then(data => {
      this.propagateChange(data.data.id)
      this.saleOrder = data.data
    }))
  }






}
