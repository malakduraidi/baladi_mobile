import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";

import { Observable, from, of } from "rxjs";

import * as SaleOrderActions from "../actions";

import { map, switchMap, catchError } from "rxjs/operators";
import { ISaleOrder} from "../../models/sale-order";
import { SaleOrderTable } from 'src/providers/db/tables/sale-order.table';

@Injectable()
export class SaleOrderDBEffects {
  constructor(private actions$: Actions, private table:SaleOrderTable) { }

  @Effect()
  deleteDB$ = this.actions$.pipe(
    ofType(SaleOrderActions.SaleOrderDBActionsType.DELETE_DB),
    switchMap((saleOrder:SaleOrderActions.DeleteDB) => {
    return from(
      this.table.delete(saleOrder.payload)
    ).pipe(
      map((data: ISaleOrder) => {
        return new SaleOrderActions.DeleteDBSuccess(data);
  }),
    catchError(error =>
      of(new SaleOrderActions.DeleteDBFail(error))
    )
      );
})
  );




@Effect()
getSaleOrders$ = this.actions$.pipe(
  ofType(SaleOrderActions.SaleOrderDBActionsType.LOAD_DB),
  switchMap((saleOrder:SaleOrderActions.LoadDB) => {
  return this.table.getAll().pipe(
    map((data: ISaleOrder[]) => {
      return new SaleOrderActions.LoadDBSuccess(data);
}),
  catchError(error => of(new SaleOrderActions.LoadDBFail(error)))
      );
    })
  );

@Effect()
DropSaleOrderTable$ = this.actions$.pipe(
  ofType(SaleOrderActions.SaleOrderDBActionsType.DROP_TABLE),
  switchMap((delete_table:SaleOrderActions.DropTable) => {
  return from(this.table.drop()).pipe(
    map(delete_table => {
      return new SaleOrderActions.NewTable();
    }),
    catchError(error =>
      of(new SaleOrderActions.DropTableFail(error))
    )
  );
})
  );

@Effect()
NewSaleOrderTable$ = this.actions$.pipe(
  ofType(SaleOrderActions.SaleOrderDBActionsType.NEW_TABLE),
  switchMap((delete_table:SaleOrderActions.NewTable) => {
  return from(this.table.create()).pipe(
    map(new_table => {
      return new SaleOrderActions.NewTableSuccess(new_table);
    }),
    catchError(error =>
      of(new SaleOrderActions.NewTableFail(error))
    )
  );
})
  );
}
