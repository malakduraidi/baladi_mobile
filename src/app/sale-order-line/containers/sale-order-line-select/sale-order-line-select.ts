import { Component, OnInit, forwardRef, Input } from "@angular/core";
import { ISaleOrderLine,SaleOrderLine} from "../../models/sale-order-line";
import { ModalController} from "@ionic/angular";
import { Store } from "@ngrx/store";
import * as fromSaleOrderLineActions from "../../store/actions";
import * as fromSaleOrderLineSelectors from "../../store/selectors";
import * as fromSaleOrderLineStore from "../../store/state";
import { SaleOrderLineSelectListComponent } from '../sale-order-line-select-list/sale-order-line-select-list';
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
  selector: "sale-order-line-select",
  templateUrl: "sale-order-line-select.html",
  styleUrls: ['./sale-order-line-select.scss'],
  providers: [SaleOrderLine,
      { 
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => SaleOrderLineSelectComponent),
        multi: true
      }
  ]
})
export class SaleOrderLineSelectComponent implements OnInit , ControlValueAccessor{

  @Input()
  training_place_id :any= 0;

  @Input()
  view_only=false

  private saleOrderLine: ISaleOrderLine;
  propagateChange = (_: any) => {};


  constructor(
    public modalCtrl: ModalController,
    private saleOrderLineStore: Store < fromSaleOrderLineStore.SaleOrderLineState >
  ) {
  }

  ngOnInit() {
    // get the item if exist 
    if (this.training_place_id !== undefined && this.training_place_id !== null) {
      if (this.training_place_id.length > 0) {
        this.training_place_id = this.training_place_id[0]
      }
      this.saleOrderLineStore.select(fromSaleOrderLineSelectors.
        selectById(this.training_place_id))
        .pipe(take(1)).subscribe((saleOrderLine: any) => {
          if (saleOrderLine && saleOrderLine.length > 0) {
            this.saleOrderLine = saleOrderLine[0]
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
      this.saleOrderLineStore.select(fromSaleOrderLineSelectors.
        selectById(training_place_id))
        .pipe(take(1)).subscribe((saleOrderLine: any) => {
          if (saleOrderLine && saleOrderLine.length > 0) {
            this.saleOrderLine = saleOrderLine[0]
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
      component: SaleOrderLineSelectListComponent,
      componentProps: {}
    });
    modal.then((mdl) => mdl.present())
    modal.then((mdl) => mdl.onDidDismiss().then(data => {
      this.propagateChange(data.data.id)
      this.saleOrderLine = data.data
    }))
  }






}
