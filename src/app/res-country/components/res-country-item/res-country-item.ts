import { Component, Output, Input, EventEmitter } from "@angular/core";
import { IResCountry} from "../../models/res-country";

@Component({
  selector: "res-country-item",
  templateUrl: "res-country-item.html",
  styleUrls: ['./res-country-item.scss']
})
export class ResCountryItemComponent {
  @Input() resCountry: IResCountry;

  constructor() { }

  @Output() objEmitter = new EventEmitter < IResCountry> ();

  select(resCountry: IResCountry) {
    this.objEmitter.emit(resCountry);
  }
}
