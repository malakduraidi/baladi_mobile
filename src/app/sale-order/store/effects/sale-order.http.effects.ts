import { Injectable } from "@angular/core";
import { Effect, Actions, ofType } from "@ngrx/effects";

import { Observable, pipe, from, of } from "rxjs";

import * as SaleOrderActions from "../actions/";

import { map, switchMap, catchError } from "rxjs/operators";
import { ISaleOrder} from "../../models/sale-order";
import { OdooAPI } from 'src/providers/odoo/services/odooAPI';

const modelName = 'kc_academy.sale_order'
@Injectable()
export class SaleOrderHTTPEffects {
  constructor(private actions$: Actions, private odooAPI: OdooAPI) { }

  @Effect()
  addHTTP$ = this.actions$.pipe(
    ofType(SaleOrderActions.SaleOrderHTTPActionsType.ADD_HTTP),
    pipe(
      switchMap((action: any) => {
        return this.odooAPI.addRecord(action.payload.data, modelName).pipe(
          switchMap((saleOrderId: any) => {
          return of(new SaleOrderActions.AddUpdateHTTPSuccess(
            //saleOrder
            {data:Object.assign(action.payload, { id:saleOrderId })}
            ));
}),
catchError(error =>
  of(new SaleOrderActions.AddUpdateHTTPFail(error))
)
        );
      })))



@Effect()
loadHTTP$ = this.actions$.pipe(
  ofType(SaleOrderActions.SaleOrderHTTPActionsType.LOAD_HTTP),
  switchMap((saleOrderAction:SaleOrderActions.LoadHTTP) => {
  return this.odooAPI.loadRecords(modelName,saleOrderAction.payload.domain,
   saleOrderAction.payload.offset,saleOrderAction.payload.limit,saleOrderAction.payload.fields)
    .pipe(
      map((data: ISaleOrder) => {
        return new SaleOrderActions.LoadHTTPSuccess(data);
}),
  catchError(error =>
    of(new SaleOrderActions.LoadHTTPFail(error))
  )
        );
    })
  );

  @Effect()
  refreshHTTP$ = this.actions$.pipe(
    ofType(SaleOrderActions.SaleOrderHTTPActionsType.REFRESH_HTTP),
    switchMap((saleOrderAction: SaleOrderActions.RefreshHTTP) => {
      return this.odooAPI.loadRecords(modelName, saleOrderAction.payload.domain,
        saleOrderAction.payload.offset, saleOrderAction.payload.limit, saleOrderAction.payload.fields)
        .pipe(
          map((data: ISaleOrder) => {
            return new SaleOrderActions.RefreshHTTPSuccess(data);
          }),
          catchError(error =>
            of(new SaleOrderActions.RefreshHTTPFail(error))
          )
        );
    })
  );


  @Effect()
  updateHTTP$ = this.actions$.pipe(
    ofType(SaleOrderActions.SaleOrderHTTPActionsType.UPDATE_HTTP),
    switchMap((saleOrderAction: SaleOrderActions.UpdateHTTP) => {
      return this.odooAPI.updateRecord(modelName, saleOrderAction.payload.id, saleOrderAction.payload.data)
        .pipe(
          map((data: ISaleOrder) => {
            return new SaleOrderActions.AddUpdateHTTPSuccess({data:data});
          }),
          catchError(error =>
            of(new SaleOrderActions.AddUpdateHTTPFail(error))
          )
        );
    })
  )

  @Effect()
  deleteHTTP$ = this.actions$.pipe(
    ofType(SaleOrderActions.SaleOrderHTTPActionsType.DELETE_HTTP),
    switchMap((saleOrderAction: SaleOrderActions.DeleteHTTP) => {
      return this.odooAPI.deleteRecord(modelName, saleOrderAction.payload.id)
        .pipe(
          map((deletedRecordId: number) => {
            return new SaleOrderActions.DeleteHTTPSuccess(deletedRecordId);
          }),
          catchError(error =>
            of(new SaleOrderActions.DeleteHTTPFail(error))
          )
        );
    })
  )

}
