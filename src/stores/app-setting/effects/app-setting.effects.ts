/*
Login => Authenticate => UpdateCredential => getUserType => Done!
*/
import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';

import { of, from } from 'rxjs';

import { SettingTable } from '../../../providers/db/tables/app-setting.table';
import * as SettingActions from '../actions/app-setting.actions';
import * as fromSettingSelectors from '../reducers/';

import {
  map,
  switchMap,
  catchError,
  withLatestFrom,
  filter
} from 'rxjs/operators';
import {
  ISetting,
  Setting,
  ICredential
} from '../../app-setting/models/app-setting';
import * as settingState from '../reducers/app-setting.reducer';
import { Store, INIT } from '@ngrx/store';
import { OdooAPI } from '../../../providers/odoo/services/odooAPI';
import { HttpResponse } from '@angular/common/http';
import { ErrorState } from 'src/stores/error/store';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AuthOdooData } from 'src/providers/odoo/models/ModelRemoteOdoo';

@Injectable()
export class SettingEffects {
  constructor(
    private actions$: Actions,
    private table: SettingTable,
    private store: Store<settingState.SettingState>,
    private odooAPI: OdooAPI,
    private errorStore: Store<ErrorState>,
    private router: Router,
    private toastCtrl: ToastController
  ) { }

  @Effect()
  register$ = this.actions$.pipe(
    ofType(SettingActions.REGISTER_HTTP),
    map(
      (registerHttpAction: SettingActions.RegisterHttp) =>
        registerHttpAction.user
    ),
    switchMap((user: any) => {
      return from(this.odooAPI.register(user)).pipe(
        switchMap((data: any) => {
          // success then action to update the database
          // return of(new SettingActions.UpdateCredential(credential));

          this.router.navigateByUrl('/login');

          const toast = this.toastCtrl
            .create({
              message:
                'YOU_HAVE_BEEN_REGISTERED_SUCCEFULLAY_YOU_WILL_BE_CONTACTED_SOON',
              duration: 10000,
              position: 'top',
              // showCloseButton: true
            })
            .then(tst => {
              tst.present();
            });

          return of(new SettingActions.RegisterHttpSuccess(data));
        }),

        catchError((err: HttpResponse<any>) => {
          return of(new SettingActions.RegisterHttpFail(err));
        })
      );
    })
  );

  @Effect()
  loginForAuthenticate$ = this.actions$.pipe(
    ofType(SettingActions.LOGIN),
    switchMap((loginAction: SettingActions.Login) => {
      return of(loginAction.credential);
    }),
    switchMap((credential: ICredential) => {
      return of(new SettingActions.AuthenticateHttp(credential));
    })
  );

  @Effect()
  loginForSpinner$ = this.actions$.pipe(
    ofType(SettingActions.LOGIN),
    switchMap((loginAction: SettingActions.Login) => {
      return of(loginAction.credential);
    }),
    switchMap((credential: ICredential) => {
      return of(new SettingActions.SpinnerOnOff(true));
    })
  );

  @Effect()
  authenticate$ = this.actions$.pipe(
    ofType(SettingActions.AUTHENTICATE_HTTP),
    map(
      (authenticateHttpAction: SettingActions.AuthenticateHttp) =>
        authenticateHttpAction.credential
    ),
    switchMap((credential: ICredential) => {
       let authData:AuthOdooData={db:'baladi',email:credential.username,password:credential.password}
      return from(

        this.odooAPI.authenticate(authData)
      ).pipe(
        switchMap((data: HttpResponse<any>) => {
          return of(new SettingActions.AuthenticateHttpSuccess(data));
        }),

        catchError((err: HttpResponse<any>) => {
          const error = err.body.error;
          return of(new SettingActions.AuthenticateHttpFail(error));
        })
      );
    })
  );

