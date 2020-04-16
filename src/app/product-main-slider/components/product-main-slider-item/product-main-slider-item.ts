import { Component, Output, Input, EventEmitter } from "@angular/core";
import { IProductMainSlider} from "../../models/product-main-slider";
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: "product-main-slider-item",
  templateUrl: "product-main-slider-item.html",
  styleUrls: ['./product-main-slider-item.scss']
})
export class ProductMainSliderItemComponent {
  @Input() productMainSlider: IProductMainSlider;
  convertedImage: any;

  constructor(private sanitizer:DomSanitizer) { }

  @Output() objEmitter = new EventEmitter < IProductMainSlider> ();

  ngOnInit(){
    this.convertedImage=this.sanitizer.bypassSecurityTrustUrl (
      "data:image/jpeg;base64," + this.productMainSlider.ks_main_slider_img)

   }
  

  select(productMainSlider: IProductMainSlider) {
    this.objEmitter.emit(productMainSlider);
  }
}
