import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges,
  OnDestroy
} from "@angular/core";

import {
  FormBuilder,
  FormGroup,
  Validators
} from "@angular/forms";

import { takeUntil, debounceTime, skip } from "rxjs/operators";
import { Subject } from "rxjs";

import { ISaleOrderLine} from "../../models/sale-order-line";

@Component({
  selector: "sale-order-line-form",
  templateUrl: "sale-order-line-form.html",
  styleUrls: ['./sale-order-line-form.scss']
})
export class SaleOrderLineFormComponent implements OnChanges, OnDestroy {
  @Input() saleOrderLine: ISaleOrderLine;
  @Output()saleOrderLineChange = new EventEmitter < { valid: boolean;saleOrderLine: ISaleOrderLine}> ();
@Output()
onSubmitChange = new EventEmitter < { valid: boolean;saleOrderLine: ISaleOrderLine}> ();
formGroup: FormGroup;
  private destroyed$ = new Subject<void>();

constructor(private formBuilder: FormBuilder) {
  this.buildForm();
}

ngOnChanges(changes: SimpleChanges) {
  if (changes["saleOrderLine"] && changes["saleOrderLine"].currentValue) {
    this.formGroup.patchValue(this.saleOrderLine);
  }
}

submitForm() {
  this.onSubmitChange.emit({
     saleOrderLine: this.formGroup.value,
    valid: this.formGroup.valid
    });
  }

ngOnDestroy() {
  this.destroyed$.next();
  this.destroyed$.complete();
}

buildForm() {
  this.formGroup = this.formBuilder.group({
     
   id: ["",[]],
     
   client_id: ["",[]],
     
   product_id: ["",[]],
     
   order_id: ["",[]],
     
   product_uom_qty: ["",[]],
     
   price_unit: ["",[]],
     
   discount: ["",[]],
     
   price_tax: ["",[]],
     
   price_total: ["",[]],
     
   offer_id: ["",[]],
     
   write_date: ["",[]],
     

      });


this.formGroup.valueChanges
  .pipe(takeUntil(this.destroyed$), skip(1), debounceTime(500))
  .subscribe((saleOrderLine: ISaleOrderLine) => {
  this.saleOrderLineChange.emit({
         saleOrderLine:saleOrderLine,
    valid: this.formGroup.valid
        });
      });
    }
  }