  @Effect()
  authenticateHTTPSuccess$ = this.actions$.pipe(

    ofType(SettingActions.AUTHENTICATE_HTTP_SUCCESS),
    map(
      (authenticatHttpSuccessAction: SettingActions.AuthenticateHttpSuccess) =>
        authenticatHttpSuccessAction.data
    ),
    switchMap((data: HttpResponse<any>) => {

      const username = data.body.result.username;
      const uid = data.body.result.uid;

      return of(
        new SettingActions.UpdateCredential({
          username,
          password: '123',
          uid
        })
      );
    })
  );


  @Effect()
  authenticateHTTPSuccessUpdateToken$ = this.actions$.pipe(
    ofType(SettingActions.AUTHENTICATE_HTTP_SUCCESS),
    map(
      (authenticatHttpSuccessAction: SettingActions.AuthenticateHttpSuccess) =>
        authenticatHttpSuccessAction.data
    ),
    switchMap((data: HttpResponse<any>) => {
      return of(new SettingActions.UpdateToken(JSON.stringify(data.body)));
    })
  );

  @Effect()
  authenticateFailedStopSpinner$ = this.actions$.pipe(
    ofType(SettingActions.AUTHENTICATE_HTTP_FAIL),

    switchMap((err: any) => {
      return of(new SettingActions.SpinnerOnOff(false));
    })
  );

  @Effect()
  addSetting$ = this.actions$.pipe(ofType(SettingActions.ADD_SETTING)).pipe(
    switchMap((setting: SettingActions.AddSetting) => {
      return from(this.table.add(setting.payload)).pipe(
        switchMap((settings: any) => {
          return of(new SettingActions.AddUpdateSettingSuccess(settings));
        }),
        catchError(error => of(new SettingActions.AddUpdateSettingFail(error)))
      );
    })
  );

  @Effect()
  addINITSetting$ = this.actions$
    .pipe(ofType(SettingActions.ADD_INIT_SETTING_DB))
    .pipe(
      switchMap((setting: SettingActions.AddSetting) => {
        return from(this.table.add(setting.payload)).pipe(
          map(settings => {
            return new SettingActions.AddUpdateSettingSuccess(settings);
          }),
          catchError(error => {
            return of(new SettingActions.AddUpdateSettingFail(error));
          })
        );
      })
    );



  @Effect()
  updateSetting$ = this.actions$
    .pipe(ofType(SettingActions.UPDATE_SETTING))
    .pipe(
      switchMap((setting: SettingActions.UpdateSetting) => {
        return from(this.table.update(setting.payload)).pipe(
          map(settings => {
            return new SettingActions.AddUpdateSettingSuccess(settings);
          }),
          catchError(error =>
            of(new SettingActions.AddUpdateSettingFail(error))
          )
        );
      })
    );



  @Effect()
  updateCredential$ = this.actions$
    .pipe(ofType(SettingActions.UPDATE_CREDENTIAL))
    .pipe(
      switchMap((credential: SettingActions.UpdateCredential) => {
        return from(
          this.table.update({
            id: 1,
            username: credential.payload.username,
            password: credential.payload.password,
            uid: credential.payload.uid
          })
        ).pipe(
          switchMap(credentials => {
            return of(new SettingActions.UpdateCredentialSuccess(credentials));
          }),
          catchError(error => {
            return of(new SettingActions.UpdateCredentialFail(error));
          })
        );
      })
    );

  @Effect()
  updateCredentialSuccess$ = this.actions$
    .pipe(ofType(SettingActions.UPDATE_CREDENTIAL_SUCCESS))
    .pipe(
      switchMap(
        (addUpdateCommSuccess: SettingActions.UpdateCredentialSuccess) => {
          const dateNow = new Date().toISOString();
          return from(
            this.table.update({
              id: 1,
              write_date: dateNow
            })
          ).pipe(
            map(write_date => {
              return new SettingActions.UpdateWriteDateSuccess(write_date);
            }),
            catchError(error =>
              of(new SettingActions.UpdateWriteDateFail(error))
            )
          );
        }
      )
    );

