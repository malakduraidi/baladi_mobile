import { Action } from '@ngrx/store';
import {
  ISetting,
  ICredential,
  IUserType
} from '../../app-setting/models/app-setting';
import { HttpResponse } from '@angular/common/http';

export const AUTHENTICATE_HTTP = '[APP_SETTING] Authenticate Http';
export const AUTHENTICATE_HTTP_SUCCESS =
  '[APP_SETTING] Authenticate Http Success';
export const AUTHENTICATE_HTTP_FAIL = '[APP_SETTING] Authenticate Http Fail';

export const SET_IS_LOGGED = '[APP_SETTING] Set Is Logged';

export const LOGIN = '[APP_SETTING] Login';
export const LOGIN_SUCCESS = '[APP_SETTING] Login Success';
export const LOGIN_FAIL = '[APP_SETTING] Login Fail';

export const REGISTER_HTTP = '[APP_SETTING] Register';
export const REGISTER_HTTP_SUCCESS = '[APP_SETTING] Register Success';
export const REGISTER_HTTP_FAIL = '[APP_SETTING] Register Fail';

export const UPDATE_CREDENTIAL = '[APP_SETTING] Update Credential';
export const UPDATE_CREDENTIAL_SUCCESS =
  '[APP_SETTING] Update Credential Success';
export const UPDATE_CREDENTIAL_FAIL = '[APP_SETTING] Update Credential Fail';

export const GET_USER_TYPE_HTTP = '[APP_SETTING] Get User Type Http';
export const GET_USER_TYPE_HTTP_SUCCESS =
  '[APP_SETTING] Get User Type Http Success';
export const GET_USER_TYPE_HTTP_FAIL = '[APP_SETTING] Get User Type Http Fail';

export const LOGOUT = '[APP_SETTING] Logout';
export const LOGOUT_SUCCESS = '[APP_SETTING] Logout Success';
export const LOGOUT_FAIL = '[APP_SETTING] Logout Fail';

export const UPDATE_USER_TYPE_DB = '[APP_SETTING] Update User Type DB';
export const UPDATE_USER_TYPE_DB_SUCCESS =
  '[APP_SETTING] Update User Type Db Success';
export const UPDATE_USER_TYPE_DB_FAIL =
  '[APP_SETTING] Update User Type Db Fail';

export const SPINNER_ON_OFF = '[APP_SETTING] Spinner On Off';

export const ADD_SETTING = '[APP_SETTING] Add';

export const UPDATE_SETTING = '[APP_SETTING] Update';
export const ADD_UPDATE_SETTING_SUCCESS = '[APP_SETTING] DB Add Update Success';
export const ADD_UPDATE_SETTING_FAIL = '[APP_SETTING] DB Add Update Fail';

export const ADD_INIT_SETTING_DB = '[APP_SETTING] DB Add INIT';
export const ADD_INIT_SETTING_SUCCESS_DB = '[APP_SETTING] DB Add INIT ';
export const ADD_INIT_SETTING_FAIL_DB = '[APP_SETTING] DB Add INIT';

export const DELETE_SETTING = '[APP_SETTING] Delete';
export const DELETE_SETTING_SUCCESS = '[APP_SETTING] DB Delete SETTING Success';
export const DELETE_SETTING_FAIL = '[APP_SETTING] DB Delete SETTING FAIL';
export const UPDATE_FIRST_ROW = '[APP_SETTING] DB update the first row';
export const UPDATE_FIRST_ROW_SUCCESS =
  '[APP_SETTING] DB update the first row success';
export const LOAD_SETTING = '[APP_SETTING] Load';
export const LOAD_SETTING_SUCCESS = '[APP_SETTING] DB Load Setting Success';
export const LOAD_SETTING_FAIL = '[APP_SETTING] DB Load Setting Fail';

export const UPDATE_TOKEN = '[APP_SETTING] UPDATE_TOKEN';
export const UPDATE_TOKEN_SUCCESS = '[APP_SETTING] UPDATE_TOKEN_SUCCESS';
export const UPDATE_TOKEN_FAIL = '[APP_SETTING] UPDATE_TOKEN_FAIL';

