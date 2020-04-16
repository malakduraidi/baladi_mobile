import { Component, Output, Input, EventEmitter } from "@angular/core";
import { ISaleOrderLine} from "../../models/sale-order-line";
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: "sale-order-line-cart-item",
  templateUrl: "sale-order-line-cart-item.html",
  styleUrls: ['./sale-order-line-cart-item.scss']
})
export class SaleOrderLineCartItemComponent {
  @Input() cart: any;
  convertedImage: any;
  @Output() addToCart = new EventEmitter <{}> ();
  @Output() removeFromCart = new EventEmitter <{}> ();
  @Output() removeAllTheCart = new EventEmitter <{}> ();
  @Output() viewProduct = new EventEmitter <{}> ();

  constructor(
      private sanitizer:DomSanitizer

  ) { 
  }
  ngOnInit(){

    if(this.cart.product.image)
    {

    this.convertedImage=this.sanitizer.bypassSecurityTrustUrl (
      "data:image/jpeg;base64," + this.cart.product.image)

    }
    else if(this.cart.product.image==undefined)
    {
      // then load
    }
    else {
      // just show empty image
    }

  }

  @Output() objEmitter = new EventEmitter < ISaleOrderLine> ();

  select(saleOrderLine: ISaleOrderLine) {
    this.objEmitter.emit(saleOrderLine);
  }
  quantityMinus(cart){

    this.removeFromCart.emit(cart)
  }

  quantityPlus(cart){
    this.addToCart.emit(cart)
  }

  getSingleProductDetail(product){
    this.viewProduct.emit(product)
  }

  removeCart(cart){
    this.removeAllTheCart.emit(cart)
  }

}
