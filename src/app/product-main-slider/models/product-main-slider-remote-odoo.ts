import { Injectable } from "@angular/core";
import * as fromProductMainSliderState from "../store/state";
import * as fromProductMainSliderActions from "../store/actions";
import * as fromProductMainSliderSelectors from "../store/selectors";
import { Store } from "@ngrx/store";
import { OdooAPI } from "../../services/odoo/services/odooAPI";

// This class is used by the effects module as well ass modelSync service

@Injectable()
export class ProductMainSliderRemoteOdoo {
  constructor(
    public store: Store<fromProductMainSliderState.ProductMainSliderState>,
    public odooAPI: OdooAPI,
  ) {

    // super(store,odooAPI,odooSync,fromProductMainSliderSelectors,fromProductMainSliderActions)
  }

  public getRemoteModelName() {
    return "ks_product_main.slider";
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
                 
               
             
                "ks_main_slider_img",
                 
               
             
                "ks_main_slider_link",
                 
               
             
                "sequence",
                 
               
        
                "client_id"
          ];
      },

      onUpdate() {
        return [
         
             
               
             
                "name",
                 
               
             
                "ks_main_slider_img",
                 
               
             
                "ks_main_slider_link",
                 
               
             
                "sequence",
                 
               
                "client_id"
          ];
      },

      onRead() {

        return [

         
             
               
             
                "name",
                 
               
             
                "ks_main_slider_img",
                 
               
             
                "ks_main_slider_link",
                 
               
             
                "sequence",
                 
               
                "sync_ids"
          ];

      }

    };
  }

  public getRemoteFields() {


return [

         
             
               
             
                "name",
                 
               
             
                "ks_main_slider_img",
                 
               
             
                "ks_main_slider_link",
                 
               
             
                "sequence",
                 
               
                "sync_ids"
          ];
  }



}