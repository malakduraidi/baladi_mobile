import { Injectable } from "@angular/core";
import { Effect, Actions, ofType } from "@ngrx/effects";
import { pipe, from, of } from "rxjs";
import * as ProductTemplateActions from "../actions/";
import { map, switchMap, catchError, mergeMap } from "rxjs/operators";
import { IProductTemplate, ProductTemplate } from "../../models/product-template";
import { OdooAPI } from 'src/providers/odoo/services/odooAPI';
import { PublicOdooRequest } from 'src/providers/odoo/models/ModelRemoteOdoo';

const modelName = 'product.template'

@Injectable()
export class ProductTemplateHTTPEffects {

  constructor(private actions$: Actions, private odooAPI: OdooAPI) { }
  
  // malak : used to add product on odoo db
  @Effect()
  addHTTP$ = this.actions$.pipe(
    ofType(ProductTemplateActions.ProductTemplateHTTPActionsType.ADD_HTTP),
    pipe(
      switchMap((action: any) => {
        return this.odooAPI.addRecord(action.payload.data, modelName).pipe(
          switchMap((productTemplateId: any) => {
            let productTemplate=Object.assign({},action.payload.data,{id:productTemplateId})
            return of(new ProductTemplateActions.AddUpdateHTTPSuccess(productTemplate));
          }),
          catchError(error =>
            of(new ProductTemplateActions.AddUpdateHTTPFail(error))
          )
        );
      })
    )
  )
  
  // malak : used to update product on odoo db
  @Effect()
  updateHTTP$ = this.actions$.pipe(
    ofType(ProductTemplateActions.ProductTemplateHTTPActionsType.UPDATE_HTTP),
    pipe(
    switchMap((action: any) => {
      return from(this.odooAPI.updateRecord(modelName, action.payload.id, action.payload.data)).pipe(
        map((data: IProductTemplate) => {
          let productTemplate=Object.assign({},action.payload.data,{id:action.payload.id})
          return new ProductTemplateActions.AddUpdateHTTPSuccess(productTemplate);
        }),
        catchError(error =>
          of(new ProductTemplateActions.AddUpdateHTTPFail(error))
        )
      );
    }))
  )
  
  // malak : used to load products from odoo db
  @Effect()
  loadHTTP$ = this.actions$.pipe(
    ofType(ProductTemplateActions.ProductTemplateHTTPActionsType.LOAD_HTTP),
    switchMap((productTemplateAction: ProductTemplateActions.LoadHTTP) => {
      let odooRequest: PublicOdooRequest={
        model:modelName,
        domain:productTemplateAction.payload.domain,
        limit:productTemplateAction.payload.limit,
        offset:productTemplateAction.payload.offset,
        fields:productTemplateAction.payload.fields
        
      }
      return this.odooAPI.loadPublicRecords(
        odooRequest)
        // modelName,
        //  productTemplateAction.payload.domain,
        // productTemplateAction.payload.offset, productTemplateAction.payload.limit, productTemplateAction.payload.fields
        // )
        .pipe(
          map((data: IProductTemplate[]) => {
            return new ProductTemplateActions.LoadHTTPSuccess(ProductTemplate.OdooToLocal(data));
          }),
          catchError(error =>
            {return of(new ProductTemplateActions.LoadHTTPFail(error))
            }
          )
        );
    })
  );
  
  // malak : used to load products from odoo db in case refresh
  @Effect()
  refreshHTTP$ = this.actions$.pipe(
    ofType(ProductTemplateActions.ProductTemplateHTTPActionsType.REFRESH_HTTP),
    switchMap((productTemplateAction: ProductTemplateActions.RefreshHTTP) => {

      let odooRequest: PublicOdooRequest = {
        model: modelName,
        domain: productTemplateAction.payload.domain,
        limit: productTemplateAction.payload.limit,
        offset: productTemplateAction.payload.offset,
        fields: productTemplateAction.payload.fields
      }
      return this.odooAPI.loadPublicRecords(odooRequest)
      // return this.odooAPI.loadRecords(modelName, productTemplateAction.payload.domain,
        // productTemplateAction.payload.offset, productTemplateAction.payload.limit, productTemplateAction.payload.fields)
        .pipe(
          map((data: IProductTemplate[]) => {
            return new ProductTemplateActions.RefreshHTTPSuccess(ProductTemplate.OdooToLocal(data));
          }),
          catchError(error =>
            {

            return of(new ProductTemplateActions.RefreshHTTPFail(error))
            }
          )
        );
    })
  );

