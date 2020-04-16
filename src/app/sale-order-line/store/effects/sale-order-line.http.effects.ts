import { Injectable } from "@angular/core";
import { Effect, Actions, ofType } from "@ngrx/effects";

import { Observable, pipe, from, of } from "rxjs";

import * as SaleOrderLineActions from "../actions/";

import { map, switchMap, catchError } from "rxjs/operators";
import { ISaleOrderLine} from "../../models/sale-order-line";
import { OdooAPI } from 'src/providers/odoo/services/odooAPI';

const modelName = 'kc_academy.sale_order_line'
@Injectable()
export class SaleOrderLineHTTPEffects {
  constructor(private actions$: Actions, private odooAPI: OdooAPI) { }

  @Effect()
  addHTTP$ = this.actions$.pipe(
    ofType(SaleOrderLineActions.SaleOrderLineHTTPActionsType.ADD_HTTP),
    pipe(
      switchMap((action: any) => {
        return this.odooAPI.addRecord(action.payload.data, modelName).pipe(
          switchMap((saleOrderLineId: any) => {
          return of(new SaleOrderLineActions.AddUpdateHTTPSuccess(
            //saleOrderLine
            {data:Object.assign(action.payload, { id:saleOrderLineId })}
            ));
}),
catchError(error =>
  of(new SaleOrderLineActions.AddUpdateHTTPFail(error))
)
        );
      })))



@Effect()
loadHTTP$ = this.actions$.pipe(
  ofType(SaleOrderLineActions.SaleOrderLineHTTPActionsType.LOAD_HTTP),
  switchMap((saleOrderLineAction:SaleOrderLineActions.LoadHTTP) => {
  return this.odooAPI.loadRecords(modelName,saleOrderLineAction.payload.domain,
   saleOrderLineAction.payload.offset,saleOrderLineAction.payload.limit,saleOrderLineAction.payload.fields)
    .pipe(
      map((data: ISaleOrderLine) => {
        return new SaleOrderLineActions.LoadHTTPSuccess(data);
}),
  catchError(error =>
    of(new SaleOrderLineActions.LoadHTTPFail(error))
  )
        );
    })
  );

  @Effect()
  refreshHTTP$ = this.actions$.pipe(
    ofType(SaleOrderLineActions.SaleOrderLineHTTPActionsType.REFRESH_HTTP),
    switchMap((saleOrderLineAction: SaleOrderLineActions.RefreshHTTP) => {
      return this.odooAPI.loadRecords(modelName, saleOrderLineAction.payload.domain,
        saleOrderLineAction.payload.offset, saleOrderLineAction.payload.limit, saleOrderLineAction.payload.fields)
        .pipe(
          map((data: ISaleOrderLine) => {
            return new SaleOrderLineActions.RefreshHTTPSuccess(data);
          }),
          catchError(error =>
            of(new SaleOrderLineActions.RefreshHTTPFail(error))
          )
        );
    })
  );


  @Effect()
  updateHTTP$ = this.actions$.pipe(
    ofType(SaleOrderLineActions.SaleOrderLineHTTPActionsType.UPDATE_HTTP),
    switchMap((saleOrderLineAction: SaleOrderLineActions.UpdateHTTP) => {
      return this.odooAPI.updateRecord(modelName, saleOrderLineAction.payload.id, saleOrderLineAction.payload.data)
        .pipe(
          map((data: ISaleOrderLine) => {
            return new SaleOrderLineActions.AddUpdateHTTPSuccess({data:data});
          }),
          catchError(error =>
            of(new SaleOrderLineActions.AddUpdateHTTPFail(error))
          )
        );
    })
  )

  @Effect()
  deleteHTTP$ = this.actions$.pipe(
    ofType(SaleOrderLineActions.SaleOrderLineHTTPActionsType.DELETE_HTTP),
    switchMap((saleOrderLineAction: SaleOrderLineActions.DeleteHTTP) => {
      return this.odooAPI.deleteRecord(modelName, saleOrderLineAction.payload.id)
        .pipe(
          map((deletedRecordId: number) => {
            return new SaleOrderLineActions.DeleteHTTPSuccess(deletedRecordId);
          }),
          catchError(error =>
            of(new SaleOrderLineActions.DeleteHTTPFail(error))
          )
        );
    })
  )

}
