import { Injectable } from "@angular/core";
import * as fromResCountryState from "../store/state";
import * as fromResCountryActions from "../store/actions";
import * as fromResCountrySelectors from "../store/selectors";
import { Store } from "@ngrx/store";
import { OdooAPI } from 'src/providers/odoo/services/odooAPI';

// This class is used by the effects module as well ass modelSync service

@Injectable()
export class ResCountryRemoteOdoo {
  constructor(
    public store: Store<fromResCountryState.ResCountryState>,
    public odooAPI: OdooAPI,
  ) {

    // super(store,odooAPI,odooSync,fromResCountrySelectors,fromResCountryActions)
  }

  public getRemoteModelName() {
    return "res.country";
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
                 
          "client_id"

        ];

      },

      onUpdate() {

        return [
          
          "client_id",
          
          "name",
          
          "code",
          
          "client_id"

        ];

      },

      onRead() {

        return [
          
          "client_id",
          
          "name",
          
          "code",
          
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
      
      "sync_ids"
    
    ];

  }

}