  // malak : used to load products from odoo db in case search
  @Effect()
  searchHTTP$ = this.actions$.pipe(
    ofType(ProductTemplateActions.ProductTemplateHTTPActionsType.SEARCH_HTTP),
    switchMap((productTemplateAction: ProductTemplateActions.SearchHTTP) => {
      return this.odooAPI.loadRecords(modelName, productTemplateAction.payload.domain,
        productTemplateAction.payload.offset, productTemplateAction.payload.limit, productTemplateAction.payload.fields)
        .pipe(
          map(
            (data: IProductTemplate[]) => {
            return new ProductTemplateActions.SearchHTTPSuccess(ProductTemplate.OdooToLocal(data));
          }),
          catchError(error =>
            {
            return of(new ProductTemplateActions.SearchHTTPFail(error))
            }
          )
        );
    })
  );

@Effect()
  loadFeatureProductsHTTP$ = this.actions$.pipe(
    ofType(ProductTemplateActions.ProductTemplateHTTPActionsType.LOAD_FEATURE_HTTP),
    mergeMap((productTemplateAction: ProductTemplateActions.LoadFeatureHttp) => {
      let odooRequest: PublicOdooRequest={
        model:modelName,
        domain:productTemplateAction.payload.data.domain,
        limit:productTemplateAction.payload.data.limit,
        offset:productTemplateAction.payload.data.offset,
        fields:productTemplateAction.payload.data.fields
        
      }

      return this.odooAPI.loadPublicRecords(odooRequest)
        // modelName, productTemplateAction.payload.data.domain,
        // productTemplateAction.payload.data.offset, 
        // productTemplateAction.payload.data.limit, 
        // productTemplateAction.payload.data.fields)
        .pipe(
          map((data: IProductTemplate) => {
            return new ProductTemplateActions.LoadFeatureHttpSuccess
            ({type:productTemplateAction.payload.type,data:data});
          }),
          catchError(error =>
            of(new ProductTemplateActions.LoadFeatureHttpFail({error:error}))
          )
        );
    })
  );

  // malak : used to delete product from odoo db
  @Effect()
  deleteHTTP$ = this.actions$.pipe(
    ofType(ProductTemplateActions.ProductTemplateHTTPActionsType.DELETE_HTTP),
    switchMap((productTemplateAction: ProductTemplateActions.DeleteHTTP) => {
      return this.odooAPI.deleteRecord(modelName, productTemplateAction.payload.id)
        .pipe(
          map((deletedRecordId: number) => {
            return new ProductTemplateActions.DeleteHTTPSuccess(deletedRecordId);
          }),
          catchError(error =>
            of(new ProductTemplateActions.DeleteHTTPFail(error))
          )
        );
    })
  )

  // malak : used to load products image from odoo db
  @Effect()
  loadImage$ = this.actions$.pipe(
    ofType(ProductTemplateActions.ProductTemplateHTTPActionsType.LOAD_IMAGE_HTTP),
    switchMap((loadImageHttpAction: ProductTemplateActions.LoadImageHttp) => {
      return of(loadImageHttpAction.payload);
    }),
    mergeMap((payload: any) => {

      let odooRequest: PublicOdooRequest={
        model:modelName,
        domain:[['id','=',payload.id]],
        limit:1,
        offset:0,
        fields:[payload.image_field_name]
        

      }
      return this.odooAPI.loadPublicRecords(
        odooRequest)

      // return this.odooAPI
        // .loadImage(modelName,payload.id,payload.image_field_name)
        .pipe(
          map(
            (data: any) => {
              return new ProductTemplateActions.LoadImageHttpSuccess(data[0]);
            },
            err => {
              return new ProductTemplateActions.LoadImageHttpFail(err);
            }
          )
        );
    })
  );
  @Effect()
  loadFeatureImage$ = this.actions$.pipe(
    ofType(ProductTemplateActions.ProductTemplateHTTPActionsType.LOAD_FEATURE_IMAGE_HTTP),
    switchMap((loadImageHttpAction: ProductTemplateActions.LoadFeatureImageHttp) => {
      return of(loadImageHttpAction.payload);
    }),
    mergeMap((payload: any) => {

      let odooRequest: PublicOdooRequest={
        model:modelName,
        domain:[['id','=',payload.id]],
        limit:1,
        offset:0,
        fields:[payload.image_field_name]
        

      }
      return this.odooAPI.loadPublicRecords(
        odooRequest)

      // return this.odooAPI
        // .loadImage(modelName,payload.id,payload.image_field_name)
        .pipe(
          map(
            (data: any) => {
              
              return new ProductTemplateActions.LoadFeatureImageHttpSuccess
              ({image_data:data[0],id:payload.id,image_field_name:payload.image_field_name});
            },
            err => {
              return new ProductTemplateActions.LoadFeatureImageHttpFail(err);
            }
          )
        );
    })
  )

}
