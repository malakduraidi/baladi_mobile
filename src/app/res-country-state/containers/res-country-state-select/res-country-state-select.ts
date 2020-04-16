import { Component, OnInit, forwardRef, Input, EventEmitter, Output } from "@angular/core";
import { IResCountryState,ResCountryState} from "../../models/res-country-state";
import { NavParams,ModalController} from "@ionic/angular";
import { Store } from "@ngrx/store";
import * as fromResCountryStateActions from "../../store/actions";
import * as fromResCountryStateSelectors from "../../store/selectors";
import * as fromResCountryStateStore from "../../store/state";
import { ResCountryStateSelectListComponent } from '../res-country-state-select-list/res-country-state-select-list';
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
  selector: "res-country-state-select",
  templateUrl: "res-country-state-select.html",
  styleUrls: ['./res-country-state-select.scss'],
  providers: [ResCountryState,
      { 
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => ResCountryStateSelectComponent),
        multi: true
      }
  ]
})
export class ResCountryStateSelectComponent implements OnInit , ControlValueAccessor{

  @Input()
  state_id :any= 0;

  @Input()
  view_only=false

  @Input()
  placeholder:string=""

  @Output() resCountryStateOutput=new EventEmitter<IResCountryState>();

  private resCountryState: IResCountryState;
  propagateChange = (_: any) => {};


  constructor(
    public modalCtrl: ModalController,
    private resCountryStateStore: Store < fromResCountryStateStore.ResCountryStateState >
  ) {
  }

  ngOnInit() {
    // get the item if exist 
    if (this.state_id !== undefined && this.state_id !== null) {
      if (this.state_id.length > 0) {
        this.state_id = this.state_id[0]
      }
      this.resCountryStateStore.select(fromResCountryStateSelectors.
        selectById(this.state_id))
        .pipe(take(1)).subscribe((resCountryState: any) => {
          if (resCountryState && resCountryState.length > 0) {
            this.resCountryState = resCountryState[0]
          }
        }
        )
    }
  }

  writeValue(state_id: any) {
    console.log(state_id)
    // this.state_id = state_id
    if (state_id !== undefined && state_id !== null) {
      if (state_id.length > 0) {
        state_id = state_id[0]
      }
      this.resCountryStateStore.select(fromResCountryStateSelectors.
        selectById(state_id))
        .pipe(take(1)).subscribe((resCountryState: any) => {
          if (resCountryState && resCountryState.length > 0) {
            this.resCountryState = resCountryState[0]
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
      component: ResCountryStateSelectListComponent,
      componentProps: {}
    });
    modal.then((mdl) => mdl.present())
    modal.then((mdl) => mdl.onDidDismiss().then(data => {

      if(data.data){
        this.propagateChange(data.data.id)
        this.resCountryState = data.data
        this.resCountryStateOutput.emit(this.resCountryState)
      }
      
    }))
  }






}