export const ACCESS_INFO = '[APP_SETTING] Save access info';
export const ACCESS_INFO_SUCCESS = '[APP_SETTING] Save access info SUCCESS';
export const ACCESS_INFO_FAIL = '[APP_SETTING] Save access info FAIL';

export const UPDATE_UID = '[APP_SETTING] UPDATE_UID';
export const UPDATE_UID_SUCCESS = '[APP_SETTING] UPDATE_UID_SUCCESS';
export const UPDATE_UID_FAIL = '[APP_SETTING] UPDATE_UID_FAIL';

export const UPDATE_SYNC_TIME = '[APP_SETTING] UPDATE_SYNC_TIME';
export const UPDATE_SYNC_TIME_SUCCESS =
  '[APP_SETTING] UPDATE_SYNC_TIME_SUCCESS';
export const UPDATE_SYNC_TIME_FAIL = '[APP_SETTING] UPDATE_SYNC_TIME_FAIL';

export const UPDATE_REP_ID = '[APP_SETTING] UPDATE_REP_ID';
export const UPDATE_REP_ID_SUCCESS = '[APP_SETTING] UPDATE_REP_ID_SUCCESS';
export const UPDATE_REP_ID_FAIL = '[APP_SETTING]UPDATE_REP_ID_FAIL';

export const UPDATE_COMANY_INFO = '[APP_SETTING] UPDATE_COMANY_INFO';
export const UPDATE_COMANY_INFO_SUCCESS =
  '[APP_SETTING] UPDATE_COMANY_INFO_SUCCESS';
export const UPDATE_COMANY_INFO_FAIL = '[APP_SETTING] UPDATE_COMANY_INFO_FAIL';

export const UPDATE_LAST_LOGIN = '[APP_SETTING] UPDATE_LAST_LOGIN';
export const UPDATE_LAST_LOGIN_SUCCESS =
  '[APP_SETTING] UPDATE_LAST_LOGIN_SUCCESS';
export const UPDATE_LAST_LOGIN_FAIL = '[APP_SETTING] UPDATE_LAST_LOGIN_FAIL';

export const UPDATE_LAST_SYNC = '[APP_SETTING] UPDATE_LAST_SYNC';
export const UPDATE_LAST_SYNC_SUCCESS =
  '[APP_SETTING] UPDATE_LAST_SYNC_SUCCESS';
export const UPDATE_LAST_SYNC_FAIL = '[APP_SETTING] UPDATE_LAST_SYNC_FAIL';

export const UPDATE_LANGUAGE = '[APP_SETTING] UPDATE_LANGUAGE';
export const UPDATE_LANGUAGE_SUCCESS = ' [APP_SETTING]UPDATE_LANGUAGE_SUCCESS';
export const UPDATE_LANGUAGE_FAIL = '[APP_SETTING] UPDATE_LANGUAGE_FAIL';

export const UPDATE_DEVICE_TYPE = '[APP_SETTING] UPDATE_DEVICE_TYPE';
export const UPDATE_DEVICE_TYPE_SUCCESS =
  '[APP_SETTING] UPDATE_DEVICE_TYPE_SUCCESS';
export const UPDATE_DEVICE_TYPE_FAIL = '[APP_SETTING] UPDATE_DEVICE_TYPE_FAIL';

export const UPDATE_DEVICE_NUMBER = '[APP_SETTING] UPDATE_DEVICE_NUMBER';
export const UPDATE_DEVICE_NUMBER_SUCCESS =
  '[APP_SETTING] UPDATE_DEVICE_NUMBER_SUCCESS';
export const UPDATE_DEVICE_NUMBER_FAIL =
  '[APP_SETTING] UPDATE_DEVICE_NUMBER_FAIL';

export const UPDATE_WRITE_DATE = '[APP_SETTING] UPDATE_WRITE_DATE';
export const UPDATE_WRITE_DATE_SUCCESS =
  '[APP_SETTING] UPDATE_WRITE_DATE_SUCCESS';
export const UPDATE_WRITE_DATE_FAIL = '[APP_SETTING] UPDATE_WRITE_DATE_FAIL';

