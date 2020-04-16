import { Component, Output, Input, EventEmitter } from "@angular/core";
import { IConfig} from "../../models/config";

@Component({
  selector: "config-select-item",
  templateUrl: "config-select-item.html"
})
export class ConfigSelectItemComponent {
  @Input() config: IConfig;

  constructor() { }

  @Output() objEmitter = new EventEmitter < IConfig> ();

  select(config: IConfig) {
    this.objEmitter.emit(config);
  }
}
