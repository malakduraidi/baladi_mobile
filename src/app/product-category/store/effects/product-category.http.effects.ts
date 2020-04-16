import { Injectable } from "@angular/core";
import { Effect, Actions, ofType } from "@ngrx/effects";

import { Observable, pipe, from, of } from "rxjs";

import * as ProductCategoryActions from "../actions/";

import { map, switchMap, catchError, mergeMap } from "rxjs/operators";
import { IProductCategory} from "../../models/product-category";
import { OdooAPI } from 'src/providers/odoo/services/odooAPI';
import { PublicOdooRequest } from 'src/providers/odoo/models/ModelRemoteOdoo';

const modelName = 'product.public.category'
@Injectable()
export class ProductCategoryHTTPEffects {
  constructor(private actions$: Actions, private odooAPI: OdooAPI) { }

  // malak : used to add product  category on odoo db
  @Effect()
  addHTTP$ = this.actions$.pipe(
    ofType(ProductCategoryActions.ProductCategoryHTTPActionsType.ADD_HTTP),
    pipe(
      switchMap((action: any) => {
        return this.odooAPI.addRecord(action.payload.data, modelName).pipe(
          switchMap((productCategoryId: any) => {
            let productCategory=Object.assign({},action.payload.data,{id:productCategoryId})

            return of(new ProductCategoryActions.AddUpdateHTTPSuccess(productCategory));
          }),
          catchError(error =>
            of(new ProductCategoryActions.AddUpdateHTTPFail(error))
          )
        );
      })
    )
  )


  // malak : used to load product categories from odoo db
  @Effect()
  loadHTTP$ = this.actions$.pipe(
    ofType(ProductCategoryActions.ProductCategoryHTTPActionsType.LOAD_HTTP),
    switchMap((productCategoryAction: ProductCategoryActions.LoadHTTP) => {
      let odooRequest: PublicOdooRequest = {
        model: modelName,
        domain: productCategoryAction.payload.domain,
        limit: productCategoryAction.payload.limit,
        offset: productCategoryAction.payload.offset,
        fields: productCategoryAction.payload.fields
      }
      return this.odooAPI.loadPublicRecords(odooRequest)
        .pipe(
          map((data: IProductCategory) => {
            return new ProductCategoryActions.LoadHTTPSuccess(data);
          }),
          catchError(error =>
            of(new ProductCategoryActions.LoadHTTPFail(error))
          )
        );
    })
  );

  // malak : used to load product categories from odoo db in case refresh
  @Effect()
  refreshHTTP$ = this.actions$.pipe(
    ofType(ProductCategoryActions.ProductCategoryHTTPActionsType.REFRESH_HTTP),
    switchMap((productCategoryAction: ProductCategoryActions.RefreshHTTP) => {
      let odooRequest: PublicOdooRequest = {
        model: modelName,
        domain: productCategoryAction.payload.domain,
        limit: productCategoryAction.payload.limit,
        offset: productCategoryAction.payload.offset,
        fields: productCategoryAction.payload.fields
      }

      return this.odooAPI.loadPublicRecords(odooRequest)
      // return this.odooAPI.loadRecords(modelName, productCategoryAction.payload.domain,
        // productCategoryAction.payload.offset, productCategoryAction.payload.limit, productCategoryAction.payload.fields)
        .pipe(
          map((data: IProductCategory) => {
            return new ProductCategoryActions.RefreshHTTPSuccess(data);
          }),
          catchError(error =>
            of(new ProductCategoryActions.RefreshHTTPFail(error))
          )
        );
    })
  );

  // malak : used to load product categories from odoo db in case search
  @Effect()
  searchHTTP$ = this.actions$.pipe(
    ofType(ProductCategoryActions.ProductCategoryHTTPActionsType.SEARCH_HTTP),
    switchMap((productTemplateAction: ProductCategoryActions.SearchHTTP) => {
      return this.odooAPI.loadRecords(modelName, productTemplateAction.payload.domain,
        productTemplateAction.payload.offset, productTemplateAction.payload.limit, productTemplateAction.payload.fields)
        .pipe(
          map(
            (data: IProductCategory[]) => {
            return new ProductCategoryActions.SearchHTTPSuccess(data);
          }),
          catchError(error =>
            {
            return of(new ProductCategoryActions.SearchHTTPFail(error))
            }
          )
        );
    })
  );

  // malak : used to update product category on odoo db
  @Effect()
  updateHTTP$ = this.actions$.pipe(
    ofType(ProductCategoryActions.ProductCategoryHTTPActionsType.UPDATE_HTTP),
    switchMap((action: any) => {
      return this.odooAPI.updateRecord(modelName, action.payload.id, action.payload.data)
        .pipe(
          map((data: IProductCategory) => {
            let productCategory=Object.assign({},action.payload.data,{id:action.payload.id})
            return new ProductCategoryActions.AddUpdateHTTPSuccess(productCategory);
          }),
          catchError(error =>
            of(new ProductCategoryActions.AddUpdateHTTPFail(error))
          )
        );
    })
  )
  
  // malak : used to delete product category on odoo db
  @Effect()
  deleteHTTP$ = this.actions$.pipe(
    ofType(ProductCategoryActions.ProductCategoryHTTPActionsType.DELETE_HTTP),
    switchMap((productCategoryAction: ProductCategoryActions.DeleteHTTP) => {
      return this.odooAPI.deleteRecord(modelName, productCategoryAction.payload.id)
        .pipe(
          map((deletedRecordId: number) => {
            return new ProductCategoryActions.DeleteHTTPSuccess(deletedRecordId);
          }),
          catchError(error =>
            of(new ProductCategoryActions.DeleteHTTPFail(error))
          )
        );
    })
  )

  // malak : used to load product categories image from odoo db
  @Effect()
  loadImage$ = this.actions$.pipe(
    ofType(ProductCategoryActions.ProductCategoryHTTPActionsType.LOAD_IMAGE_HTTP),
    switchMap((loadImageHttpAction: ProductCategoryActions.LoadImageHttp) => {
      return of(loadImageHttpAction.payload);
    }),
    mergeMap((payload: any) => {
      return this.odooAPI
        .loadImage(modelName,payload.id,payload.image_field_name)
        .pipe(
          map(
            (data: any) => {
              return new ProductCategoryActions.LoadImageHttpSuccess(data[0]);
            },
            err => {
              return new ProductCategoryActions.LoadImageHttpFail(err);
            }
          )
        );
    })
  );

}