  // @Effect()
  // updateTokenSuccessThenGetUserType$ = this.actions$
  //   .pipe(ofType(SettingActions.UPDATE_TOKEN_SUCCESS))
  //   .pipe(
  //     withLatestFrom(this.store.select(fromSettingSelectors.getSettings)),
  //     switchMap((
  //       // addUpdateCredentialSuccess: SettingActions.UpdateCredentialSuccess
  //       [addUpdateCredentialSuccess, settings]
  //     ) => {

  //       const uid = settings[0].uid;
  //       return this.odooAPI.getUserType(uid).pipe(
  //         switchMap((data: any) => {

  //           if (data.records && data.records.length > 0) {
  //             const group_id = data.records[0].group_id[0];
  //             const group_name = data.records[0].group_id[1];
  //             const userType = { group_id, group_name };
  //             return of(new SettingActions.GetUserTypeHttpSuccess(userType));
  //           } else {
  //             const error = '';

  //             return of(new SettingActions.GetUserTypeHttpFail(error));
  //           }
  //         }),
  //         catchError((error: any) => {

  //           return of(new SettingActions.GetUserTypeHttpFail(error));
  //         })
  //       );
  //     })
  //   );

  // @Effect()
  // getUserType$ = this.actions$
  //   .pipe(ofType(SettingActions.GET_USER_TYPE_HTTP))
  //   .pipe(
  //     switchMap(
  //       (addUpdateCredentialSuccess: SettingActions.GetUserTypeHttp) => {
  //         const uid = addUpdateCredentialSuccess.payload.uid;
  //         return this.odooAPI.getUserType(uid).pipe(
  //           map(data => {
  //             if (data.records && data.records.length > 0) {
  //               const group_id = data.records[0].group_id[0];
  //               const group_name = data.records[0].group_id[1];
  //               const userType = { group_id, group_name };
  //               return new SettingActions.GetUserTypeHttpSuccess(userType);
  //             } else {
  //               const error = '';
  //               return new SettingActions.GetUserTypeHttpFail(error);

  //             }
  //           }),
  //           catchError((error: any) => {
  //             return of(new SettingActions.GetUserTypeHttpFail(error));
  //           })
  //         );
  //       }
  //     )
  //   );

  @Effect()
  getUserTypeHTTPFailLogout$ = this.actions$.pipe(
    ofType(SettingActions.GET_USER_TYPE_HTTP_FAIL),
    switchMap((err: any) => {
      if (
        (err && err.message && err.message.toLowerCase().includes('expired')) ||
        (err &&
          err.payload &&
          err.payload.message &&
          err.payload.message.toLowerCase().includes('expired'))
      ) {
        // then token is epxired at the server then logout
        return of(new SettingActions.Logout());
      } else {
        return of(new SettingActions.SpinnerOnOff(false));
      }
    })
  );

  @Effect()
  updateCredentialFailStopSpinner$ = this.actions$.pipe(
    ofType(SettingActions.UPDATE_CREDENTIAL_FAIL),
    switchMap((err: any) => {
      return of(new SettingActions.SpinnerOnOff(false));
    })
  );
  @Effect()
  getUserTypeHTTPSuccessOffSpinner$ = this.actions$.pipe(
    ofType(SettingActions.GET_USER_TYPE_HTTP_SUCCESS),
    switchMap((err: any) => {
      return of(new SettingActions.SpinnerOnOff(false));
    })
  );
  @Effect()
  getUserTypeHTTPFailOffSpinner$ = this.actions$.pipe(
    ofType(SettingActions.GET_USER_TYPE_HTTP_FAIL),
    switchMap((err: any) => {
      return of(new SettingActions.SpinnerOnOff(false));
    })
  );

  @Effect()
  logout$ = this.actions$.pipe(ofType(SettingActions.LOGOUT)).pipe(
    switchMap((token: SettingActions.Logout) => {
      return from(this.table.update({ id: 1, token: '', username: '' })).pipe(
        map(tokens => {
          this.router.navigateByUrl('/login');
          return new SettingActions.LogoutSuccess();
        }),
        catchError(error => of(new SettingActions.LogoutFail(error)))
      );
    })
  );

