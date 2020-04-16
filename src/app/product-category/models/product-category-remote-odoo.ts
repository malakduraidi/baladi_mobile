import { Injectable } from "@angular/core";
import * as fromProductCategoryState from "../store/state";
import * as fromProductCategoryActions from "../store/actions";
import * as fromProductCategorySelectors from "../store/selectors";
import { Store } from "@ngrx/store";
import { OdooAPI } from 'src/providers/odoo/services/odooAPI';

// This class is used by the effects module as well ass modelSync service

@Injectable()
export class ProductCategoryRemoteOdoo {
  constructor(
    public store: Store<fromProductCategoryState.ProductCategoryState>,
    public odooAPI: OdooAPI,
  ) {

    // super(store,odooAPI,odooSync,fromProductCategorySelectors,fromProductCategoryActions)
  }

  public getRemoteModelName() {
    return "product.category";
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
                 
               
             
                "image_medium",
                "ks_categ_background",
                 
               
             
                "parent_id",
                 
               
             
                "write_date",
                 
               
        
                "client_id"
          ];
      },

      onUpdate() {
        return [
         
             
               
             
                "name",
                 
               
             
                "image_medium",
                 
                "ks_categ_background",
               
             
                "parent_id",
                 
               
             
                "write_date",
                 
               
                "client_id"
          ];
      },

      onRead() {

        return [

         
             
               
             
                "name",
                 
               
             
                "image_medium",
                "ks_categ_background",
                 
               
             
                "parent_id",
                 
               
             
                "write_date",
                 
               
                "sync_ids"
          ];

      }

    };
  }

  public getRemoteFields() {


return [

         
             
               
             
                "name",
                 
               
             
                "image_medium",
                "ks_categ_background",
                 
               
             
                "parent_id",
                 
               
             
                "write_date",
                 
               
                "sync_ids"
          ];
  }



}