export const DROP_SETTING_TABLE = '[APP_SETTING] Drop table';
export const DROP_SETTING_TABLE_SUCCESS = '[APP_SETTING] Drop table success';
export const DROP_SETTING_TABLE_FAIL = '[APP_SETTING] Drop table fail';

export const NEW_SETTING_TABLE = '[APP_SETTING] New table';
export const NEW_SETTING_TABLE_SUCCESS = '[APP_SETTING] New table success';
export const NEW_SETTING_TABLE_FAIL = '[APP_SETTING] New table fail';

export const UPDATE_URL_AND_DB = '[APP_SETTING] Update url and db';
export const UPDATE_URL_AND_DB_SUCCESS =
  '[APP_SETTING] Update url and db success';
export const UPDATE_URL_AND_DB_FAIL = '[APP_SETTING] Update url and db fail';

export const UPDATE_ONE_SIGNAL_DB = '[APP_SETTING] UPDATE_ONE_SIGNAL_DB';
export const UPDATE_ONE_SIGNAL_DB_SUCCESS =
  '[APP_SETTING] UPDATE_ONE_SIGNAL_DB_SUCCESS';
export const UPDATE_ONE_SIGNAL_DB_FAIL =
  '[APP_SETTING] UPDATE_ONE_SIGNAL_DB_FAIL';

export const UPDATE_ONE_SIGNAL_HTTP = '[APP_SETTING] UPDATE_ONE_SIGNAL_HTTP';
export const UPDATE_ONE_SIGNAL_HTTP_SUCCESS =
  '[APP_SETTING] UPDATE_ONE_SIGNAL_HTTP_SUCCESS';
export const UPDATE_ONE_SIGNAL_HTTP_FAIL =
  '[APP_SETTING] UPDATE_ONE_SIGNAL_HTTP_FAIL';

export const ONE_SIGNAL_NEW_UPDATE_DB =
  '[APP_SETTING] ONE_SIGNAL_NEW_UPDATE_DB';
export const ONE_SIGNAL_NEW_UPDATE_DB_SUCCESS =
  '[APP_SETTING] ONE_SIGNAL_NEW_UPDATE_DB_SUCCESS';
export const ONE_SIGNAL_NEW_UPDATE_DB_FAIL =
  '[APP_SETTING] ONE_SIGNAL_NEW_UPDATE_DB_FAIL';

export const UPDATE_LAST_WEATHER_UPDATE =
  '[APP_SETTING] UPDATE_LAST_WEATHER_UPDATE';
export const UPDATE_LAST_WEATHER_UPDATE_SUCCESS =
  '[APP_SETTING] UPDATE_LAST_WEATHER_UPDATE_SUCCESS';
export const UPDATE_LAST_WEATHER_UPDATE_FAIL =
  '[APP_SETTING] UPDATE_LAST_WEATHER_UPDATE_FAIL';

export const UPDATE_WEATHER_STATUS = '[APP_SETTING] UPDATE_WEATHER_STATUS';
export const UPDATE_WEATHER_STATUS_SUCCESS =
  '[APP_SETTING] UPDATE_WEATHER_STATUS_SUCCESS';
export const UPDATE_WEATHER_STATUS_FAIL =
  '[APP_SETTING] UPDATE_WEATHER_STATUS_FAIL';

export const UPDATE_CONNECTION_TYPE = '[APP_SETTING] UPDATE_CONNECTION_TYPE';
export const UPDATE_CONNECTION_TYPE_SUCCESS =
  '[APP_SETTING] UPDATE_CONNECTION_TYPE_SUCCESS';
export const UPDATE_CONNECTION_TYPE_FAIL =
  '[APP_SETTING] UPDATE_CONNECTION_TYPE_FAIL';
export const DROP_TABLE = '[APP_SETTING] DROP_TABLE';

export const UPDATE_CONNECTION_STATUS =
  '[APP_SETTING] UPDATE_CONNECTION_STATUS';
export const UPDATE_CONNECTION_STATUS_SUCCESS =
  '[APP_SETTING] UPDATE_CONNECTION_STATUS_SUCCESS';
