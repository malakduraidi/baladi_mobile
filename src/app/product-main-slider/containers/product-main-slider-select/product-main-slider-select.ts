import { Component, OnInit, forwardRef, Input } from "@angular/core";
import { IProductMainSlider,ProductMainSlider} from "../../models/product-main-slider";
import { ModalController} from "@ionic/angular";
import { Store } from "@ngrx/store";
import * as fromProductMainSliderActions from "../../store/actions";
import * as fromProductMainSliderSelectors from "../../store/selectors";
import * as fromProductMainSliderStore from "../../store/state";
import { ProductMainSliderSelectListComponent } from '../product-main-slider-select-list/product-main-slider-select-list';
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
  selector: "product-main-slider-select",
  templateUrl: "product-main-slider-select.html",
  styleUrls: ['./product-main-slider-select.scss'],
  providers: [ProductMainSlider,
      { 
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => ProductMainSliderSelectComponent),
        multi: true
      }
  ]
})
export class ProductMainSliderSelectComponent implements OnInit , ControlValueAccessor{

  @Input()
  training_place_id :any= 0;

  @Input()
  view_only=false

  private productMainSlider: IProductMainSlider;
  propagateChange = (_: any) => {};


  constructor(
    public modalCtrl: ModalController,
    private productMainSliderStore: Store < fromProductMainSliderStore.ProductMainSliderState >
  ) {
  }

  ngOnInit() {
    // get the item if exist 
    if (this.training_place_id !== undefined && this.training_place_id !== null) {
      if (this.training_place_id.length > 0) {
        this.training_place_id = this.training_place_id[0]
      }
      this.productMainSliderStore.select(fromProductMainSliderSelectors.
        selectById(this.training_place_id))
        .pipe(take(1)).subscribe((productMainSlider: any) => {
          if (productMainSlider && productMainSlider.length > 0) {
            this.productMainSlider = productMainSlider[0]
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
      this.productMainSliderStore.select(fromProductMainSliderSelectors.
        selectById(training_place_id))
        .pipe(take(1)).subscribe((productMainSlider: any) => {
          if (productMainSlider && productMainSlider.length > 0) {
            this.productMainSlider = productMainSlider[0]
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
      component: ProductMainSliderSelectListComponent,
      componentProps: {}
    });
    modal.then((mdl) => mdl.present())
    modal.then((mdl) => mdl.onDidDismiss().then(data => {
      this.propagateChange(data.data.id)
      this.productMainSlider = data.data
    }))
  }






}
