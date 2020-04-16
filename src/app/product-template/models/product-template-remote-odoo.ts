import { Injectable } from "@angular/core";
import * as fromProductTemplateState from "../store/state";
import * as fromProductTemplateActions from "../store/actions";
import * as fromProductTemplateSelectors from "../store/selectors";
import { Store } from "@ngrx/store";
import { OdooAPI } from "../../services/odoo/services/odooAPI";

// This class is used by the effects module as well ass modelSync service

@Injectable()
export class ProductTemplateRemoteOdoo {
  constructor(
    public store: Store<fromProductTemplateState.ProductTemplateState>,
    public odooAPI: OdooAPI,
  ) {

    // super(store,odooAPI,odooSync,fromProductTemplateSelectors,fromProductTemplateActions)
  }

  public getRemoteModelName() {
    return "product.template";
  }


  public getMetaDomain() {
    return [];
  }

  public getRelationalField() {
    var me = this;
    let rel_fields = {};
    return rel_fields;
  }


  public getBinaryField(): any {
    let bin_fields = {};

    return bin_fields;
  }

  public remoteFields() {
    return {

      onCreate() {
        return [
         
             
               
             
                "name",
                 
               
             
                "default_code",
                 
               
             
                "barcode",
                 
               
             
                "categ_id",
                 
               
             
                "list_price",
                 
               
             
                "standard_price",
                 
               
             
                "image_medium",
                 
               
             
                "image",
                 
               
             
                "write_date",
                 
               
             
                "discount",
                 
               
             
                "qty_available",
                 
               
             
                "virtual_available",
                 
               
             
                "outgoing_qty",
                 
               
             
                "product_variant_ids",
                 
               
             
                "description",
                 
               
        
                "client_id"
          ];
      },

      onUpdate() {
        return [
         
             
               
             
                "name",
                 
               
             
                "default_code",
                 
               
             
                "barcode",
                 
               
             
                "categ_id",
                 
               
             
                "list_price",
                 
               
             
                "standard_price",
                 
               
             
                "image_medium",
                 
               
             
                "image",
                 
               
             
                "write_date",
                 
               
             
                "discount",
                 
               
             
                "qty_available",
                 
               
             
                "virtual_available",
                 
               
             
                "outgoing_qty",
                 
               
             
                "product_variant_ids",
                 
               
             
                "description",
                 
               
                "client_id"
          ];
      },

      onRead() {

        return [

         
             
               
             
                "name",
                 
               
             
                "default_code",
                 
               
             
                "barcode",
                 
               
             
                "categ_id",
                 
               
             
                "list_price",
                 
               
             
                "standard_price",
                 
               
             
                "image_medium",
                 
               
             
                "image",
                 
               
             
                "write_date",
                 
               
             
                "discount",
                 
               
             
                "qty_available",
                 
               
             
                "virtual_available",
                 
               
             
                "outgoing_qty",
                 
               
             
                "product_variant_ids",
                 
               
             
                "description",
                 
               
                "sync_ids"
          ];

      }

    };
  }

  public getRemoteFields() {


return [

         
             
               
             
                "name",
                 
               
             
                "default_code",
                 
               
             
                "barcode",
                 
               
             
                "categ_id",
                 
               
             
                "list_price",
                 
               
             
                "standard_price",
                 
               
             
                "image_medium",
                 
               
             
                "image",
                 
               
             
                "write_date",
                 
               
             
                "discount",
                 
               
             
                "qty_available",
                 
               
             
                "virtual_available",
                 
               
             
                "outgoing_qty",
                 
               
             
                "product_variant_ids",
                 
               
             
                "description",
                 
               
                "sync_ids"
          ];
  }



}