export const UPDATE_CONNECTION_STATUS_FAIL =
  '[APP_SETTING] UPDATE_CONNECTION_STATUS_FAIL';

export const SHOW_ADMIN_PAGE = '[APP_SETTING] SHOW_ADMIN_PAGE';
export const HIDE_ADMIN_PAGE = '[APP_SETTING] HIDE_ADMIN_PAGE';


export class SetIsLogged implements Action {
  readonly type = SET_IS_LOGGED;
  // comes from effect
  constructor(public isLogged: boolean) { }
}
export class AuthenticateHttp implements Action {
  readonly type = AUTHENTICATE_HTTP;
  // comes from effect
  constructor(public credential: ICredential) { }
}

export class AuthenticateHttpSuccess implements Action {
  readonly type = AUTHENTICATE_HTTP_SUCCESS;
  // comes from effect
  constructor(public data: HttpResponse<any>) { }
}

export class AuthenticateHttpFail implements Action {
  readonly type = AUTHENTICATE_HTTP_FAIL;
  // comes from effect
  constructor(public payload: { err: any }) { }
}
export class Login implements Action {
  readonly type = LOGIN;
  // comes from effect
  constructor(public credential: ICredential) { }
}

export class LoginSuccess implements Action {
  readonly type = LOGIN_SUCCESS;
  // comes from effect
  constructor(public credential: ICredential) { }
}

export class LoginFail implements Action {
  readonly type = LOGIN_FAIL;
  // comes from effect
  constructor(public payload: { err: any }) { }
}

export class RegisterHttp implements Action {
  readonly type = REGISTER_HTTP;
  // comes from effect
  constructor(public user: any) { }
}

export class RegisterHttpSuccess implements Action {
  readonly type = REGISTER_HTTP_SUCCESS;
  // comes from effect
  constructor(public register: any) { }
}

export class RegisterHttpFail implements Action {
  readonly type = REGISTER_HTTP_FAIL;
  // comes from effect
  constructor(public error: any) { }
}

export class GetUserTypeHttp implements Action {
  readonly type = GET_USER_TYPE_HTTP;
  // comes from effect
  constructor(public payload: any) { }
}

export class GetUserTypeHttpSuccess implements Action {
  readonly type = GET_USER_TYPE_HTTP_SUCCESS;
  constructor(public userType: IUserType) { }
}
export class GetUserTypeHttpFail implements Action {
  readonly type = GET_USER_TYPE_HTTP_FAIL;
  constructor(public payload: any) { }
}

export class ShowAdminPage implements Action {
  readonly type = SHOW_ADMIN_PAGE;
  constructor() { }
}

export class HideAdminPage implements Action {
  readonly type = HIDE_ADMIN_PAGE;
  constructor() { }
}

export class AddSetting implements Action {
  readonly type = ADD_SETTING;
  constructor(public payload: ISetting) { }
}

export class DropTable implements Action {
  readonly type = DROP_TABLE;
  constructor() { }
}

export class AddUpdateSettingSuccess implements Action {
  readonly type = ADD_UPDATE_SETTING_SUCCESS;
  // comes from effect
  constructor(public payload: ISetting) { }
}

export class AddUpdateSettingFail implements Action {
  readonly type = ADD_UPDATE_SETTING_FAIL;
  constructor(public payload: any) { }
}

export class AddINITSettingDB implements Action {
  readonly type = ADD_INIT_SETTING_DB;
  constructor(public payload: ISetting) { }
}

export class AddINITSettingSuccessDB implements Action {
  readonly type = ADD_INIT_SETTING_SUCCESS_DB;
  // comes from effect
  constructor(public payload: ISetting) { }
}

export class AddUpdateINITSettingFailDB implements Action {
  readonly type = ADD_INIT_SETTING_FAIL_DB;
  constructor(public payload: any) { }
}

export class UpdateSetting implements Action {
  readonly type = UPDATE_SETTING;
  constructor(public payload: ISetting) { }
}

export class UpdateFirstRow implements Action {
  readonly type = UPDATE_FIRST_ROW;
  constructor(public payload: ISetting) { }
}

