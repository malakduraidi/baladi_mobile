import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";

import { Observable, from, of } from "rxjs";

import * as SaleOrderLineActions from "../actions";

import { map, switchMap, catchError } from "rxjs/operators";
import { ISaleOrderLine, SaleOrderLine} from "../../models/sale-order-line";
import { SaleOrderLineTable } from 'src/providers/db/tables/sale-order-line.table';

@Injectable()
export class SaleOrderLineDBEffects {
  constructor(private actions$: Actions, private table:SaleOrderLineTable) { }

  @Effect()
  deleteDB$ = this.actions$.pipe(
    ofType(SaleOrderLineActions.SaleOrderLineDBActionsType.DELETE_DB),
    switchMap((saleOrderLine:SaleOrderLineActions.DeleteDB) => {
    return from(
      this.table.delete(saleOrderLine.payload)
    ).pipe(
      map((data: ISaleOrderLine) => {
        return new SaleOrderLineActions.DeleteDBSuccess(data);
  }),
    catchError(error =>
      of(new SaleOrderLineActions.DeleteDBFail(error))
    )
      );
})
  );



@Effect()
addtoCart$ = this.actions$.pipe(
  ofType(SaleOrderLineActions.SaleOrderLineDBActionsType.ADD_TO_CART_DB),
  switchMap((saleOrderLine:SaleOrderLineActions.AddToCartDb) => {
  return from(this.table.add(saleOrderLine.payload)).pipe(
    map((data: ISaleOrderLine) => {
      return new SaleOrderLineActions.AddToCartDbSuccess(data);
}),
  catchError(error => {
    return of(new SaleOrderLineActions.AddToCartDbFail(error))})
      );
    })
  );
@Effect()
updateToCart$ = this.actions$.pipe(
  ofType(SaleOrderLineActions.SaleOrderLineDBActionsType.UPDATE_TO_CART_DB),
  switchMap((saleOrderLine:SaleOrderLineActions.UpdateToCartDb) => {
  let condition= "product_id = '"+saleOrderLine.payload['product_id']+"' "+ ' and order_id IS NULL '
  return from(this.table.updateByCondition(saleOrderLine.payload,condition)).pipe(
    map((data: ISaleOrderLine) => {
      return new SaleOrderLineActions.UpdateToCartDbSuccess(data);
}),
  catchError(error => {
    return of(new SaleOrderLineActions.UpdateToCartDbFail(error))})
      );
    })
  );


  @Effect()
removeCart$ = this.actions$.pipe(
  ofType(SaleOrderLineActions.SaleOrderLineDBActionsType.REMOVE_FROM_CART_DB),
  switchMap((saleOrderLine:SaleOrderLineActions.RemoveFromCartDb) => {
  return from(this.table.delete(saleOrderLine.payload,'client_id')).pipe(
    map((data: ISaleOrderLine) => {
      return new SaleOrderLineActions.RemoveFromCartDb(data);
}),
  catchError(error => {
    return of(new SaleOrderLineActions.RemoveFromCartDb(error))})
      );
    })
  );

  @Effect()
  loadToCart$ = this.actions$.pipe(
    ofType(SaleOrderLineActions.SaleOrderLineDBActionsType.LOAD_CART_DB),
    switchMap((saleOrderLine: SaleOrderLineActions.LoadCartDB) => {
      let condition= " order_id IS NULL "
      return from(this.table.getByCondition(condition)).pipe(
        map((data: ISaleOrderLine[]) => {
          return new SaleOrderLineActions.LoadCartDBSuccess(SaleOrderLine.fromDbToData(data));
        }),
        catchError(error => {
          return of(new SaleOrderLineActions.LoadCartDBFail(error))
        })
      );
    })
  );

  @Effect()
  getSaleOrderLines$ = this.actions$.pipe(
    ofType(SaleOrderLineActions.SaleOrderLineDBActionsType.LOAD_DB),
    switchMap((saleOrderLine: SaleOrderLineActions.LoadDB) => {
      return this.table.getAll().pipe(
        map((data: ISaleOrderLine[]) => {
          return new SaleOrderLineActions.LoadDBSuccess(data);
        }),
        catchError(error => of(new SaleOrderLineActions.LoadDBFail(error)))
      );
    })
  );

  @Effect()
  DropSaleOrderLineTable$ = this.actions$.pipe(
    ofType(SaleOrderLineActions.SaleOrderLineDBActionsType.DROP_TABLE),
    switchMap((delete_table: SaleOrderLineActions.DropTable) => {
      return from(this.table.drop()).pipe(
        map(delete_table => {
          return new SaleOrderLineActions.NewTable();
        }),
        catchError(error =>
          of(new SaleOrderLineActions.DropTableFail(error))
        )
      );
    })
  );

  @Effect()
  NewSaleOrderLineTable$ = this.actions$.pipe(
    ofType(SaleOrderLineActions.SaleOrderLineDBActionsType.NEW_TABLE),
    switchMap((delete_table: SaleOrderLineActions.NewTable) => {
      return from(this.table.create()).pipe(
        map(new_table => {
          return new SaleOrderLineActions.NewTableSuccess(new_table);
        }),
        catchError(error =>
          of(new SaleOrderLineActions.NewTableFail(error))
        )
      );
    })
  );
}
