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

import { ISaleOrder} from "../../models/sale-order";

@Component({
  selector: "sale-order-form",
  templateUrl: "sale-order-form.html",
  styleUrls: ['./sale-order-form.scss']
})
export class SaleOrderFormComponent implements OnChanges, OnDestroy {
  @Input() saleOrder: ISaleOrder;
  @Output()saleOrderChange = new EventEmitter < { valid: boolean;saleOrder: ISaleOrder}> ();
@Output()
onSubmitChange = new EventEmitter < { valid: boolean;saleOrder: ISaleOrder}> ();
formGroup: FormGroup;
  private destroyed$ = new Subject<void>();

constructor(private formBuilder: FormBuilder) {
  this.buildForm();
}

ngOnChanges(changes: SimpleChanges) {
  if (changes["saleOrder"] && changes["saleOrder"].currentValue) {
    this.formGroup.patchValue(this.saleOrder);
  }
}

submitForm() {
  this.onSubmitChange.emit({
     saleOrder: this.formGroup.value,
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
     
   name: ["",[Validators.required]],
     
   amount_tax: ["",[]],
     
   amount_total: ["",[]],
     
   amount_untaxed: ["",[]],
     
   partner_id: ["",[]],
     
   invoice_ids: ["",[]],
     
   state: ["",[]],
     
   date_order: ["",[]],
     
   write_date: ["",[]],
     
   note: ["",[]],
     

      });


this.formGroup.valueChanges
  .pipe(takeUntil(this.destroyed$), skip(1), debounceTime(500))
  .subscribe((saleOrder: ISaleOrder) => {
  this.saleOrderChange.emit({
         saleOrder:saleOrder,
    valid: this.formGroup.valid
        });
      });
    }
  }
