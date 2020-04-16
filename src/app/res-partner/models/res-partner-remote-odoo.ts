import { Injectable } from "@angular/core";
import * as fromResPartnerState from "../store/state";
import * as fromResPartnerActions from "../store/actions";
import * as fromResPartnerSelectors from "../store/selectors";
import { Store } from "@ngrx/store";
import { OdooAPI } from "../../services/odoo/services/odooAPI";

// This class is used by the effects module as well ass modelSync service

@Injectable()
export class ResPartnerRemoteOdoo {
  constructor(
    public store: Store<fromResPartnerState.ResPartnerState>,
    public odooAPI: OdooAPI,
  ) {

    // super(store,odooAPI,odooSync,fromResPartnerSelectors,fromResPartnerActions)
  }

  public getRemoteModelName() {
    return "res.partner";
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
         
             
               
             
                "uid",
                 
               
             
                "login",
                 
               
             
                "password",
                 
               
             
                "state_id",
                 
               
             
                "country_id",
                 
               
             
                "lang",
                 
               
             
                "name",
                 
               
             
                "active",
                 
               
             
                "mobile",
                 
               
             
                "phone",
                 
               
             
                "image",
                 
               
             
                "birthdate",
                 
               
             
                "lat",
                 
               
             
                "long",
                 
               
             
                "email",
                 
               
             
                "gender",
                 
               
             
                "credit",
                 
               
             
                "debit",
                 
               
             
                "credit_limit",
                 
               
             
                "property_product_pricelist",
                 
               
             
                "write_date",
                 
               
        
                "client_id"
          ];
      },

      onUpdate() {
        return [
         
             
               
             
                "uid",
                 
               
             
                "login",
                 
               
             
                "password",
                 
               
             
                "state_id",
                 
               
             
                "country_id",
                 
               
             
                "lang",
                 
               
             
                "name",
                 
               
             
                "active",
                 
               
             
                "mobile",
                 
               
             
                "phone",
                 
               
             
                "image",
                 
               
             
                "birthdate",
                 
               
             
                "lat",
                 
               
             
                "long",
                 
               
             
                "email",
                 
               
             
                "gender",
                 
               
             
                "credit",
                 
               
             
                "debit",
                 
               
             
                "credit_limit",
                 
               
             
                "property_product_pricelist",
                 
               
             
                "write_date",
                 
               
                "client_id"
          ];
      },

      onRead() {

        return [

         
             
               
             
                "uid",
                 
               
             
                "login",
                 
               
             
                "password",
                 
               
             
                "state_id",
                 
               
             
                "country_id",
                 
               
             
                "lang",
                 
               
             
                "name",
                 
               
             
                "active",
                 
               
             
                "mobile",
                 
               
             
                "phone",
                 
               
             
                "image",
                 
               
             
                "birthdate",
                 
               
             
                "lat",
                 
               
             
                "long",
                 
               
             
                "email",
                 
               
             
                "gender",
                 
               
             
                "credit",
                 
               
             
                "debit",
                 
               
             
                "credit_limit",
                 
               
             
                "property_product_pricelist",
                 
               
             
                "write_date",
                 
               
                "sync_ids"
          ];

      }

    };
  }

  public getRemoteFields() {


return [

         
             
               
             
                "uid",
                 
               
             
                "login",
                 
               
             
                "password",
                 
               
             
                "state_id",
                 
               
             
                "country_id",
                 
               
             
                "lang",
                 
               
             
                "name",
                 
               
             
                "active",
                 
               
             
                "mobile",
                 
               
             
                "phone",
                 
               
             
                "image",
                 
               
             
                "birthdate",
                 
               
             
                "lat",
                 
               
             
                "long",
                 
               
             
                "email",
                 
               
             
                "gender",
                 
               
             
                "credit",
                 
               
             
                "debit",
                 
               
             
                "credit_limit",
                 
               
             
                "property_product_pricelist",
                 
               
             
                "write_date",
                 
               
                "sync_ids"
          ];
  }



}