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

import { IResCountry} from "../../models/res-country";

@Component({
  selector: "res-country-form",
  templateUrl: "res-country-form.html",
  styleUrls: ['./res-country-form.scss']
})
export class ResCountryFormComponent implements OnChanges, OnDestroy {
  @Input() resCountry: IResCountry;
  @Output()resCountryChange = new EventEmitter < { valid: boolean;resCountry: IResCountry}> ();
@Output()
onSubmitChange = new EventEmitter < { valid: boolean;resCountry: IResCountry}> ();
formGroup: FormGroup;
  private destroyed$ = new Subject<void>();

constructor(private formBuilder: FormBuilder) {
  this.buildForm();
}

ngOnChanges(changes: SimpleChanges) {
  if (changes["resCountry"] && changes["resCountry"].currentValue) {
    this.formGroup.patchValue(this.resCountry);
  }
}

submitForm() {
  this.onSubmitChange.emit({
     resCountry: this.formGroup.value,
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
     
   name: ["",[]],
     
   code: ["",[]],
     

      });


this.formGroup.valueChanges
  .pipe(takeUntil(this.destroyed$), skip(1), debounceTime(500))
  .subscribe((resCountry: IResCountry) => {
  this.resCountryChange.emit({
         resCountry:resCountry,
    valid: this.formGroup.valid
        });
      });
    }
  }
