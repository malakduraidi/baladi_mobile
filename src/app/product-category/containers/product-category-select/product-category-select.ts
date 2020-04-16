import { Component, OnInit, forwardRef, Input, Output, EventEmitter } from "@angular/core";
import { IProductCategory,ProductCategory} from "../../models/product-category";
import { ModalController} from "@ionic/angular";
import { Store } from "@ngrx/store";
import * as fromProductCategoryActions from "../../store/actions";
import * as fromProductCategorySelectors from "../../store/selectors";
import * as fromProductCategoryStore from "../../store/state";
import { ProductCategorySelectListComponent } from '../product-category-select-list/product-category-select-list';
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
  selector: "product-category-select",
  templateUrl: "product-category-select.html",
  styleUrls: ['./product-category-select.scss'],
  providers: [ProductCategory,
      { 
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => ProductCategorySelectComponent),
        multi: true
      }
  ]
})
export class ProductCategorySelectComponent implements OnInit , ControlValueAccessor{

  @Input()
  categ_id :any= 0;

  @Input()
  view_only=false

  @Output() productCategoryOutput=new EventEmitter<IProductCategory>();
  
  private productCategory: IProductCategory;
  propagateChange = (_: any) => {};


  constructor(
    // public navParams: NavParams,
    public modalCtrl: ModalController,
    private productCategoryStore: Store < fromProductCategoryStore.ProductCategoryState >
  ) {
  }

  ngOnInit() {
    // get the item if exist 
    if (this.categ_id !== undefined && this.categ_id !== null) {
      if (this.categ_id.length > 0) {
        this.categ_id = this.categ_id[0]
      }
      this.productCategoryStore.select(fromProductCategorySelectors.
        selectById(this.categ_id))
        .pipe(take(1)).subscribe((productCategory: any) => {
          if (productCategory && productCategory.length > 0) {
            this.productCategory = productCategory[0]
          }
        }
        )
    }
  }

  writeValue(categ_id: any) {
    console.log(categ_id)
    if (categ_id !== undefined && categ_id !== null) {
      if (categ_id.length > 0) {
        categ_id = categ_id[0]
      }
      this.productCategoryStore.select(fromProductCategorySelectors.
        selectById(categ_id))
        .pipe(take(1)).subscribe((productCategory: any) => {
          if (productCategory && productCategory.length > 0) {
            this.productCategory = productCategory[0]
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
      component: ProductCategorySelectListComponent,
      componentProps: {}
    });
    modal.then((mdl) => mdl.present())
    modal.then((mdl) => mdl.onDidDismiss().then(data => {
      if(data.data){
        this.propagateChange(data.data.id)
        this.productCategory = data.data
        this.productCategoryOutput.emit(this.categ_id)
      }
    }))
  }






}