export class UpdateFirstRowSuccess implements Action {
  readonly type = UPDATE_FIRST_ROW_SUCCESS;
  constructor(public payload: ISetting) { }
}

export class OneSignalNewUpdateDB implements Action {
  readonly type = ONE_SIGNAL_NEW_UPDATE_DB;
  constructor(public payload: { one_signal_is_dirty: number }) { }
}
export class OneSignalNewUpdateDBSuccess implements Action {
  readonly type = ONE_SIGNAL_NEW_UPDATE_DB_SUCCESS;
  constructor(public payload: { one_signal_is_dirty: number }) { }
}
export class OneSignalNewUpdateDBFail implements Action {
  readonly type = ONE_SIGNAL_NEW_UPDATE_DB_FAIL;
  constructor(public payload: { one_signal_is_dirty: number }) { }
}

export class UpdateOneSignalDB implements Action {
  readonly type = UPDATE_ONE_SIGNAL_DB;
  constructor(
    public payload: {
      one_signal_user_id: string;
      one_signal_push_token: string;
      one_signal_last_update: string;
      one_signal_is_dirty: number;
    }
  ) { }
}

export class UpdateOneSignalDBSuccess implements Action {
  readonly type = UPDATE_ONE_SIGNAL_DB_SUCCESS;
  constructor(
    public payload: {
      one_signal_user_id: string;
      one_signal_push_token: string;
      one_signal_last_update: string;
      one_signal_is_dirty: number;
    }
  ) { }
}

export class UpdateOneSignalDBFail implements Action {
  readonly type = UPDATE_ONE_SIGNAL_DB_FAIL;
  constructor(public payload: any) { }
}

export class UpdateOneSignalHTTP implements Action {
  readonly type = UPDATE_ONE_SIGNAL_HTTP;
  constructor(
    public payload: {
      one_signal_user_id: string;
      one_signal_push_token: string;
      rep_id: number;
    }
  ) { }
}

export class UpdateOneSignalHTTPSuccess implements Action {
  readonly type = UPDATE_ONE_SIGNAL_HTTP_SUCCESS;
  constructor(
    public payload: {
      one_signal_user_id: string;
      one_signal_push_token: string;
      rep_id: number;
    }
  ) { }
}

export class UpdateOneSignalHTTPFail implements Action {
  readonly type = UPDATE_ONE_SIGNAL_HTTP_FAIL;
  constructor(public payload: any) { }
}

export class UpdateCredential implements Action {
  readonly type = UPDATE_CREDENTIAL;
  constructor(public payload: ICredential) { }
}

export class UpdateCredentialSuccess implements Action {
  readonly type = UPDATE_CREDENTIAL_SUCCESS;
  constructor(public payload: ICredential) { }
}

export class UpdateCredentialFail implements Action {
  readonly type = UPDATE_CREDENTIAL_FAIL;
  constructor(public payload: any) { }
}

export class DeleteSetting implements Action {
  readonly type = DELETE_SETTING;
  constructor(public payload: ISetting) { }
}

export class DeleteSettingSuccess implements Action {
  readonly type = DELETE_SETTING_SUCCESS;
  constructor(public payload: ISetting) { }
}

export class DeleteSettingFail implements Action {
  readonly type = DELETE_SETTING_FAIL;
  constructor(public payload: any) { }
}

export class LoadSetting implements Action {
  readonly type = LOAD_SETTING;
  constructor() { }
}

export class SpinnerOnOff implements Action {
  readonly type = SPINNER_ON_OFF;
  constructor(public on: boolean) { }
}

export class LoadSettingSuccess implements Action {
  readonly type = LOAD_SETTING_SUCCESS;
  constructor(public payload: ISetting[]) { }
}

export class LoadSettingFail implements Action {
  readonly type = LOAD_SETTING_FAIL;
  constructor(public payload: any) { }
}

export class UpdateToken implements Action {
  readonly type = UPDATE_TOKEN;
  constructor(public payload: string) { }
}

export class UpdateTokenSuccess implements Action {
  readonly type = UPDATE_TOKEN_SUCCESS;
  constructor(public payload: string) { }
}

