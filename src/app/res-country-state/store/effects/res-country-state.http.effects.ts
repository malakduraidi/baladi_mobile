import { Injectable } from "@angular/core";
import { Effect, Actions, ofType } from "@ngrx/effects";

import { Observable, pipe, from, of } from "rxjs";

import * as ResCountryStateActions from "../actions/";

import { map, switchMap, catchError } from "rxjs/operators";
import { IResCountryState, ResCountryState} from "../../models/res-country-state";
import { OdooAPI } from 'src/providers/odoo/services/odooAPI';
import { PublicOdooRequest } from 'src/providers/odoo/models/ModelRemoteOdoo';

const modelName = 'res.country.state'
@Injectable()
export class ResCountryStateHTTPEffects {
  constructor(private actions$: Actions, private odooAPI: OdooAPI) { }

  @Effect()
  addHTTP$ = this.actions$.pipe(
    ofType(ResCountryStateActions.ResCountryStateHTTPActionsType.ADD_HTTP),
    pipe(
      switchMap((action: any) => {
        return this.odooAPI.addRecord(action.payload.data, modelName).pipe(
          switchMap((resCountryStateId: any) => {
          return of(new ResCountryStateActions.AddUpdateHTTPSuccess(
            //resCountryState
            {data:Object.assign(action.payload, { id:resCountryStateId })}
            ));
}),
catchError(error =>
  of(new ResCountryStateActions.AddUpdateHTTPFail(error))
)
        );
      })))



  @Effect()
  loadHTTP$ = this.actions$.pipe(
    ofType(ResCountryStateActions.ResCountryStateHTTPActionsType.LOAD_HTTP),
    switchMap((resCountryStateAction: ResCountryStateActions.LoadHTTP) => {
      let odooRequest: PublicOdooRequest = {
        model: modelName,
        domain: resCountryStateAction.payload.domain,
        limit: resCountryStateAction.payload.limit,
        offset: resCountryStateAction.payload.offset,
        fields: resCountryStateAction.payload.fields
      }
      return this.odooAPI.loadPublicRecords(odooRequest)
        .pipe(
          map((data: IResCountryState[]) => {
            return new ResCountryStateActions.LoadHTTPSuccess(ResCountryState.OdooToLocal(data));
          }),
          catchError(error =>
            of(new ResCountryStateActions.LoadHTTPFail(error))
          )
        );
    })
  );

  @Effect()
  refreshHTTP$ = this.actions$.pipe(
    ofType(ResCountryStateActions.ResCountryStateHTTPActionsType.REFRESH_HTTP),
    switchMap((resCountryStateAction: ResCountryStateActions.RefreshHTTP) => {
      return this.odooAPI.loadRecords(modelName, resCountryStateAction.payload.domain,
        resCountryStateAction.payload.offset, resCountryStateAction.payload.limit, resCountryStateAction.payload.fields)
        .pipe(
          map((data: IResCountryState[]) => {
            return new ResCountryStateActions.RefreshHTTPSuccess(ResCountryState.OdooToLocal(data));
          }),
          catchError(error =>
            of(new ResCountryStateActions.RefreshHTTPFail(error))
          )
        );
    })
  );


  @Effect()
  updateHTTP$ = this.actions$.pipe(
    ofType(ResCountryStateActions.ResCountryStateHTTPActionsType.UPDATE_HTTP),
    switchMap((resCountryStateAction: ResCountryStateActions.UpdateHTTP) => {
      return this.odooAPI.updateRecord(modelName, resCountryStateAction.payload.id, resCountryStateAction.payload.data)
        .pipe(
          map((data: IResCountryState) => {
            return new ResCountryStateActions.AddUpdateHTTPSuccess({ data: data });
          }),
          catchError(error =>
            of(new ResCountryStateActions.AddUpdateHTTPFail(error))
          )
        );
    })
  )

  @Effect()
  deleteHTTP$ = this.actions$.pipe(
    ofType(ResCountryStateActions.ResCountryStateHTTPActionsType.DELETE_HTTP),
    switchMap((resCountryStateAction: ResCountryStateActions.DeleteHTTP) => {
      return this.odooAPI.deleteRecord(modelName, resCountryStateAction.payload.id)
        .pipe(
          map((deletedRecordId: number) => {
            return new ResCountryStateActions.DeleteHTTPSuccess(deletedRecordId);
          }),
          catchError(error =>
            of(new ResCountryStateActions.DeleteHTTPFail(error))
          )
        );
    })
  )

}
