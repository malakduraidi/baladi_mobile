import { Component, Output, Input, EventEmitter } from "@angular/core";
import { IProductCategory} from "../../models/product-category";
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: "product-category-item-manager",
  templateUrl: "product-category-item-manager.html",
  styleUrls: ['./product-category-item-manager.scss']
})
export class ProductCategoryItemManagerComponent {
  @Input() productCategory: IProductCategory;

  @Input() viewType: string;
  
  convertedImage: any;

  constructor(private sanitizer:DomSanitizer) { }

  @Output() objEmitter = new EventEmitter < IProductCategory> ();
  @Output() loadImage = new EventEmitter <Number> ();

  // malak : when select product category emit it to product-category-list-manager
  select(productCategory: IProductCategory) {
    this.objEmitter.emit(productCategory);
  }

  // malak : init component
  ngOnInit(){
    if(this.productCategory)
    {
      // malak : if image not loaded yet then load it
      if(this.productCategory && this.productCategory.image_medium == undefined )
      {
        // then fetch the image 
        this.loadImage.emit(this.productCategory.id)
      }
      // malak : convert image for product
      this.convertedImage=this.sanitizer.bypassSecurityTrustUrl (
        "data:image/jpeg;base64," + this.productCategory.image_medium)
      }

   }

}
