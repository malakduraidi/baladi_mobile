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

import { IProductCategory} from "../../models/product-category";

@Component({
  selector: "product-category-form",
  templateUrl: "product-category-form.html",
  styleUrls: ['./product-category-form.scss']
})
export class ProductCategoryFormComponent implements OnChanges, OnDestroy {
  @Input() productCategory: IProductCategory;
  @Output()productCategoryChange = new EventEmitter < { valid: boolean;productCategory: IProductCategory}> ();
@Output()
onSubmitChange = new EventEmitter < { valid: boolean;productCategory: IProductCategory}> ();
formGroup: FormGroup;
  private destroyed$ = new Subject<void>();

constructor(private formBuilder: FormBuilder) {
  this.buildForm();
}

ngOnChanges(changes: SimpleChanges) {
  if (changes["productCategory"] && changes["productCategory"].currentValue) {
    this.formGroup.patchValue(this.productCategory);
  }
}

submitForm() {
  this.onSubmitChange.emit({
     productCategory: this.formGroup.value,
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
     
   image_medium: ["",[]],

  //  ks_categ_background: ["",[]],
     
  //  parent_id: ["",[]],
     
   write_date: ["",[]],
     
      });


this.formGroup.valueChanges
  .pipe(takeUntil(this.destroyed$), skip(1), debounceTime(500))
  .subscribe((productCategory: IProductCategory) => {
  this.productCategoryChange.emit({
         productCategory:productCategory,
    valid: this.formGroup.valid
        });
      });
    }
  }
