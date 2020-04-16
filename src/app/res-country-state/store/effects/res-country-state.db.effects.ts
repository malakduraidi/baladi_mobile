import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";

import { Observable, from, of } from "rxjs";

import * as ResCountryStateActions from "../actions";

import { map, switchMap, catchError } from "rxjs/operators";
import { IResCountryState} from "../../models/res-country-state";
import { ResCountryStateTable } from 'src/providers/db/tables/res-country-state.table';

@Injectable()
export class ResCountryStateDBEffects {
  constructor(private actions$: Actions, private table:ResCountryStateTable) { }

  @Effect()
  deleteDB$ = this.actions$.pipe(
    ofType(ResCountryStateActions.ResCountryStateDBActionsType.DELETE_DB),
    switchMap((resCountryState:ResCountryStateActions.DeleteDB) => {
    return from(
      this.table.delete(resCountryState.payload)
    ).pipe(
      map((data: IResCountryState) => {
        return new ResCountryStateActions.DeleteDBSuccess(data);
  }),
    catchError(error =>
      of(new ResCountryStateActions.DeleteDBFail(error))
    )
      );
})
  );




@Effect()
getResCountryStates$ = this.actions$.pipe(
  ofType(ResCountryStateActions.ResCountryStateDBActionsType.LOAD_DB),
  switchMap((resCountryState:ResCountryStateActions.LoadDB) => {
  return this.table.getAll().pipe(
    map((data: IResCountryState[]) => {
      return new ResCountryStateActions.LoadDBSuccess(data);
}),
  catchError(error => of(new ResCountryStateActions.LoadDBFail(error)))
      );
    })
  );

@Effect()
DropResCountryStateTable$ = this.actions$.pipe(
  ofType(ResCountryStateActions.ResCountryStateDBActionsType.DROP_TABLE),
  switchMap((delete_table:ResCountryStateActions.DropTable) => {
  return from(this.table.drop()).pipe(
    map(delete_table => {
      return new ResCountryStateActions.NewTable();
    }),
    catchError(error =>
      of(new ResCountryStateActions.DropTableFail(error))
    )
  );
})
  );

@Effect()
NewResCountryStateTable$ = this.actions$.pipe(
  ofType(ResCountryStateActions.ResCountryStateDBActionsType.NEW_TABLE),
  switchMap((delete_table:ResCountryStateActions.NewTable) => {
  return from(this.table.create()).pipe(
    map(new_table => {
      return new ResCountryStateActions.NewTableSuccess(new_table);
    }),
    catchError(error =>
      of(new ResCountryStateActions.NewTableFail(error))
    )
  );
})
  );
}
