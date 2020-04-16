import { Component, OnInit, forwardRef, Input } from "@angular/core";
import { IConfig,Config} from "../../models/config";
import { ModalController} from "@ionic/angular";
import { Store } from "@ngrx/store";
import * as fromConfigActions from "../../store/actions";
import * as fromConfigSelectors from "../../store/selectors";
import * as fromConfigStore from "../../store/state";
import { ConfigSelectListComponent } from '../config-select-list/config-select-list';
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
  selector: "config-select",
  templateUrl: "config-select.html",
  styleUrls: ['./config-select.scss'],
  providers: [Config,
      { 
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => ConfigSelectComponent),
        multi: true
      }
  ]
})
export class ConfigSelectComponent implements OnInit , ControlValueAccessor{

  @Input()
  training_place_id :any= 0;

  @Input()
  view_only=false

  private config: IConfig;
  propagateChange = (_: any) => {};


  constructor(
    public modalCtrl: ModalController,
    private configStore: Store < fromConfigStore.ConfigState >
  ) {
  }

  ngOnInit() {
    // get the item if exist 
    if (this.training_place_id !== undefined && this.training_place_id !== null) {
      if (this.training_place_id.length > 0) {
        this.training_place_id = this.training_place_id[0]
      }
      this.configStore.select(fromConfigSelectors.
        selectById(this.training_place_id))
        .pipe(take(1)).subscribe((config: any) => {
          if (config && config.length > 0) {
            this.config = config[0]
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
      this.configStore.select(fromConfigSelectors.
        selectById(training_place_id))
        .pipe(take(1)).subscribe((config: any) => {
          if (config && config.length > 0) {
            this.config = config[0]
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
      component: ConfigSelectListComponent,
      componentProps: {}
    });
    modal.then((mdl) => mdl.present())
    modal.then((mdl) => mdl.onDidDismiss().then(data => {
      this.propagateChange(data.data.id)
      this.config = data.data
    }))
  }






}
