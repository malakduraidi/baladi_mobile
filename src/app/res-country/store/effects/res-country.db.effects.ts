import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";

import { Observable, from, of } from "rxjs";

import * as ResCountryActions from "../actions";

import { map, switchMap, catchError } from "rxjs/operators";
import { IResCountry} from "../../models/res-country";
import { ResCountryTable } from 'src/providers/db/tables/res-country.table';

@Injectable()
export class ResCountryDBEffects {
  constructor(private actions$: Actions, private table:ResCountryTable) { }

  @Effect()
  deleteDB$ = this.actions$.pipe(
    ofType(ResCountryActions.ResCountryDBActionsType.DELETE_DB),
    switchMap((resCountry:ResCountryActions.DeleteDB) => {
    return from(
      this.table.delete(resCountry.payload)
    ).pipe(
      map((data: IResCountry) => {
        return new ResCountryActions.DeleteDBSuccess(data);
  }),
    catchError(error =>
      of(new ResCountryActions.DeleteDBFail(error))
    )
      );
})
  );




@Effect()
getResCountrys$ = this.actions$.pipe(
  ofType(ResCountryActions.ResCountryDBActionsType.LOAD_DB),
  switchMap((resCountry:ResCountryActions.LoadDB) => {
  return this.table.getAll().pipe(
    map((data: IResCountry[]) => {
      return new ResCountryActions.LoadDBSuccess(data);
}),
  catchError(error => of(new ResCountryActions.LoadDBFail(error)))
      );
    })
  );

@Effect()
DropResCountryTable$ = this.actions$.pipe(
  ofType(ResCountryActions.ResCountryDBActionsType.DROP_TABLE),
  switchMap((delete_table:ResCountryActions.DropTable) => {
  return from(this.table.drop()).pipe(
    map(delete_table => {
      return new ResCountryActions.NewTable();
    }),
    catchError(error =>
      of(new ResCountryActions.DropTableFail(error))
    )
  );
})
  );

@Effect()
NewResCountryTable$ = this.actions$.pipe(
  ofType(ResCountryActions.ResCountryDBActionsType.NEW_TABLE),
  switchMap((delete_table:ResCountryActions.NewTable) => {
  return from(this.table.create()).pipe(
    map(new_table => {
      return new ResCountryActions.NewTableSuccess(new_table);
    }),
    catchError(error =>
      of(new ResCountryActions.NewTableFail(error))
    )
  );
})
  );
}
