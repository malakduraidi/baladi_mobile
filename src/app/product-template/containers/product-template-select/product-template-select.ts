import { Component, OnInit, forwardRef, Input } from "@angular/core";
import { IProductTemplate,ProductTemplate} from "../../models/product-template";
import { ModalController} from "@ionic/angular";
import { Store } from "@ngrx/store";
import * as fromProductTemplateActions from "../../store/actions";
import * as fromProductTemplateSelectors from "../../store/selectors";
import * as fromProductTemplateStore from "../../store/state";
import { ProductTemplateSelectListComponent } from '../product-template-select-list/product-template-select-list';
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
  selector: "product-template-select",
  templateUrl: "product-template-select.html",
  styleUrls: ['./product-template-select.scss'],
  providers: [ProductTemplate,
      { 
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => ProductTemplateSelectComponent),
        multi: true
      }
  ]
})
export class ProductTemplateSelectComponent implements OnInit , ControlValueAccessor{

  @Input()
  training_place_id :any= 0;

  @Input()
  view_only=false

  private productTemplate: IProductTemplate;
  propagateChange = (_: any) => {};


  constructor(
    public modalCtrl: ModalController,
    private productTemplateStore: Store < fromProductTemplateStore.ProductTemplateState >
  ) {
  }

  ngOnInit() {
    // get the item if exist 
    if (this.training_place_id !== undefined && this.training_place_id !== null) {
      if (this.training_place_id.length > 0) {
        this.training_place_id = this.training_place_id[0]
      }
      this.productTemplateStore.select(fromProductTemplateSelectors.
        selectById(this.training_place_id))
        .pipe(take(1)).subscribe((productTemplate: any) => {
          if (productTemplate && productTemplate.length > 0) {
            this.productTemplate = productTemplate[0]
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
      this.productTemplateStore.select(fromProductTemplateSelectors.
        selectById(training_place_id))
        .pipe(take(1)).subscribe((productTemplate: any) => {
          if (productTemplate && productTemplate.length > 0) {
            this.productTemplate = productTemplate[0]
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
      component: ProductTemplateSelectListComponent,
      componentProps: {}
    });
    modal.then((mdl) => mdl.present())
    modal.then((mdl) => mdl.onDidDismiss().then(data => {
      this.propagateChange(data.data.id)
      this.productTemplate = data.data
    }))
  }






}
