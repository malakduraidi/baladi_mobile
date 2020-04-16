import { Component, Output, Input, EventEmitter } from "@angular/core";
import { IProductTemplate} from "../../models/product-template";
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: "product-template-item",
  templateUrl: "product-template-item.html",
  styleUrls: ['./product-template-item.scss']
})
export class ProductTemplateItemComponent {
  @Input() productTemplate: IProductTemplate;

  @Input() viewType: string;

  convertedImage: any;

  constructor(private sanitizer:DomSanitizer) { }

  @Output() objEmitter = new EventEmitter < IProductTemplate> ();
  @Output() loadImage = new EventEmitter <Number> ();

  // malak : when select product emit it to product-template-list-dynamic
  select(productTemplate: IProductTemplate) {
    this.objEmitter.emit(productTemplate);
  }

  // malak : init component
  ngOnInit(){
    if(this.productTemplate)
    {
      // malak : if image not loaded yet then load it
      if(this.productTemplate && this.productTemplate.image_medium == undefined )
      {
        // then fetch the image 
        this.loadImage.emit(this.productTemplate.id)
      }
      // malak : convert image for product
      this.convertedImage=this.sanitizer.bypassSecurityTrustUrl (
        "data:image/jpeg;base64," + this.productTemplate.image_medium)
     }
  }
  
}
