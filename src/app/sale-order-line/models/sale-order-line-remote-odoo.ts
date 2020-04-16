import { Injectable } from "@angular/core";
import * as fromSaleOrderLineState from "../store/state";
import * as fromSaleOrderLineActions from "../store/actions";
import * as fromSaleOrderLineSelectors from "../store/selectors";
import { Store } from "@ngrx/store";
import { OdooAPI } from "../../services/odoo/services/odooAPI";

// This class is used by the effects module as well ass modelSync service

@Injectable()
export class SaleOrderLineRemoteOdoo {
  constructor(
    public store: Store<fromSaleOrderLineState.SaleOrderLineState>,
    public odooAPI: OdooAPI,
  ) {

    // super(store,odooAPI,odooSync,fromSaleOrderLineSelectors,fromSaleOrderLineActions)
  }

  public getRemoteModelName() {
    return "sale.order.line";
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
         
             
               
             
                "client_id",
                 
               
             
                "product_id",
                 
               
             
                "order_id",
                 
               
             
                "product_uom_qty",
                 
               
             
                "price_unit",
                 
               
             
                "discount",
                 
               
             
                "price_tax",
                 
               
             
                "price_total",
                 
               
             
                "offer_id",
                 
               
             
                "write_date",
                 
               
        
                "client_id"
          ];
      },

      onUpdate() {
        return [
         
             
               
             
                "client_id",
                 
               
             
                "product_id",
                 
               
             
                "order_id",
                 
               
             
                "product_uom_qty",
                 
               
             
                "price_unit",
                 
               
             
                "discount",
                 
               
             
                "price_tax",
                 
               
             
                "price_total",
                 
               
             
                "offer_id",
                 
               
             
                "write_date",
                 
               
                "client_id"
          ];
      },

      onRead() {

        return [

         
             
               
             
                "client_id",
                 
               
             
                "product_id",
                 
               
             
                "order_id",
                 
               
             
                "product_uom_qty",
                 
               
             
                "price_unit",
                 
               
             
                "discount",
                 
               
             
                "price_tax",
                 
               
             
                "price_total",
                 
               
             
                "offer_id",
                 
               
             
                "write_date",
                 
               
                "sync_ids"
          ];

      }

    };
  }

  public getRemoteFields() {


return [

         
             
               
             
                "client_id",
                 
               
             
                "product_id",
                 
               
             
                "order_id",
                 
               
             
                "product_uom_qty",
                 
               
             
                "price_unit",
                 
               
             
                "discount",
                 
               
             
                "price_tax",
                 
               
             
                "price_total",
                 
               
             
                "offer_id",
                 
               
             
                "write_date",
                 
               
                "sync_ids"
          ];
  }



}