export class UpdateTokenFail implements Action {
  readonly type = UPDATE_TOKEN_FAIL;
  constructor(public payload: any) { }
}

export class UpdateUrlAndDb implements Action {
  readonly type = UPDATE_URL_AND_DB;
  constructor(public payload: { server_url: string; db: string }) { }
}

export class UpdateUrlAndDbSuccess implements Action {
  readonly type = UPDATE_URL_AND_DB_SUCCESS;
  constructor(public payload: string) { }
}

export class UpdateUrlAndDbFail implements Action {
  readonly type = UPDATE_URL_AND_DB_FAIL;
  constructor(public payload: any) { }
}

export class AccessInfo implements Action {
  readonly type = ACCESS_INFO;
  constructor(
    public payload: {
      server_url: string;
      db: string;
      customer_code: string;
      expiration_date: string;
    }
  ) { }
}

export class AccessInfoSuccess implements Action {
  readonly type = ACCESS_INFO_SUCCESS;
  constructor(public payload: any) { }
}

export class AccessInfoFail implements Action {
  readonly type = ACCESS_INFO_FAIL;
  constructor(public payload: any) { }
}

export class UpdateUid implements Action {
  readonly type = UPDATE_UID;
  constructor(public payload: number) { }
}

export class UpdateSyncTime implements Action {
  readonly type = UPDATE_SYNC_TIME;
  constructor(public payload: number) { }
}

export class UpdateSyncTimeSuccess implements Action {
  readonly type = UPDATE_SYNC_TIME_SUCCESS;
  constructor(public payload: any) { }
}

export class UpdateSyncTimeFail implements Action {
  readonly type = UPDATE_SYNC_TIME_FAIL;
  constructor(public payload: any) { }
}
export class UpdateUidSuccess implements Action {
  readonly type = UPDATE_UID_SUCCESS;
  constructor(public payload: any) { }
}

export class UpdateUidFail implements Action {
  readonly type = UPDATE_UID_FAIL;
  constructor(public payload: any) { }
}

export class UpdateRepId implements Action {
  readonly type = UPDATE_REP_ID;
  constructor(public payload: number) { }
}

export class UpdateRepIdSuccess implements Action {
  readonly type = UPDATE_REP_ID_SUCCESS;
  constructor(public payload: any) { }
}

export class UpdateRepIdFail implements Action {
  readonly type = UPDATE_REP_ID_FAIL;
  constructor(public payload: any) { }
}

export class UpdateCompanyInfo implements Action {
  readonly type = UPDATE_COMANY_INFO;
  constructor(public payload: any) { }
}

export class UpdateCompanyInfoSuccess implements Action {
  readonly type = UPDATE_COMANY_INFO_SUCCESS;
  constructor(public payload: any) { }
}

export class UpdateCompanyInfoFail implements Action {
  readonly type = UPDATE_COMANY_INFO_FAIL;
  constructor(public payload: any) { }
}

export class UpdateLastLogin implements Action {
  readonly type = UPDATE_LAST_LOGIN;
  constructor(public payload: string) { }
}

export class UpdateLastLoginSuccess implements Action {
  readonly type = UPDATE_LAST_LOGIN_SUCCESS;
  constructor(public payload: string) { }
}

export class UpdateLastLoginFail implements Action {
  readonly type = UPDATE_LAST_LOGIN_FAIL;
  constructor(public payload: any) { }
}

export class UpdateLastSync implements Action {
  readonly type = UPDATE_LAST_SYNC;
  constructor(public payload: string) { }
}

export class UpdateLastSyncSuccess implements Action {
  readonly type = UPDATE_LAST_SYNC_SUCCESS;
  constructor(public payload: string) { }
}

export class UpdateLastSyncFail implements Action {
  readonly type = UPDATE_LAST_SYNC_FAIL;
  constructor(public payload: any) { }
}

export class UpdateLanguage implements Action {
  readonly type = UPDATE_LANGUAGE;
  constructor(public payload: number) { }
}

export class UpdateLanguageSuccess implements Action {
  readonly type = UPDATE_LANGUAGE_SUCCESS;
  constructor(public payload: any) { }
}

