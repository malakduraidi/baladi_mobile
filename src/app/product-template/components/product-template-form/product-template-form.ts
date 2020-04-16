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

import { IProductTemplate} from "../../models/product-template";

@Component({
  selector: "product-template-form",
  templateUrl: "product-template-form.html",
  styleUrls: ['./product-template-form.scss']
})
export class ProductTemplateFormComponent implements OnChanges, OnDestroy {
  @Input() productTemplate: IProductTemplate;
  @Input() categ_id
  @Output()productTemplateChange = new EventEmitter < { valid: boolean;productTemplate: IProductTemplate}> ();
  @Output()
  onSubmitChange = new EventEmitter < { valid: boolean;productTemplate: IProductTemplate}> ();
  formGroup: FormGroup;
  private destroyed$ = new Subject<void>();
  @Output()
  onFocusCategory = new EventEmitter < {}> ();

  constructor(private formBuilder: FormBuilder) {
    this.buildForm();
  }

ngOnChanges(changes: SimpleChanges) {
  if (changes["productTemplate"] && changes["productTemplate"].currentValue) {
    this.formGroup.patchValue(this.productTemplate);
  }
  if (changes["categ_id"] && changes["categ_id"].currentValue) {
    let prod = Object.assign({}, this.productTemplate)
    prod.categ_id = this.categ_id.id
    this.formGroup.patchValue(prod);
  }
}

onCategoryFocus() {
  this.onFocusCategory.emit({}) 
}

submitForm() {
  this.onSubmitChange.emit({
     productTemplate: this.formGroup.value,
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
     
   name: ["",[Validators.required]],
     
   default_code: ["",[]],
     
   barcode: ["",[]],
     
   categ_id: ["",[]],
     
   list_price: ["",[]],
     
   standard_price: ["",[]],
     
   image_medium: ["",[]],
     
   image: ["",[]],
     
   write_date: ["",[]],
          
   qty_available: ["",[]],
     
   virtual_available: ["",[]],
     
   outgoing_qty: ["",[]],
     
  //  product_variant_ids: ["",[]],
     
   description: ["",[]],
     

      });


this.formGroup.valueChanges
  .pipe(takeUntil(this.destroyed$), skip(1), debounceTime(500))
  .subscribe((productTemplate: IProductTemplate) => {
  this.productTemplateChange.emit({
         productTemplate:productTemplate,
    valid: this.formGroup.valid
        });
      });
    }
  }