  @Effect()
  updateToken$ = this.actions$.pipe(ofType(SettingActions.UPDATE_TOKEN)).pipe(
    switchMap((token: SettingActions.UpdateToken) => {


      localStorage.setItem("token", JSON.stringify(token.payload));

      return from(this.table.update({ id: 1, token: token.payload })).pipe(
        map(tokens => {

          return new SettingActions.UpdateTokenSuccess(token.payload);
        }),
        catchError(error => { return of(new SettingActions.UpdateTokenFail(error)) })
      );
    })
  );

  // @Effect()
  // updateTokenSuccess$ = this.actions$
  //   .pipe(ofType(SettingActions.UPDATE_CREDENTIAL_SUCCESS))
  //   .pipe(
  //     switchMap((addUpdateCommSuccess: SettingActions.UpdateTokenSuccess) => {
  //       const dateNow = new Date().toISOString();
  //       return from(
  //         this.table.update({
  //           id: 1,
  //           write_date: dateNow
  //         })
  //       ).pipe(
  //         map(write_date => {
  //           return new SettingActions.UpdateWriteDateSuccess(write_date);
  //         }),
  //         catchError(error => of(new SettingActions.UpdateWriteDateFail(error)))
  //       );
  //     })
  //   );

  // @Effect()
  // UpdateCompanyInfo$ = this.actions$
  //   .ofType(SettingActions.UPDATE_COMANY_INFO)
  //   .pipe(
  //     switchMap((data: SettingActions.UpdateCompanyInfo) => {
  //       return Observable.fromPromise(
  //         this.table.update({
  //           id: 1,
  //           company_name: data.payload.name,
  //           company_number: data.payload.phone,
  //           logo: data.payload.logo
  //         })
  //       ).pipe(
  //         map(uid => {
  //           return new SettingActions.UpdateCompanyInfoSuccess(uid);
  //         }),
  //         catchError(error =>
  //           of(new SettingActions.UpdateCompanyInfoFail(error))
  //         )
  //       );
  //     })
  //   );

  // @Effect()
  // UpdateUid$ = this.actions$.ofType(SettingActions.UPDATE_UID).pipe(
  //   switchMap((uid: SettingActions.UpdateUid) => {
  //     return Observable.fromPromise(
  //       this.table.update({ id: 1, uid: uid.payload })
  //     ).pipe(
  //       map(uid => {
  //         return new SettingActions.UpdateUidSuccess(uid);
  //       }),
  //       catchError(error => of(new SettingActions.UpdateUidFail(error)))
  //     );
  //   })
  // );

  // @Effect()
  // UpdateUidSuccess$ = this.actions$
  //   .ofType(SettingActions.UPDATE_UID_SUCCESS)
  //   .pipe(
  //     switchMap((uid: SettingActions.UpdateUidSuccess) => {
  //       this.odooAPI.getRepIDByUserId(uid.payload.uid).subscribe(data => {});
  //       return Observable.empty();
  //     })
  //   );

  // @Effect()
  // UpdateSyncTime$ = this.actions$.ofType(SettingActions.UPDATE_SYNC_TIME).pipe(
  //   switchMap((sync_time: SettingActions.UpdateSyncTime) => {
  //     return Observable.fromPromise(
  //       this.table.update({ id: 1, sync_time: sync_time.payload })
  //     ).pipe(
  //       map(sync_time => {
  //         return new SettingActions.UpdateSyncTimeSuccess(sync_time);
  //       }),
  //       catchError(error => of(new SettingActions.UpdateSyncTimeFail(error)))
  //     );
  //   })
  // );

  // @Effect()
  // UpdateSyncTimeSuccess$ = this.actions$
  //   .ofType(SettingActions.UPDATE_SYNC_TIME_SUCCESS)
  //   .pipe(
  //     switchMap((sync_time: SettingActions.UpdateSyncTimeSuccess) => {
  //       return Observable.empty();
  //     })
  //   );

