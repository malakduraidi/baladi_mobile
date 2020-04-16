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

import { IProductMainSlider} from "../../models/product-main-slider";

@Component({
  selector: "product-main-slider-form",
  templateUrl: "product-main-slider-form.html",
  styleUrls: ['./product-main-slider-form.scss']
})
export class ProductMainSliderFormComponent implements OnChanges, OnDestroy {
  @Input() productMainSlider: IProductMainSlider;
  @Output()productMainSliderChange = new EventEmitter < { valid: boolean;productMainSlider: IProductMainSlider}> ();
@Output()
onSubmitChange = new EventEmitter < { valid: boolean;productMainSlider: IProductMainSlider}> ();
formGroup: FormGroup;
  private destroyed$ = new Subject<void>();

constructor(private formBuilder: FormBuilder) {
  this.buildForm();
}

ngOnChanges(changes: SimpleChanges) {
  if (changes["productMainSlider"] && changes["productMainSlider"].currentValue) {
    this.formGroup.patchValue(this.productMainSlider);
  }
}

submitForm() {
  this.onSubmitChange.emit({
     productMainSlider: this.formGroup.value,
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
     
   ks_main_slider_img: ["",[]],
     
   ks_main_slider_link: ["",[]],
     
   sequence: ["",[]],
     

      });


this.formGroup.valueChanges
  .pipe(takeUntil(this.destroyed$), skip(1), debounceTime(500))
  .subscribe((productMainSlider: IProductMainSlider) => {
  this.productMainSliderChange.emit({
         productMainSlider:productMainSlider,
    valid: this.formGroup.valid
        });
      });
    }
  }