export class UpdateLanguageFail implements Action {
  readonly type = UPDATE_LANGUAGE_FAIL;
  constructor(public payload: any) { }
}

export class UpdateDeviceType implements Action {
  readonly type = UPDATE_DEVICE_TYPE;
  constructor(public payload: string) { }
}

export class UpdateDeviceTypeSuccess implements Action {
  readonly type = UPDATE_DEVICE_TYPE_SUCCESS;
  constructor(public payload: string) { }
}

export class UpdateDeviceTypeFail implements Action {
  readonly type = UPDATE_DEVICE_TYPE_FAIL;
  constructor(public payload: any) { }
}

export class UpdateDeviceNumber implements Action {
  readonly type = UPDATE_DEVICE_NUMBER;
  constructor(public payload: string) { }
}

export class UpdateDeviceNumberSuccess implements Action {
  readonly type = UPDATE_DEVICE_NUMBER_SUCCESS;
  constructor(public payload: string) { }
}

export class UpdateDeviceNumberFail implements Action {
  readonly type = UPDATE_DEVICE_NUMBER_FAIL;
  constructor(public payload: any) { }
}

export class UpdateWriteDate implements Action {
  readonly type = UPDATE_WRITE_DATE;
  constructor(public payload: string) { }
}

export class UpdateWriteDateSuccess implements Action {
  readonly type = UPDATE_WRITE_DATE_SUCCESS;
  constructor(public payload: string) { }
}

export class UpdateWriteDateFail implements Action {
  readonly type = UPDATE_WRITE_DATE_FAIL;
  constructor(public payload: any) { }
}

export class DropSettingTable implements Action {
  readonly type = DROP_SETTING_TABLE;
  constructor() { }
}

export class DropSettingTableSuccess implements Action {
  readonly type = DROP_SETTING_TABLE_SUCCESS;
  constructor(public payload: any) { }
}

export class DropSettingTableFail implements Action {
  readonly type = DROP_SETTING_TABLE_FAIL;
  constructor(public payload: any) { }
}

export class NewSettingTable implements Action {
  readonly type = NEW_SETTING_TABLE;
  constructor() { }
}

export class NewSettingTableSuccess implements Action {
  readonly type = NEW_SETTING_TABLE_SUCCESS;
  constructor(public payload: ISetting[]) { }
}

export class NewSettingTableFail implements Action {
  readonly type = NEW_SETTING_TABLE_FAIL;
  constructor(public payload: any) { }
}

export class UpdateLastWeatherUpdate implements Action {
  readonly type = UPDATE_LAST_WEATHER_UPDATE;
  constructor(public payload: string) { }
}

export class UpdateLastWeatherUpdateSuccess implements Action {
  readonly type = UPDATE_LAST_WEATHER_UPDATE_SUCCESS;
  constructor(public payload: any) { }
}

export class UpdateLastWeatherUpdateFail implements Action {
  readonly type = UPDATE_LAST_WEATHER_UPDATE_FAIL;
  constructor(public payload: any) { }
}

export class UpdateWeatherStatus implements Action {
  readonly type = UPDATE_WEATHER_STATUS;
  constructor(public payload: string) { }
}

export class UpdateWeatherStatusSuccess implements Action {
  readonly type = UPDATE_WEATHER_STATUS_SUCCESS;
  constructor(public payload: any) { }
}

export class UpdateWeatherStatusFail implements Action {
  readonly type = UPDATE_WEATHER_STATUS_FAIL;
  constructor(public payload: any) { }
}

export class UpdateConnectionType implements Action {
  readonly type = UPDATE_CONNECTION_TYPE;
  constructor(public payload: string) { }
}

export class UpdateConnectionTypeSuccess implements Action {
  readonly type = UPDATE_CONNECTION_TYPE_SUCCESS;
  constructor(public payload: any) { }
}

export class UpdateConnectionTypeFail implements Action {
  readonly type = UPDATE_CONNECTION_TYPE_FAIL;
  constructor(public payload: any) { }
}

export class UpdateConnectionStatus implements Action {
  readonly type = UPDATE_CONNECTION_STATUS;
  constructor(public payload: string) { }
}

