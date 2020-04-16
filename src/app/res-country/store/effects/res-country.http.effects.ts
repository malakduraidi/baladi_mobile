import { Injectable } from "@angular/core";
import { Effect, Actions, ofType } from "@ngrx/effects";

import { Observable, pipe, from, of } from "rxjs";

import * as ResCountryActions from "../actions/";

import { map, switchMap, catchError } from "rxjs/operators";
import { IResCountry} from "../../models/res-country";
import { OdooAPI } from 'src/providers/odoo/services/odooAPI';
import { PublicOdooRequest } from 'src/providers/odoo/models/ModelRemoteOdoo';

const modelName = 'res.country'

@Injectable()
export class ResCountryHTTPEffects {
  constructor(private actions$: Actions, private odooAPI: OdooAPI) { }

  @Effect()
  addHTTP$ = this.actions$.pipe(
    ofType(ResCountryActions.ResCountryHTTPActionsType.ADD_HTTP),
    pipe(
      switchMap((action: any) => {
        return this.odooAPI.addRecord(action.payload.data, modelName).pipe(
          switchMap((resCountryId: any) => {
            return of(new ResCountryActions.AddUpdateHTTPSuccess(
              {data:Object.assign(action.payload, { id:resCountryId })}
            ));
          }),
          catchError(error =>
            of(new ResCountryActions.AddUpdateHTTPFail(error))
          )
        );
      })
    )
  )

  @Effect()
  loadHTTP$ = this.actions$.pipe(
    ofType(ResCountryActions.ResCountryHTTPActionsType.LOAD_HTTP),
    switchMap((resCountryAction:ResCountryActions.LoadHTTP) => {
      let odooRequest: PublicOdooRequest={
        model:modelName,
        domain:resCountryAction.payload.domain,
        limit:resCountryAction.payload.limit,
        offset:resCountryAction.payload.offset,
        fields:resCountryAction.payload.fields
      }
      return this.odooAPI.loadPublicRecords(odooRequest)
      .pipe(
        map((data: IResCountry) => {
          return new ResCountryActions.LoadHTTPSuccess(data);
        }),
        catchError(error =>
          of(new ResCountryActions.LoadHTTPFail(error))
        )
      );
    })
  );

  @Effect()
  refreshHTTP$ = this.actions$.pipe(
    ofType(ResCountryActions.ResCountryHTTPActionsType.REFRESH_HTTP),
    switchMap((resCountryAction: ResCountryActions.RefreshHTTP) => {
      return this.odooAPI.loadRecords(modelName, resCountryAction.payload.domain,
        resCountryAction.payload.offset, resCountryAction.payload.limit, resCountryAction.payload.fields)
        .pipe(
          map((data: IResCountry) => {
            return new ResCountryActions.RefreshHTTPSuccess(data);
          }),
          catchError(error =>
            of(new ResCountryActions.RefreshHTTPFail(error))
          )
        );
    })
  );


  @Effect()
  updateHTTP$ = this.actions$.pipe(
    ofType(ResCountryActions.ResCountryHTTPActionsType.UPDATE_HTTP),
    switchMap((resCountryAction: ResCountryActions.UpdateHTTP) => {
      return this.odooAPI.updateRecord(modelName, resCountryAction.payload.id, resCountryAction.payload.data)
        .pipe(
          map((data: IResCountry) => {
            return new ResCountryActions.AddUpdateHTTPSuccess({data:data});
          }),
          catchError(error =>
            of(new ResCountryActions.AddUpdateHTTPFail(error))
          )
        );
    })
  )

  @Effect()
  deleteHTTP$ = this.actions$.pipe(
    ofType(ResCountryActions.ResCountryHTTPActionsType.DELETE_HTTP),
    switchMap((resCountryAction: ResCountryActions.DeleteHTTP) => {
      return this.odooAPI.deleteRecord(modelName, resCountryAction.payload.id)
        .pipe(
          map((deletedRecordId: number) => {
            return new ResCountryActions.DeleteHTTPSuccess(deletedRecordId);
          }),
          catchError(error =>
            of(new ResCountryActions.DeleteHTTPFail(error))
          )
        );
    })
  )

}