  // @Effect()
  // UpdateCompanyInfoSuccess$ = this.actions$
  //   .ofType(SettingActions.UPDATE_UID_SUCCESS)
  //   .pipe(
  //     switchMap((uid: SettingActions.UpdateUidSuccess) => {
  //       this.odooAPI.getCompanyInfo().subscribe(data => {});
  //       return Observable.empty();
  //     })
  //   );

  // @Effect()
  // UpdateLastLogin$ = this.actions$
  //   .ofType(SettingActions.UPDATE_LAST_LOGIN)
  //   .pipe(
  //     switchMap((lastLogin: SettingActions.UpdateLastLogin) => {
  //       return Observable.fromPromise(
  //         this.table.update({ id: 1, last_login: lastLogin.payload })
  //       ).pipe(
  //         map(lastLogin => {
  //           return new SettingActions.UpdateLastLoginSuccess(lastLogin);
  //         }),
  //         catchError(error => of(new SettingActions.UpdateLastLoginFail(error)))
  //       );
  //     })
  //   );

  // @Effect()
  // UpdateConnectionType$ = this.actions$
  //   .ofType(SettingActions.UPDATE_CONNECTION_TYPE)
  //   .pipe(
  //     switchMap((connectionType: SettingActions.UpdateConnectionType) => {
  //       return Observable.fromPromise(
  //         this.table.update({ id: 1, connection_type: connectionType.payload })
  //       ).pipe(
  //         map(connectionType => {
  //           return new SettingActions.UpdateConnectionTypeSuccess(
  //             connectionType
  //           );
  //         }),
  //         catchError(error =>
  //           of(new SettingActions.UpdateConnectionTypeFail(error))
  //         )
  //       );
  //     })
  //   );

  // @Effect()
  // UpdateConnectionStatus$ = this.actions$
  //   .ofType(SettingActions.UPDATE_CONNECTION_STATUS)
  //   .pipe(
  //     switchMap((connectionStatus: SettingActions.UpdateConnectionStatus) => {
  //       return Observable.fromPromise(
  //         this.table.update({
  //           id: 1,
  //           connection_status: connectionStatus.payload
  //         })
  //       ).pipe(
  //         map(connectionStatus => {
  //           return new SettingActions.UpdateConnectionStatusSuccess(
  //             connectionStatus
  //           );
  //         }),
  //         catchError(error =>
  //           of(new SettingActions.UpdateConnectionStatusFail(error))
  //         )
  //       );
  //     })
  //   );

  // 1 for ar , 2 for en
  @Effect()
  updateLanguage$ = this.actions$
    .pipe(ofType(SettingActions.UPDATE_LANGUAGE))
    .pipe(
      switchMap((language: SettingActions.UpdateLanguage) => {
        return from(
          this.table.update({ id: 1, language: language.payload })
        ).pipe(
          map(languages => {
            return new SettingActions.UpdateLanguageSuccess(languages);
          }),
          catchError(error => of(new SettingActions.UpdateLanguageFail(error)))
        );
      })
    );

  // @Effect()
  // UpdateDeviceType$ = this.actions$
  //   .ofType(SettingActions.UPDATE_DEVICE_TYPE)
  //   .pipe(
  //     switchMap((deviceType: SettingActions.UpdateDeviceType) => {
  //       return Observable.fromPromise(
  //         this.table.update({ id: 1, device_type: deviceType.payload })
  //       ).pipe(
  //         map(deviceType => {
  //           return new SettingActions.UpdateDeviceTypeSuccess(deviceType);
  //         }),
  //         catchError(error =>
  //           of(new SettingActions.UpdateDeviceTypeFail(error))
  //         )
  //       );
  //     })
  //   );

  // @Effect()
  // UpdateDeviceNumber$ = this.actions$
  //   .ofType(SettingActions.UPDATE_DEVICE_NUMBER)
  //   .pipe(
  //     switchMap((deviceNumber: SettingActions.UpdateDeviceNumber) => {
  //       return Observable.fromPromise(
  //         this.table.update({ id: 1, device_number: deviceNumber.payload })
  //       ).pipe(
  //         map(deviceNumber => {
  //           return new SettingActions.UpdateDeviceNumberSuccess(deviceNumber);
  //         }),
  //         catchError(error =>
  //           of(new SettingActions.UpdateDeviceNumberFail(error))
  //         )
  //       );
  //     })
  //   );

