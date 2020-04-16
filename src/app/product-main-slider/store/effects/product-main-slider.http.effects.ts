import { Injectable } from "@angular/core";
import { Effect, Actions, ofType } from "@ngrx/effects";

import { Observable, pipe, from, of } from "rxjs";

import * as ProductMainSliderActions from "../actions/";

import { map, switchMap, catchError } from "rxjs/operators";
import { IProductMainSlider} from "../../models/product-main-slider";
import { OdooAPI } from 'src/providers/odoo/services/odooAPI';
import { PublicOdooRequest } from 'src/providers/odoo/models/ModelRemoteOdoo';

const modelName = 'ks_product_main.slider'
@Injectable()
export class ProductMainSliderHTTPEffects {
  constructor(private actions$: Actions, private odooAPI: OdooAPI) { }

  @Effect()
  addHTTP$ = this.actions$.pipe(
    ofType(ProductMainSliderActions.ProductMainSliderHTTPActionsType.ADD_HTTP),
    pipe(
      switchMap((action: any) => {
        return this.odooAPI.addRecord(action.payload.data, modelName).pipe(
          switchMap((productMainSliderId: any) => {
          return of(new ProductMainSliderActions.AddUpdateHTTPSuccess(
            //productMainSlider
            {data:Object.assign(action.payload, { id:productMainSliderId })}
            ));
}),
catchError(error =>
  of(new ProductMainSliderActions.AddUpdateHTTPFail(error))
)
        );
      })))



@Effect()
loadHTTP$ = this.actions$.pipe(
  ofType(ProductMainSliderActions.ProductMainSliderHTTPActionsType.LOAD_HTTP),
  switchMap((productMainSliderAction:ProductMainSliderActions.LoadHTTP) => {
  // return this.odooAPI.loadRecords(modelName,productMainSliderAction.payload.domain,
  //  productMainSliderAction.payload.offset,productMainSliderAction.payload.limit,productMainSliderAction.payload.fields)

      let odooRequest: PublicOdooRequest = {
        model: modelName,
        domain: productMainSliderAction.payload.domain,
        limit: productMainSliderAction.payload.limit,
        offset: productMainSliderAction.payload.offset,
        fields: productMainSliderAction.payload.fields

      }

      return this.odooAPI.loadPublicRecords(odooRequest)



    .pipe(
      map((data: IProductMainSlider) => {
        return new ProductMainSliderActions.LoadHTTPSuccess(data);
}),
  catchError(error =>
    of(new ProductMainSliderActions.LoadHTTPFail(error))
  )
        );
    })
  );

  @Effect()
  refreshHTTP$ = this.actions$.pipe(
    ofType(ProductMainSliderActions.ProductMainSliderHTTPActionsType.REFRESH_HTTP),
    switchMap((productMainSliderAction: ProductMainSliderActions.RefreshHTTP) => {


      let odooRequest: PublicOdooRequest = {
        model: modelName,
        domain: productMainSliderAction.payload.domain,
        limit: productMainSliderAction.payload.limit,
        offset: productMainSliderAction.payload.offset,
        fields: productMainSliderAction.payload.fields

      }

      return this.odooAPI.loadPublicRecords(odooRequest)

      // return this.odooAPI.loadRecords(modelName, productMainSliderAction.payload.domain,
        // productMainSliderAction.payload.offset, productMainSliderAction.payload.limit, productMainSliderAction.payload.fields)
        .pipe(
          map((data: IProductMainSlider) => {
            return new ProductMainSliderActions.RefreshHTTPSuccess(data);
          }),
          catchError(error =>
            of(new ProductMainSliderActions.RefreshHTTPFail(error))
          )
        );
    })
  );


  @Effect()
  updateHTTP$ = this.actions$.pipe(
    ofType(ProductMainSliderActions.ProductMainSliderHTTPActionsType.UPDATE_HTTP),
    switchMap((productMainSliderAction: ProductMainSliderActions.UpdateHTTP) => {
      return this.odooAPI.updateRecord(modelName, productMainSliderAction.payload.id, productMainSliderAction.payload.data)
        .pipe(
          map((data: IProductMainSlider) => {
            return new ProductMainSliderActions.AddUpdateHTTPSuccess({data:data});
          }),
          catchError(error =>
            of(new ProductMainSliderActions.AddUpdateHTTPFail(error))
          )
        );
    })
  )

  @Effect()
  deleteHTTP$ = this.actions$.pipe(
    ofType(ProductMainSliderActions.ProductMainSliderHTTPActionsType.DELETE_HTTP),
    switchMap((productMainSliderAction: ProductMainSliderActions.DeleteHTTP) => {
      return this.odooAPI.deleteRecord(modelName, productMainSliderAction.payload.id)
        .pipe(
          map((deletedRecordId: number) => {
            return new ProductMainSliderActions.DeleteHTTPSuccess(deletedRecordId);
          }),
          catchError(error =>
            of(new ProductMainSliderActions.DeleteHTTPFail(error))
          )
        );
    })
  )

}
