import { Injectable } from "@angular/core";
import * as fromResCountryStateState from "../store/state";
import * as fromResCountryStateActions from "../store/actions";
import * as fromResCountryStateSelectors from "../store/selectors";
import { Store } from "@ngrx/store";
import { OdooAPI } from "../../services/odoo/services/odooAPI";

// This class is used by the effects module as well ass modelSync service

@Injectable()
export class ResCountryStateRemoteOdoo {
  constructor(
    public store: Store<fromResCountryStateState.ResCountryStateState>,
    public odooAPI: OdooAPI,
  ) {

    // super(store,odooAPI,odooSync,fromResCountryStateSelectors,fromResCountryStateActions)
  }

  public getRemoteModelName() {
    return "res.country.state";
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
                 
               
             
                "code",
                 
               
             
                "country_id",
                 
               
        
                "client_id"
          ];
      },

      onUpdate() {
        return [
         
             
               
             
                "client_id",
                 
               
             
                "name",
                 
               
             
                "code",
                 
               
             
                "country_id",
                 
               
                "client_id"
          ];
      },

      onRead() {

        return [

         
             
               
             
                "client_id",
                 
               
             
                "name",
                 
               
             
                "code",
                 
               
             
                "country_id",
                 
               
                "sync_ids"
          ];

      }

    };
  }

  public getRemoteFields() {


return [

         
             
               
             
                "client_id",
                 
               
             
                "name",
                 
               
             
                "code",
                 
               
             
                "country_id",
                 
               
                "sync_ids"
          ];
  }



}