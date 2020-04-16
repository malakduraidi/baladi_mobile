import { Injectable } from "@angular/core";
import { Effect, Actions, ofType } from "@ngrx/effects";
import { Observable, pipe, from, of } from "rxjs";
import * as ConfigActions from "../actions/";
import { map, switchMap, catchError } from "rxjs/operators";
import { IConfig} from "../../models/config";
import { OdooAPI } from 'src/providers/odoo/services/odooAPI';
import { PublicOdooRequest } from 'src/providers/odoo/models/ModelRemoteOdoo';
import { Config} from "../../models/config";

const modelName = 'grefoot.mobile_config'

@Injectable()
export class ConfigHTTPEffects {
  constructor(private actions$: Actions, private odooAPI: OdooAPI) { }

//   @Effect()
//   addHTTP$ = this.actions$.pipe(
//     ofType(ConfigActions.ConfigHTTPActionsType.ADD_HTTP),
//     pipe(
//       switchMap((action: any) => {
//         return this.odooAPI.addRecord(action.payload.data, modelName).pipe(
//           switchMap((configId: any) => {
//           return of(new ConfigActions.AddUpdateHTTPSuccess(
//             //config
//             {data:Object.assign(action.payload, { id:configId })}
//             ));
// }),
// catchError(error =>
//   of(new ConfigActions.AddUpdateHTTPFail(error))
// )
//         );
//       })))

  // malak: used to get config data from odoo db
  @Effect()
  loadHTTP$ = this.actions$.pipe(
    ofType(ConfigActions.ConfigHTTPActionsType.LOAD_HTTP),
    switchMap((configAction:ConfigActions.LoadHTTP) => {


          let odooRequest: PublicOdooRequest={
            model:modelName,
            domain:configAction.payload.domain,
            limit:configAction.payload.limit,
            offset:configAction.payload.offset,
            fields:configAction.payload.fields
            
          }
    
      return this.odooAPI.loadPublicRecords(odooRequest).
      // return this.odooAPI.loadRecords(modelName,configAction.payload.domain,
      //   configAction.payload.offset,configAction.payload.limit,configAction.payload.fields).
        pipe(
          map((data: IConfig) => {
            return new ConfigActions.LoadHTTPSuccess(data);
          }),
          catchError(error =>
            of(new ConfigActions.LoadHTTPFail(error))
          )
        );
    })
  );

  @Effect()
  refreshHTTP$ = this.actions$.pipe(
    ofType(ConfigActions.ConfigHTTPActionsType.REFRESH_HTTP),
    switchMap((configAction: ConfigActions.RefreshHTTP) => {
      let publicOdooRequest:PublicOdooRequest
      publicOdooRequest={
        model:modelName,
        domain:configAction.payload.domain,
        fields:configAction.payload.fields,
        limit:configAction.payload.limit,
        offset:configAction.payload.offset,
      }
      return this.odooAPI.loadPublicRecords(publicOdooRequest)
        .pipe(
          map((data: IConfig) => {
            return new ConfigActions.RefreshHTTPSuccess(data);
          }),
          catchError(error =>
            of(new ConfigActions.RefreshHTTPFail(error))
          )
        );
    })
  );

  // @Effect()
  // updateHTTP$ = this.actions$.pipe(
  //   ofType(ConfigActions.ConfigHTTPActionsType.UPDATE_HTTP),
  //   switchMap((configAction: ConfigActions.UpdateHTTP) => {
  //     return this.odooAPI.updateRecord(modelName, configAction.payload.id, configAction.payload.data)
  //       .pipe(
  //         map((data: IConfig) => {
  //           return new ConfigActions.AddUpdateHTTPSuccess({data:data});
  //         }),
  //         catchError(error =>
  //           of(new ConfigActions.AddUpdateHTTPFail(error))
  //         )
  //       );
  //   })
  // )

  // @Effect()
  // deleteHTTP$ = this.actions$.pipe(
  //   ofType(ConfigActions.ConfigHTTPActionsType.DELETE_HTTP),
  //   switchMap((configAction: ConfigActions.DeleteHTTP) => {
  //     return this.odooAPI.deleteRecord(modelName, configAction.payload.id)
  //       .pipe(
  //         map((deletedRecordId: number) => {
  //           return new ConfigActions.DeleteHTTPSuccess(deletedRecordId);
  //         }),
  //         catchError(error =>
  //           of(new ConfigActions.DeleteHTTPFail(error))
  //         )
  //       );
  //   })
  // )

}
