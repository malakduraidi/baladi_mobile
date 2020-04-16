import { Injectable } from "@angular/core";
import * as fromSaleOrderState from "../store/state";
import * as fromSaleOrderActions from "../store/actions";
import * as fromSaleOrderSelectors from "../store/selectors";
import { Store } from "@ngrx/store";
import { OdooAPI } from "../../services/odoo/services/odooAPI";

// This class is used by the effects module as well ass modelSync service

@Injectable()
export class SaleOrderRemoteOdoo {
  constructor(
    public store: Store<fromSaleOrderState.SaleOrderState>,
    public odooAPI: OdooAPI,
  ) {

    // super(store,odooAPI,odooSync,fromSaleOrderSelectors,fromSaleOrderActions)
  }

  public getRemoteModelName() {
    return "sale.order";
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
                 
               
             
                "name",
                 
               
             
                "amount_tax",
                 
               
             
                "amount_total",
                 
               
             
                "amount_untaxed",
                 
               
             
                "partner_id",
                 
               
             
                "invoice_ids",
                 
               
             
                "state",
                 
               
             
                "date_order",
                 
               
             
                "write_date",
                 
               
             
                "note",
                 
               
        
                "client_id"
          ];
      },

      onUpdate() {
        return [
         
             
               
             
                "client_id",
                 
               
             
                "name",
                 
               
             
                "amount_tax",
                 
               
             
                "amount_total",
                 
               
             
                "amount_untaxed",
                 
               
             
                "partner_id",
                 
               
             
                "invoice_ids",
                 
               
             
                "state",
                 
               
             
                "date_order",
                 
               
             
                "write_date",
                 
               
             
                "note",
                 
               
                "client_id"
          ];
      },

      onRead() {

        return [

         
             
               
             
                "client_id",
                 
               
             
                "name",
                 
               
             
                "amount_tax",
                 
               
             
                "amount_total",
                 
               
             
                "amount_untaxed",
                 
               
             
                "partner_id",
                 
               
             
                "invoice_ids",
                 
               
             
                "state",
                 
               
             
                "date_order",
                 
               
             
                "write_date",
                 
               
             
                "note",
                 
               
                "sync_ids"
          ];

      }

    };
  }

  public getRemoteFields() {


return [

         
             
               
             
                "client_id",
                 
               
             
                "name",
                 
               
             
                "amount_tax",
                 
               
             
                "amount_total",
                 
               
             
                "amount_untaxed",
                 
               
             
                "partner_id",
                 
               
             
                "invoice_ids",
                 
               
             
                "state",
                 
               
             
                "date_order",
                 
               
             
                "write_date",
                 
               
             
                "note",
                 
               
                "sync_ids"
          ];
  }



}