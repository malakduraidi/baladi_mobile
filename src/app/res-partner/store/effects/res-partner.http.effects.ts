import { Injectable } from "@angular/core";
import { Effect, Actions, ofType } from "@ngrx/effects";
import { Observable, pipe, from, of } from "rxjs";
import * as ResPartnerActions from "../actions/";
import { map, switchMap, catchError } from "rxjs/operators";
import { IResPartner, ResPartner} from "../../models/res-partner";
import { OdooAPI } from 'src/providers/odoo/services/odooAPI';
import { AuthOdooData } from 'src/providers/odoo/models/ModelRemoteOdoo';
import { resPartnerAdapter } from '../state';
import { ResPartnerHTTPActionsType } from '../actions/';

const modelName = 'res.partner'

@Injectable()
export class ResPartnerHTTPEffects {
  constructor(
    private actions$: Actions, 
    private table: ResPartner,
    private odooAPI: OdooAPI) { }

  @Effect()
  addHTTP$ = this.actions$.pipe(
    ofType(ResPartnerActions.ResPartnerHTTPActionsType.ADD_HTTP),
    pipe(
      switchMap((action: any) => {
        return this.odooAPI.addRecord(action.payload.data, modelName).pipe(
          switchMap((resPartnerId: any) => {
            return of(new ResPartnerActions.AddUpdateHTTPSuccess(
              //resPartner
              {data:Object.assign(action.payload, { id:resPartnerId })}
            ));
          }),
          catchError(error =>
            of(new ResPartnerActions.AddUpdateHTTPFail(error))
          )
        );
      })
    )
  )

  @Effect()
  loadHTTP$ = this.actions$.pipe(
    ofType(ResPartnerActions.ResPartnerHTTPActionsType.LOAD_HTTP),
    switchMap((resPartnerAction:ResPartnerActions.LoadHTTP) => {
      return this.odooAPI.loadRecords(modelName,resPartnerAction.payload.domain,
        resPartnerAction.payload.offset,resPartnerAction.payload.limit,resPartnerAction.payload.fields)
        .pipe(
        map((data: IResPartner[]) => {
          return new ResPartnerActions.LoadHTTPSuccess(ResPartner.OdooToLocal(data));
        }),
        catchError(error =>
          of(new ResPartnerActions.LoadHTTPFail(error))
        )
      );
    })
  );

  @Effect()
  refreshHTTP$ = this.actions$.pipe(
    ofType(ResPartnerActions.ResPartnerHTTPActionsType.REFRESH_HTTP),
    switchMap((resPartnerAction: ResPartnerActions.RefreshHTTP) => {
      return this.odooAPI.loadRecords(modelName, resPartnerAction.payload.domain,
        resPartnerAction.payload.offset, resPartnerAction.payload.limit, resPartnerAction.payload.fields)
        .pipe(
          map((data: IResPartner[]) => {
            return new ResPartnerActions.RefreshHTTPSuccess(ResPartner.OdooToLocal(data));
          }),
          catchError(error =>
            of(new ResPartnerActions.RefreshHTTPFail(error))
          )
        );
    })
  );


  @Effect()
  updateHTTP$ = this.actions$.pipe(
    ofType(ResPartnerActions.ResPartnerHTTPActionsType.UPDATE_HTTP),
    switchMap((resPartnerAction: ResPartnerActions.UpdateHTTP) => {
      return this.odooAPI.updateRecord(modelName, resPartnerAction.payload.id, resPartnerAction.payload.data)
        .pipe(
          map((data: IResPartner) => {
            return new ResPartnerActions.AddUpdateHTTPSuccess({data:data});
          }),
          catchError(error =>
            of(new ResPartnerActions.AddUpdateHTTPFail(error))
          )
        );
    })
  )

  @Effect()
  deleteHTTP$ = this.actions$.pipe(
    ofType(ResPartnerActions.ResPartnerHTTPActionsType.DELETE_HTTP),
    switchMap((resPartnerAction: ResPartnerActions.DeleteHTTP) => {
      return this.odooAPI.deleteRecord(modelName, resPartnerAction.payload.id)
        .pipe(
          map((deletedRecordId: number) => {
            return new ResPartnerActions.DeleteHTTPSuccess(deletedRecordId);
          }),
          catchError(error =>
            of(new ResPartnerActions.DeleteHTTPFail(error))
          )
        );
    })
  )
  