  // @Effect()
  // deleteSetting$ = this.actions$.ofType(SettingActions.DELETE_SETTING).pipe(
  //   switchMap((setting: SettingActions.DeleteSetting) => {
  //     return Observable.fromPromise(this.table.delete(setting.payload)).pipe(
  //       map((data: ISetting) => {
  //         return new SettingActions.DeleteSettingSuccess(data);
  //       }),
  //       catchError(error => of(new SettingActions.DeleteSettingFail(error)))
  //     );
  //   })
  // );

  @Effect()
  getSettings$ = this.actions$.pipe(ofType(SettingActions.LOAD_SETTING)).pipe(
    withLatestFrom(this.store.select(settingState.getDBLoaded)),

    // so only it is loaded once
    filter(([_, loaded]) => !loaded),

    switchMap(() => {
      return this.table.getAll().pipe(
        map((data: ISetting[]) => {
          return new SettingActions.LoadSettingSuccess(data);
        }),
        catchError(error => {
          return of(new SettingActions.LoadSettingFail(error));
        })
      );
    })
  );

  @Effect()
  getSettingsSuccess$ = this.actions$
    .pipe(ofType(SettingActions.LOAD_SETTING_SUCCESS))
    .pipe(
      switchMap((loadSettingAction: SettingActions.LoadSettingSuccess) => {
        if (loadSettingAction.payload.length === 0) {
          const objSetting: ISetting = Setting.init();
          objSetting.username = 'demo';
          objSetting.password = 'demo';
          objSetting.token = null;
          objSetting.language = 1;
          objSetting.server_url = 'www.delivery.io';
          objSetting.db = 'demo';
          objSetting.customer_code = 'demo';

          this.store.dispatch(new SettingActions.AddINITSettingDB(objSetting));
        }
        // load login data also
        if (loadSettingAction.payload.length !== 0) {
          const objSetting: ISetting = Setting.init();
        }

        return of();
      })
    );

  // @Effect()
  // AccessInfo$ = this.actions$.ofType(SettingActions.ACCESS_INFO).pipe(
  //   switchMap((access_info: SettingActions.AccessInfo) => {
  //     return Observable.fromPromise(
  //       this.table.update({
  //         id: 1,
  //         server_url: access_info.payload.server_url,
  //         db: access_info.payload.db,
  //         customer_code: access_info.payload.customer_code,
  //         expiration_date: access_info.payload.expiration_date
  //       })
  //     ).pipe(
  //       map(token => {
  //         return new SettingActions.AccessInfoSuccess(token);
  //       }),
  //       catchError(error => of(new SettingActions.AccessInfoFail(error)))
  //     );
  //   })
  // );

  // @Effect()
  // AccessInfoSuccess$ = this.actions$
  //   .ofType(SettingActions.ACCESS_INFO_SUCCESS)
  //   .pipe(
  //     switchMap((addUpdateCommSuccess: SettingActions.AccessInfoSuccess) => {
  //       nav.setRoot('LoginPage');

  //       const dateNow = new Date().toISOString();
  //       return Observable.fromPromise(
  //         this.table.update({
  //           id: 1,
  //           write_date: dateNow
  //         })
  //       ).pipe(
  //         map(write_date => {
  //           return new SettingActions.UpdateWriteDateSuccess(write_date);
  //         }),
  //         catchError(error => of(new SettingActions.UpdateWriteDateFail(error)))
  //       );
  //     })
  //   );

  // @Effect()
  // DropSettingTable$ = this.actions$
  //   .ofType(SettingActions.DROP_SETTING_TABLE)
  //   .pipe(
  //     switchMap((delete_table: SettingActions.DropSettingTable) => {
  //       return Observable.fromPromise(this.table.drop()).pipe(
  //         map(delete_table => {
  //           return new SettingActions.DropSettingTableSuccess(delete_table);
  //         }),
  //         catchError(error =>
  //           of(new SettingActions.DropSettingTableFail(error))
  //         )
  //       );
  //     })
  //   );

