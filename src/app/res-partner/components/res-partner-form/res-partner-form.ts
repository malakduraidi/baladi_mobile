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

import { IResPartner} from "../../models/res-partner";

@Component({
  selector: "res-partner-form",
  templateUrl: "res-partner-form.html",
  styleUrls: ['./res-partner-form.scss']
})
export class ResPartnerFormComponent implements OnChanges, OnDestroy {
  @Input() resPartner: IResPartner;
  @Output()resPartnerChange = new EventEmitter < { valid: boolean;resPartner: IResPartner}> ();
@Output()
onSubmitChange = new EventEmitter < { valid: boolean;resPartner: IResPartner}> ();
formGroup: FormGroup;
  private destroyed$ = new Subject<void>();

constructor(private formBuilder: FormBuilder) {
  this.buildForm();
}

ngOnChanges(changes: SimpleChanges) {
  if (changes["resPartner"] && changes["resPartner"].currentValue) {
    this.formGroup.patchValue(this.resPartner);
  }
}

submitForm() {
  this.onSubmitChange.emit({
     resPartner: this.formGroup.value,
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
     
   uid: ["",[]],
     
   login: ["",[]],
     
   password: ["",[]],
     
   state_id: ["",[]],
     
   country_id: ["",[]],
     
   lang: ["",[]],
     
   name: ["",[Validators.required]],
     
   active: ["",[]],
     
   mobile: ["",[]],
     
   phone: ["",[]],
     
   image: ["",[]],
     
   birthdate: ["",[]],
     
   lat: ["",[]],
     
   long: ["",[]],
     
   email: ["",[]],
     
   gender: ["",[]],
     
   credit: ["",[]],
     
   debit: ["",[]],
     
   credit_limit: ["",[]],
     
   property_product_pricelist: ["",[]],
     
   write_date: ["",[]],
     

      });


this.formGroup.valueChanges
  .pipe(takeUntil(this.destroyed$), skip(1), debounceTime(500))
  .subscribe((resPartner: IResPartner) => {
  this.resPartnerChange.emit({
         resPartner:resPartner,
    valid: this.formGroup.valid
        });
      });
    }
  }