  // malak: used to authenticate user from odoo db
  @Effect()
  authenticateHttp$ = this.actions$.pipe(
    ofType(ResPartnerActions.ResPartnerHTTPActionsType.AUTHENTICATE_HTTP),
    pipe(
      switchMap((action: any) => {
        let authData:AuthOdooData={
          email:action.payload.email,
          password:action.payload.password,
          db:action.payload.db

        }
        return from(this.odooAPI.authenticate(authData)).pipe(
          switchMap((data: any) => {
            let resPartner=new ResPartner()
            resPartner = data
            resPartner.logged = true

          return of(new ResPartnerActions.AuthenticateHttpSuccess(resPartner))
          
          }),
          catchError(error =>
            of(new ResPartnerActions.AuthenticateHttpFail({error:error}))
          )
        );
      })
    )
  )
  
  // malak: used to register new user to odoo db
  @Effect()
  register$ = this.actions$.pipe(
    ofType(ResPartnerActions.ResPartnerHTTPActionsType.REGISTER_HTTP),
    pipe(
      switchMap((action: any) => {
        return from(this.odooAPI.register(action.payload)).pipe(
          switchMap((data: any) => {       
            let resPartner=new ResPartner()
            resPartner = data
            return of(new ResPartnerActions.RegisterHttpSuccess(resPartner))

          }),
          catchError(error => 
            of(new ResPartnerActions.RegisterHttpFail({error:error}))
          )
        );
      })
    )
  )
  
  // malak: used to load all addresses for logged user from odoo db
  @Effect()
  loadShippingAddressHttp$ = this.actions$.pipe(
    ofType(ResPartnerActions.ResPartnerHTTPActionsType.LOAD_SHIPPING_ADDRESS_HTTP),
    pipe(
      switchMap((action: any) => {
  
        return from(this.odooAPI.loadRecords(modelName,action.payload.domain,action.payload.offset,action.payload.limit,action.payload.fields)).pipe(
          switchMap((data: any) => {     
            return of(new ResPartnerActions.LoadShippingAddressHttpSuccess(ResPartner.OdooToLocal(data)))

          }),
          catchError(error => 
            of(new ResPartnerActions.LoadShippingAddressHttpFail({error:error}))
          )
        );
      })
    )
  )

  // malak: used to register new shipping address(partner) to odoo db
  @Effect()
  AddNewShippingAddressHttp$ = this.actions$.pipe(
    ofType(ResPartnerActions.ResPartnerHTTPActionsType.ADD_PARTNER_HTTP),
    pipe(
      switchMap((action: any) => {
        return from(this.odooAPI.addRecord(action.payload,modelName)).pipe(
          switchMap((resPartnerId: any) => {  
            let resPartner=Object.assign({},action.payload,{id:resPartnerId})
            return of(new ResPartnerActions.AddNewShippingAddressHttpSuccess(resPartner))

          }),
          catchError(error => 
            of(new ResPartnerActions.AddNewShippingAddressHttpFail({error:error}))
          )
        );
      })
    )
  )

  // malak: used update shipping address(partner) to odoo db
  @Effect()
    UpdateShippingAddressHttp$ = this.actions$.pipe(
    ofType(ResPartnerActions.ResPartnerHTTPActionsType.UPDTAE_PARTNER_HTTP),
    pipe(
      switchMap((action: any) => {
        return from(this.odooAPI.updateRecord(modelName,action.payload.id,action.payload.data)).pipe(
          switchMap((data: any) => {  
            let resPartner=Object.assign({},action.payload.data,{id:action.payload.id})
            return of(new ResPartnerActions.UpdateShippingAddressHttpSuccess(resPartner))

          }),
          catchError(error => 
            of(new ResPartnerActions.UpdateShippingAddressHttpFail({error:error}))
          )
        );
      })
    )
  )

}
