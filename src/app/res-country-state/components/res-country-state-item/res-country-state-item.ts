import { Component, Output, Input, EventEmitter } from "@angular/core";
import { IResCountryState} from "../../models/res-country-state";

@Component({
  selector: "res-country-state-item",
  templateUrl: "res-country-state-item.html",
  styleUrls: ['./res-country-state-item.scss']
})
export class ResCountryStateItemComponent {
  @Input() resCountryState: IResCountryState;

  constructor() { }

  @Output() objEmitter = new EventEmitter < IResCountryState> ();

  select(resCountryState: IResCountryState) {
    this.objEmitter.emit(resCountryState);
  }
}
