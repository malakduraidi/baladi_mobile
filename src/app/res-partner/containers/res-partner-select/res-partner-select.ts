import { Component, OnInit, forwardRef, Input } from "@angular/core";
import { IResPartner,ResPartner} from "../../models/res-partner";
import { ModalController} from "@ionic/angular";
import { Store } from "@ngrx/store";
import * as fromResPartnerActions from "../../store/actions";
import * as fromResPartnerSelectors from "../../store/selectors";
import * as fromResPartnerStore from "../../store/state";
import { ResPartnerSelectListComponent } from '../res-partner-select-list/res-partner-select-list';
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
  selector: "res-partner-select",
  templateUrl: "res-partner-select.html",
  styleUrls: ['./res-partner-select.scss'],
  providers: [ResPartner,
      { 
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => ResPartnerSelectComponent),
        multi: true
      }
  ]
})
export class ResPartnerSelectComponent implements OnInit , ControlValueAccessor{

  @Input()
  training_place_id :any= 0;

  @Input()
  view_only=false

  private resPartner: IResPartner;
  propagateChange = (_: any) => {};


  constructor(
    public modalCtrl: ModalController,
    private resPartnerStore: Store < fromResPartnerStore.ResPartnerState >
  ) {
  }

  ngOnInit() {
    // get the item if exist 
    if (this.training_place_id !== undefined && this.training_place_id !== null) {
      if (this.training_place_id.length > 0) {
        this.training_place_id = this.training_place_id[0]
      }
      this.resPartnerStore.select(fromResPartnerSelectors.
        selectById(this.training_place_id))
        .pipe(take(1)).subscribe((resPartner: any) => {
          if (resPartner && resPartner.length > 0) {
            this.resPartner = resPartner[0]
          }
        }
        )
    }
  }

  writeValue(training_place_id: any) {
    console.log(training_place_id)
    // this.training_place_id = training_place_id
    if (training_place_id !== undefined && training_place_id !== null) {
      if (training_place_id.length > 0) {
        training_place_id = training_place_id[0]
      }
      this.resPartnerStore.select(fromResPartnerSelectors.
        selectById(training_place_id))
        .pipe(take(1)).subscribe((resPartner: any) => {
          if (resPartner && resPartner.length > 0) {
            this.resPartner = resPartner[0]
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
      component: ResPartnerSelectListComponent,
      componentProps: {}
    });
    modal.then((mdl) => mdl.present())
    modal.then((mdl) => mdl.onDidDismiss().then(data => {
      this.propagateChange(data.data.id)
      this.resPartner = data.data
    }))
  }






}