export class UpdateConnectionStatusSuccess implements Action {
  readonly type = UPDATE_CONNECTION_STATUS_SUCCESS;
  constructor(public payload: any) { }
}

export class UpdateConnectionStatusFail implements Action {
  readonly type = UPDATE_CONNECTION_STATUS_FAIL;
  constructor(public payload: any) { }
}
export class Logout implements Action {
  readonly type = LOGOUT;
  constructor() { }
}

export class LogoutSuccess implements Action {
  readonly type = LOGOUT_SUCCESS;
  constructor() { }
}
export class LogoutFail implements Action {
  readonly type = LOGOUT_FAIL;
  constructor(public error: any) { }
}


export type SettingActions =
  | SetIsLogged
  | Logout
  | LogoutSuccess
  | LogoutFail
  | AddSetting
  | UpdateSetting
  | AddUpdateSettingSuccess
  | AddUpdateSettingFail
  | DeleteSetting
  | DeleteSettingSuccess
  | DeleteSettingFail
  | UpdateFirstRow
  | UpdateFirstRowSuccess
  | UpdateCredential
  | UpdateCredentialSuccess
  | UpdateCredentialFail
  | LoadSetting
  | LoadSettingFail
  | LoadSettingSuccess
  | UpdateToken
  | UpdateTokenSuccess
  | UpdateTokenFail
  | UpdateUid
  | UpdateUidSuccess
  | UpdateUidFail
  | UpdateSyncTime
  | UpdateSyncTimeSuccess
  | UpdateSyncTimeFail
  | UpdateRepId
  | UpdateRepIdSuccess
  | UpdateRepIdFail
  | UpdateLastLogin
  | UpdateLastLoginSuccess
  | UpdateLastLoginFail
  | UpdateLastSync
  | UpdateLastSyncSuccess
  | UpdateLastSyncFail
  | UpdateLanguage
  | UpdateLanguageSuccess
  | UpdateLanguageFail
  | UpdateDeviceType
  | UpdateDeviceTypeSuccess
  | UpdateDeviceTypeFail
  | UpdateDeviceNumber
  | UpdateDeviceNumberSuccess
  | UpdateDeviceNumber
  | UpdateWriteDate
  | UpdateWriteDateSuccess
  | UpdateWriteDateFail
  | AccessInfo
  | AccessInfoSuccess
  | AccessInfoFail
  | DropSettingTable
  | DropSettingTableSuccess
  | DropSettingTableFail
  | NewSettingTable
  | NewSettingTableSuccess
  | NewSettingTableFail
  | UpdateUrlAndDb
  | UpdateUrlAndDbSuccess
  | UpdateUrlAndDbFail
  | UpdateOneSignalDB
  | UpdateOneSignalDBSuccess
  | UpdateOneSignalDBFail
  | OneSignalNewUpdateDB
  | OneSignalNewUpdateDBSuccess
  | OneSignalNewUpdateDBFail
  | UpdateOneSignalHTTP
  | UpdateOneSignalHTTPSuccess
  | UpdateOneSignalHTTPFail
  | UpdateLastWeatherUpdate
  | UpdateLastWeatherUpdateSuccess
  | UpdateLastWeatherUpdateFail
  | UpdateWeatherStatus
  | UpdateWeatherStatusSuccess
  | UpdateWeatherStatusFail
  | UpdateConnectionType
  | UpdateConnectionTypeSuccess
  | UpdateConnectionTypeFail
  | UpdateConnectionStatus
  | UpdateConnectionStatusSuccess
  | UpdateConnectionStatusFail
  | ShowAdminPage
  | HideAdminPage
  | UpdateCompanyInfo
  | UpdateCompanyInfoSuccess
  | UpdateCompanyInfoFail
  | AuthenticateHttp
  | AuthenticateHttpSuccess
  | AuthenticateHttpFail
  | Login
  | LoginSuccess
  | LoginFail
  | SpinnerOnOff
  | GetUserTypeHttp
  | GetUserTypeHttpSuccess
  | GetUserTypeHttpFail;
