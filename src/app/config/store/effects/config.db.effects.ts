import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { Observable, from, of, pipe } from "rxjs";
import * as ConfigActions from "../actions";
import { map, switchMap, catchError } from "rxjs/operators";
import { IConfig} from "../../models/config";
import { ConfigTable } from 'src/providers/db/tables/config.table';

@Injectable()
export class ConfigDBEffects {

  constructor(
    private actions$: Actions, 
    private table:ConfigTable) { 

    }

  @Effect()
  deleteDB$ = this.actions$.pipe(
    ofType(ConfigActions.ConfigDBActionsType.DELETE_DB),
    switchMap((config:ConfigActions.DeleteDB) => {
      return from(this.table.delete(config.payload)).pipe(
        map((data: IConfig) => {
          return new ConfigActions.DeleteDBSuccess(data);
        }),
        catchError(error =>
          of(new ConfigActions.DeleteDBFail(error))
        )
      );
    })
  );

  @Effect()
  getConfigs$ = this.actions$.pipe(
    ofType(ConfigActions.ConfigDBActionsType.LOAD_DB),
    switchMap((config:ConfigActions.LoadDB) => {
      return this.table.getAll().pipe(
        map((data: IConfig[]) => {
          return new ConfigActions.LoadDBSuccess(data);
        }),
        catchError(error => 
          of(new ConfigActions.LoadDBFail(error))
        )
      );
    })
  );

  @Effect()
  DropConfigTable$ = this.actions$.pipe(
    ofType(ConfigActions.ConfigDBActionsType.DROP_TABLE),
    switchMap((delete_table:ConfigActions.DropTable) => {
      return from(this.table.drop()).pipe(
        map(delete_table => {
          return new ConfigActions.NewTable();
        }),
        catchError(error =>
          of(new ConfigActions.DropTableFail(error))
        )
      );
    })
  );

  @Effect()
  NewConfigTable$ = this.actions$.pipe(
    ofType(ConfigActions.ConfigDBActionsType.NEW_TABLE),
    switchMap((delete_table:ConfigActions.NewTable) => {
      return from(this.table.create()).pipe(
        map(new_table => {
          return new ConfigActions.NewTableSuccess(new_table);
        }),
        catchError(error =>
          of(new ConfigActions.NewTableFail(error))
       )
      );
    })
  );

  // malak: used to add config data in sql
  @Effect()
  addDBloadHTTP$ = this.actions$.pipe(
    ofType(ConfigActions.ConfigHTTPActionsType.LOAD_HTTP_SUCCESS),
    pipe(
      switchMap((action: ConfigActions.LoadHTTPSuccess) => {
        let config=Object.assign({},action.payload[0])
        // suppose we only have on config field
        config['client_id']=1

        return from(this.table.upsert(config)).pipe(
          switchMap((data: any) => {
            return of(new ConfigActions.AddManyDBSuccess(data))
          }),
          catchError(error =>{
            return of(new ConfigActions.AddManyDBFail({error:error}))
          })
        );
      })
    )
  )

}
