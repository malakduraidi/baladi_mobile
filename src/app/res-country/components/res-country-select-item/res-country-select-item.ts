import { Component, Output, Input, EventEmitter } from "@angular/core";
import { IResCountry} from "../../models/res-country";

@Component({
  selector: "res-country-select-item",
  templateUrl: "res-country-select-item.html"
})
export class ResCountrySelectItemComponent {
  @Input() resCountry: IResCountry;

  constructor() { }

  @Output() objEmitter = new EventEmitter < IResCountry> ();

  select(resCountry: IResCountry) {
    this.objEmitter.emit(resCountry);
  }
}
