import { Component, OnInit, forwardRef, Input, Output } from "@angular/core";
import { IResCountry,ResCountry} from "../../models/res-country";
import { ModalController} from "@ionic/angular";
import { Store } from "@ngrx/store";
import * as fromResCountryActions from "../../store/actions";
import * as fromResCountrySelectors from "../../store/selectors";
import * as fromResCountryStore from "../../store/state";
import { ResCountrySelectListComponent } from '../res-country-select-list/res-country-select-list';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormControl } from '@angular/forms';
import { take } from 'rxjs/operators';
import { EventEmitter } from '@angular/core';



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
  selector: "res-country-select",
  templateUrl: "res-country-select.html",
  styleUrls: ['./res-country-select.scss'],
  providers: [ResCountry,
      { 
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => ResCountrySelectComponent),
        multi: true
      }
  ]
})
export class ResCountrySelectComponent implements OnInit , ControlValueAccessor{

  @Input()
  country_id :any= 0;

  @Input()
  view_only=false

  @Input()
  placeholder:string=""

  @Output() resCountryOutput=new EventEmitter<IResCountry>();

  private resCountry: IResCountry;
  propagateChange = (_: any) => {};


  constructor(
    public modalCtrl: ModalController,
    private resCountryStore: Store < fromResCountryStore.ResCountryState >
  ) {
  }

  ngOnInit() {
    // get the item if exist 
    if (this.country_id !== undefined && this.country_id !== null) {
      if (this.country_id.length > 0) {
        this.country_id = this.country_id[0]
      }
      this.resCountryStore.select(fromResCountrySelectors.
        selectById(this.country_id))
        .pipe(take(1)).subscribe((resCountry: any) => {
          if (resCountry && resCountry.length > 0) {
            this.resCountry = resCountry[0]
          }
        }
        )
    }
  }

  writeValue(country_id: any) {
    console.log(country_id)
    // this.country_id = country_id
    if (country_id !== undefined && country_id !== null) {
      if (country_id.length > 0) {
        country_id = country_id[0]
      }
      this.resCountryStore.select(fromResCountrySelectors.
        selectById(country_id))
        .pipe(take(1)).subscribe((resCountry: any) => {
          if (resCountry && resCountry.length > 0) {
            this.resCountry = resCountry[0]
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
      component: ResCountrySelectListComponent,
      componentProps: {}
    });
    modal.then((mdl) => mdl.present())
    modal.then((mdl) => mdl.onDidDismiss().then(data => {
      if (data.data){
        this.propagateChange(data.data.id)
        this.resCountry = data.data
        this.resCountryOutput.emit(this.resCountry)
      }
      
    }))
  }






}
