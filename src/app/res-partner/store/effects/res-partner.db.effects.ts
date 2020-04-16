import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { Observable, from, of, pipe } from "rxjs";
import * as ResPartnerActions from "../actions";
import { map, switchMap, catchError } from "rxjs/operators";
import { IResPartner} from "../../models/res-partner";
import { ResPartnerTable } from 'src/providers/db/tables/res-partner.table';

@Injectable()
export class ResPartnerDBEffects {
  constructor(private actions$: Actions, private table:ResPartnerTable) { }

  @Effect()
  deleteDB$ = this.actions$.pipe(
    ofType(ResPartnerActions.ResPartnerDBActionsType.DELETE_DB),
    switchMap((resPartner:ResPartnerActions.DeleteDB) => {
      return from(
        this.table.delete(resPartner.payload)
      ).pipe(
        map((data: IResPartner) => {
          return new ResPartnerActions.DeleteDBSuccess(data);
        }),
        catchError(error =>
          of(new ResPartnerActions.DeleteDBFail(error))
        )
      );
    })
  );

  @Effect()
  getResPartners$ = this.actions$.pipe(
    ofType(ResPartnerActions.ResPartnerDBActionsType.LOAD_DB),
    switchMap((resPartner:ResPartnerActions.LoadDB) => {
      return this.table.getAll().pipe(
        map((data: IResPartner[]) => {
          return new ResPartnerActions.LoadDBSuccess(data);
        }),
        catchError(error => {
          return  of(new ResPartnerActions.LoadDBFail(error))})
      );
    })
  );

  @Effect()
  DropResPartnerTable$ = this.actions$.pipe(
    ofType(ResPartnerActions.ResPartnerDBActionsType.DROP_TABLE),
    switchMap((delete_table:ResPartnerActions.DropTable) => {
      return from(this.table.drop()).pipe(
        map(delete_table => {
          return new ResPartnerActions.NewTable();
        }),
        catchError(error =>
          of(new ResPartnerActions.DropTableFail(error))
        )
      );
    })
  );

  @Effect()
  NewResPartnerTable$ = this.actions$.pipe(
    ofType(ResPartnerActions.ResPartnerDBActionsType.NEW_TABLE),
    switchMap((delete_table:ResPartnerActions.NewTable) => {
      return from(this.table.create()).pipe(
        map(new_table => {
          return new ResPartnerActions.NewTableSuccess(new_table);
        }),
        catchError(error =>
          of(new ResPartnerActions.NewTableFail(error))
        )
      );
    })
  );

  @Effect()
  addDBAuthenticateHttpSuccess$ = this.actions$.pipe(
    ofType(ResPartnerActions.ResPartnerHTTPActionsType.AUTHENTICATE_HTTP_SUCCESS),
    pipe(
      switchMap((action: ResPartnerActions.AuthenticateHttpSuccess) => {
        let resPartner=action.payload
        return from(this.table.add(resPartner)).pipe(
          switchMap((data: any) => {
            return of(new ResPartnerActions.AddManyDBSuccess(data))
          }),
          catchError(error =>{
            return   of(new ResPartnerActions.AddManyDBFail({error:error}))
          })
        );
      })
    )
  )

  @Effect()
  getLoggedResPartners$ = this.actions$.pipe(
    ofType(ResPartnerActions.ResPartnerDBActionsType.LOAD_LOGGED_USER_DB),
    switchMap((resPartner:ResPartnerActions.LoadloggedUserDB) => {
      return this.table.getBy('logged','true').pipe(
        map((data: IResPartner[]) => {
          return new ResPartnerActions.LoadLoggedUserDBSuccess(data[0]);
        }),
        catchError(error => of(new ResPartnerActions.LoadLoggedUserDBFail(error)))
      );
    })
  );

  @Effect()
  logout$ = this.actions$.pipe(
    ofType(ResPartnerActions.ResPartnerHTTPActionsType.LOGOUT),
    switchMap((delete_table:ResPartnerActions.Logout) => {
      return from(this.table.DeleteDataFromTable('res_partner')).pipe(
        map(delete_table => {
          return new ResPartnerActions.LogoutSuccess();
        }),
        catchError(error =>
          of(new ResPartnerActions.LogoutFail({error:error}))
        )
      );
    })
  )

}