  // @Effect()
  // DropSettingTableSuccess$ = this.actions$
  //   .ofType(SettingActions.DROP_SETTING_TABLE_SUCCESS)
  //   .pipe(
  //     switchMap((delete_table: SettingActions.DropSettingTableSuccess) => {
  //       return Observable.fromPromise(this.table.create()).pipe(
  //         map(delete_table => {
  //           return new SettingActions.NewSettingTable();
  //         }),
  //         catchError(error =>
  //           of(new SettingActions.DropSettingTableFail(error))
  //         )
  //       );
  //     })
  //   );

  // @Effect()
  // NewSettingTable$ = this.actions$
  //   .ofType(SettingActions.NEW_SETTING_TABLE)
  //   .pipe(
  //     switchMap((loadSettingAction: SettingActions.LoadSettingSuccess) => {
  //       const objSetting: ISetting = Setting.init();
  //       objSetting.username = 'demo';
  //       objSetting.password = 'demo';
  //       objSetting.token = null;
  //       objSetting.language = 1;
  //       objSetting.server_url = 'demo';
  //       objSetting.db = 'demo';
  //       objSetting.customer_code = 'demo';

  //       this.store.dispatch(new SettingActions.AddINITSettingDB(objSetting));

  //       return Observable.empty();
  //     })
  //   );

  // @Effect()
  // UpdateUrlAndDb$ = this.actions$.ofType(SettingActions.UPDATE_URL_AND_DB).pipe(
  //   switchMap((data: SettingActions.UpdateUrlAndDb) => {
  //     return Observable.fromPromise(
  //       this.table.update({
  //         id: 1,
  //         server_url: data.payload.server_url,
  //         db: data.payload.db
  //       })
  //     ).pipe(
  //       map(data => {
  //         return new SettingActions.UpdateUrlAndDbSuccess(data);
  //       }),
  //       catchError(error => of(new SettingActions.UpdateUrlAndDbFail(error)))
  //     );
  //   })
  // );

  // @Effect()
  // UpdateUrlAndDbSuccess$ = this.actions$
  //   .ofType(SettingActions.UPDATE_URL_AND_DB)
  //   .pipe(
  //     switchMap((addUpdateCommSuccess: SettingActions.UpdateUrlAndDb) => {
  //       // const nav = this.app.getRootNav();
  //       nav.setRoot('HomePage');
  //       const dateNow = new Date().toISOString();
  //       return Observable.fromPromise(
  //         this.table.update({
  //           id: 1,
  //           write_date: dateNow
  //         })
  //       ).pipe(
  //         map(write_date => {
  //           return new SettingActions.UpdateUrlAndDbSuccess(write_date);
  //         }),
  //         catchError(error => of(new SettingActions.UpdateUrlAndDbFail(error)))
  //       );
  //     })
  //   );

  // @Effect()
  // loadOneSignalData$ = this.actions$.pipe(
  //   ofType(SettingsActions.GET_ONE_SIGNAL)
  // );

  @Effect()
  updateOneSignalDB$ = this.actions$.pipe(
    ofType(SettingActions.UPDATE_ONE_SIGNAL_DB),
    switchMap((oneSignalData: SettingActions.UpdateOneSignalDB) => {
      return from(
        this.table.update({
          id: 1,
          one_signal_user_id: oneSignalData.payload.one_signal_user_id,
          one_signal_push_token: oneSignalData.payload.one_signal_push_token,
          one_signal_last_update: oneSignalData.payload.one_signal_last_update,
          one_signal_is_dirty: oneSignalData.payload.one_signal_is_dirty
        })
      ).pipe(
        map((data: any) => {
          return new SettingActions.UpdateOneSignalDBSuccess(data);
        }),
        catchError(error => of(new SettingActions.UpdateOneSignalDBFail(error)))
      );
    })
  );

