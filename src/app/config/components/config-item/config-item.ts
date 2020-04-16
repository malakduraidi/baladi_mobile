import { Component, Output, Input, EventEmitter } from "@angular/core";
import { IConfig} from "../../models/config";

@Component({
  selector: "config-item",
  templateUrl: "config-item.html",
  styleUrls: ['./config-item.scss']
})
export class ConfigItemComponent {
  @Input() config: IConfig;

  constructor() { }

  @Output() objEmitter = new EventEmitter < IConfig> ();

  select(config: IConfig) {
    this.objEmitter.emit(config);
  }
}
