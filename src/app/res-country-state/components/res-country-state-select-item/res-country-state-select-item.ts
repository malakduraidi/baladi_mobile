import { Component, Output, Input, EventEmitter } from "@angular/core";
import { IResCountryState} from "../../models/res-country-state";

@Component({
  selector: "res-country-state-select-item",
  templateUrl: "res-country-state-select-item.html"
})
export class ResCountryStateSelectItemComponent {
  @Input() resCountryState: IResCountryState;

  constructor() { }

  @Output() objEmitter = new EventEmitter < IResCountryState> ();

  select(resCountryState: IResCountryState) {
    this.objEmitter.emit(resCountryState);
  }
}
