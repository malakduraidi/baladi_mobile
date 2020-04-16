import { Component, Output, Input, EventEmitter } from "@angular/core";
import { IProductCategory} from "../../models/product-category";
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: "product-category-item",
  templateUrl: "product-category-item.html",
  styleUrls: ['./product-category-item.scss']
})
export class ProductCategoryItemComponent {
  @Input() productCategory: IProductCategory;
  @Input() viewType: string;
  convertedImage: any;

  constructor(private sanitizer:DomSanitizer) {

   }

   ngOnInit(){
    this.convertedImage=this.sanitizer.bypassSecurityTrustUrl (

      "data:image/jpeg;base64," + this.productCategory.image_medium)

   }

  @Output() objEmitter = new EventEmitter < IProductCategory> ();

  select(productCategory: IProductCategory) {
    this.objEmitter.emit(productCategory);
  }
}
