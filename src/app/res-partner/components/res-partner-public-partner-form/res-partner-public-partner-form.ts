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
  Validators,
  FormControl
} from "@angular/forms";

import { takeUntil, debounceTime, skip } from "rxjs/operators";
import { Subject, Observable } from "rxjs";

import { IResPartner} from "../../models/res-partner";
import { IResCountryState } from 'src/app/res-country-state/models/res-country-state';
import { IResCountry } from 'src/app/res-country/models/res-country';
import { FormValidationService } from 'src/providers/formValidation.service';

@Component({
  selector: "res-partner-public-partner-form",
  templateUrl: "res-partner-public-partner-form.html",
  styleUrls: ['./res-partner-public-partner-form.scss']
})
export class ResPartnerPublicPartnerFormComponent implements OnChanges, OnDestroy {
  @Input() resPartner: IResPartner;
  @Input() resCountry: IResCountry;
  @Output() resCountryChange= new EventEmitter<Number>();
  @Output() resCountryStateChange= new EventEmitter<Number>();
  @Input() resCountryState: IResCountryState;
  @Output()resPartnerChange = new EventEmitter < { valid: boolean;resPartner: IResPartner}> ();
@Output()
onSubmitChange = new EventEmitter < { valid: boolean;resPartner: IResPartner}> ();
@Input() submitAttempt$: Observable<void>;

formGroup: FormGroup;
  private destroyed$ = new Subject<void>();
  validation_messages:any
  submitAttempt: boolean;
  submitAttemptSubscription: any;

constructor(private formBuilder: FormBuilder) {
  this.buildForm();
}

ngOnInit(){
  this.submitAttemptSubscription=this.submitAttempt$.subscribe(() => {
    this.submitAttempt=true

  });

}

ngOnChanges(changes: SimpleChanges) {
  if (changes["resPartner"] && changes["resPartner"].currentValue) {
    this.formGroup.patchValue(this.resPartner);

  }
if (changes["resCountry"] && changes["resCountry"].currentValue) {

    let partner=Object.assign({},this.resPartner)
    partner.country_id=this.resCountry.id
    this.formGroup.patchValue(partner);

  }

if (changes["resCountryState"] && changes["resCountryState"].currentValue) {
  let partner=Object.assign({},this.resPartner)
    partner.state_id=this.resCountryState.id
    this.formGroup.patchValue(partner);
  }

}



ngOnDestroy() {
  this.destroyed$.next();
  this.destroyed$.complete();
  this.submitAttemptSubscription.next()
  this.submitAttemptSubscription.complete()
}


buildForm() {
  // this.formGroup = this.formBuilder.group({
     
  //  state_id: ["",[]],
     
  //  country_id: ["",[]],
     
  //  name: ["",[Validators.required]],
     
  //  mobile: ["",[]],
     
  // //  lat: ["",[]],
     
  // //  long: ["",[]],
     
  // //  email: ["",[]],
     
  //     });
this.formGroup = this.formBuilder.group({
          name: new FormControl(
            '',
            Validators.compose([
              Validators.required,
              Validators.minLength(3),
              Validators.maxLength(15)
            ])
          ),
          mobile: new FormControl(
            '',
            Validators.compose([
              Validators.required,
              FormValidationService.mobileNumberValidator()
            ])
          ),
          country_id: new FormControl('', Validators.compose([Validators.required])),
          state_id: new FormControl('', Validators.compose([Validators.required])),
          
        });
    
        this.validation_messages = {
          name: [
            {
              type: 'required',
              message: FormValidationService.getValidatorErrorMessage('required')
            },
            {
              type: 'minlength',
              message: FormValidationService.getValidatorErrorMessage('minLength', {
                requiredLength: 3
              })
            },
            {
              type: 'maxlength',
              message: FormValidationService.getValidatorErrorMessage('maxLength', {
                requiredLength: 15
              })
            }
          ],
          mobile: [
            {
              type: 'required',
              message: FormValidationService.getValidatorErrorMessage('required')
            },
            {
              type: 'invalidMobileNumber',
              message: FormValidationService.getValidatorErrorMessage(
                'invalidMobileNumber'
              )
            }
          ],
          country_id: [{ type: 'required', message: 'THIS_FIELD_IS_REQUIRED' }],
          state_id: [{ type: 'required', message: 'THIS_FIELD_IS_REQUIRED' }],
        };

this.formGroup.valueChanges
  .pipe(takeUntil(this.destroyed$), skip(1), debounceTime(500))
  .subscribe((resPartner: IResPartner) => {
  this.resPartnerChange.emit({
         resPartner:resPartner,
    valid: this.formGroup.valid
        });
      });

        
    

    }


    selectState(){ this.resCountryStateChange.emit(this.resCountry.id) }
    selectCountry(){ this.resCountryChange.emit() }

  }
