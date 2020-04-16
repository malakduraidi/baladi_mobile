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

import { IResCountryState} from "../../models/res-country-state";

@Component({
  selector: "res-country-state-form",
  templateUrl: "res-country-state-form.html",
  styleUrls: ['./res-country-state-form.scss']
})
export class ResCountryStateFormComponent implements OnChanges, OnDestroy {
  @Input() resCountryState: IResCountryState;
  @Output()resCountryStateChange = new EventEmitter < { valid: boolean;resCountryState: IResCountryState}> ();
@Output()
onSubmitChange = new EventEmitter < { valid: boolean;resCountryState: IResCountryState}> ();
formGroup: FormGroup;
  private destroyed$ = new Subject<void>();

constructor(private formBuilder: FormBuilder) {
  this.buildForm();
}

ngOnChanges(changes: SimpleChanges) {
  if (changes["resCountryState"] && changes["resCountryState"].currentValue) {
    this.formGroup.patchValue(this.resCountryState);
  }
}

submitForm() {
  this.onSubmitChange.emit({
     resCountryState: this.formGroup.value,
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
     
   country_id: ["",[]],
     

      });


this.formGroup.valueChanges
  .pipe(takeUntil(this.destroyed$), skip(1), debounceTime(500))
  .subscribe((resCountryState: IResCountryState) => {
  this.resCountryStateChange.emit({
         resCountryState:resCountryState,
    valid: this.formGroup.valid
        });
      });
    }
  }
