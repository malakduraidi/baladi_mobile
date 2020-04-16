import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { ErrorActionsType } from '../actions';
import * as errorActions from '../actions';
import { switchMap, map } from 'rxjs/operators';
import { of } from 'rxjs';
import { OdooAPI } from 'src/providers/odoo/services/odooAPI';

@Injectable()
export class ErrorEffects {
  constructor(private actions$: Actions, private odooAPI: OdooAPI) { }

  // @Effect()
  // loadHttp$ = this.actions$.pipe(
  //   ofType(ErrorActionsType.LOAD_HTTP),
  //   switchMap((loadHTTPAction: errorActions.LoadHttp) => {
  //     return of(loadHTTPAction.payload);
  //   }),
  //   switchMap((payload: any) => {
  //     return this.odooAPI
  //       .loadError(payload.uid, payload.offset, payload.ids, payload.limit)
  //       .pipe(
  //         map(
  //           (data: any) => {
  //             return new errorActions.LoadHttpSuccess(data.records);
  //           },
  //           err => {
  //             return new errorActions.LoadHttpFail(err);
  //           }
  //         )
  //       );
  //   })
  // )

  // @Effect()
  // loadPublicHttp$ = this.actions$.pipe(
  //   ofType(ErrorActionsType.LOAD_PUBLIC_HTTP),
  //   switchMap((loadHTTPAction: errorActions.LoadHttp) => {
  //     return of(loadHTTPAction.payload);
  //   }),
  //   switchMap((payload: any) => {
  //     return this.odooAPI.loadErrorPublic().pipe(
  //       map(
  //         (records: any) => {
  //           return new errorActions.LoadHttpSuccess(records);
  //         },
  //         err => {
  //           return new errorActions.LoadHttpFail(err);
  //         }
  //       )
  //     );
  //   })
  // );
}