  // @Effect()
  // OneSignalNewUpdateDB$ = this.actions$
  //   .ofType(SettingActions.ONE_SIGNAL_NEW_UPDATE_DB)
  //   .pipe(
  //     switchMap((oneSignalData: SettingActions.OneSignalNewUpdateDB) => {
  //       return Observable.fromPromise(
  //         this.table.update({
  //           id: 1,
  //           one_signal_is_dirty: oneSignalData.payload.one_signal_is_dirty
  //         })
  //       ).pipe(
  //         map(oneSignalData => {
  //           return new SettingActions.OneSignalNewUpdateDBSuccess(
  //             oneSignalData
  //           );
  //         }),
  //         catchError(error =>
  //           of(new SettingActions.OneSignalNewUpdateDBFail(error))
  //         )
  //       );
  //     })
  //   );

  // @Effect()
  // UpdateOneSignalHTTP$ = this.actions$
  //   .ofType(SettingActions.UPDATE_ONE_SIGNAL_HTTP)
  //   .pipe(
  //     switchMap((oneSignalData: SettingActions.UpdateOneSignalHTTP) => {
  //       return this.odooAPI

  //         .update_one_signal(
  //           oneSignalData.payload.one_signal_user_id,
  //           oneSignalData.payload.one_signal_push_token,
  //           oneSignalData.payload.rep_id
  //         )
  //         .pipe(
  //           map(oneSignalData => {
  //             return new SettingActions.UpdateOneSignalHTTPSuccess(
  //               oneSignalData
  //             );
  //           }),
  //           catchError(error =>
  //             of(new SettingActions.UpdateOneSignalHTTPFail(error))
  //           )
  //         );
  //     })
  //   );

  // // remove the dirty from the setting
  // @Effect()
  // UpdateOneSignalHTTPSuccess$ = this.actions$
  //   .ofType(SettingActions.UPDATE_ONE_SIGNAL_HTTP_SUCCESS)
  //   .pipe(
  //     switchMap((oneSignalData: SettingActions.UpdateOneSignalHTTPSuccess) => {
  //       return of(
  //         new SettingActions.OneSignalNewUpdateDB({
  //           one_signal_is_dirty: 0
  //         })
  //       );
  //     })
  //   );

  // @Effect()
  // UpdateLastWeatherUpdate$ = this.actions$
  //   .ofType(SettingActions.UPDATE_LAST_WEATHER_UPDATE)
  //   .pipe(
  //     switchMap((lastUpdate: SettingActions.UpdateLastWeatherUpdate) => {
  //       return Observable.fromPromise(
  //         this.table.update({ id: 1, last_weather_update: lastUpdate.payload })
  //       ).pipe(
  //         map(lastUpdate => {
  //           return new SettingActions.UpdateLastWeatherUpdateSuccess(
  //             lastUpdate
  //           );
  //         }),
  //         catchError(error =>
  //           of(new SettingActions.UpdateLastWeatherUpdateFail(error))
  //         )
  //       );
  //     })
  //   );

  // @Effect()
  // UpdateLastWeatherUpdateSuccess$ = this.actions$
  //   .ofType(SettingActions.UPDATE_LAST_WEATHER_UPDATE_SUCCESS)
  //   .pipe(
  //     switchMap((lastUpdate: SettingActions.UpdateLastWeatherUpdateSuccess) => {
  //       return Observable.empty();
  //     })
  //   );

  // @Effect()
  // UpdateWeatherStatus$ = this.actions$
  //   .ofType(SettingActions.UPDATE_WEATHER_STATUS)
  //   .pipe(
  //     switchMap((weatherStatus: SettingActions.UpdateWeatherStatus) => {
  //       return Observable.fromPromise(
  //         this.table.update({ id: 1, weather_status: weatherStatus.payload })
  //       ).pipe(
  //         map(weatherStatus => {
  //           return new SettingActions.UpdateWeatherStatusSuccess(weatherStatus);
  //         }),
  //         catchError(error =>
  //           of(new SettingActions.UpdateWeatherStatusFail(error))
  //         )
  //       );
  //     })
  //   );
}
