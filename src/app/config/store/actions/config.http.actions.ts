import { Action } from "@ngrx/store";
import { IConfig} from "../../models/config";

// HTTP CRUD

export enum ConfigHTTPActionsType {
  // HTTP CRUD
  ADD_HTTP = "[Config] ADD_HTTP",
  UPDATE_HTTP = "[Config] UPDATE_HTTP",
  ADD_UPDATE_HTTP_SUCCESS = "[Config] ADD_UPDATE_HTTP_SUCCESS",
  ADD_UPDATE_HTTP_FAIL = "[Config] ADD_UPDATE_HTTP_FAIL",

  DELETE_HTTP = "[Config] DELETE_HTTP",
  DELETE_HTTP_SUCCESS = "[Config] DELETE_HTTP_SUCCESS",
  DELETE_HTTP_FAIL = "[Config] DELETE_HTTP_FAIL",

  LOAD_HTTP = "[Config] LOAD_HTTP",
  LOAD_HTTP_SUCCESS = "[Config] LOAD_HTTP_SUCCESS",
  LOAD_HTTP_FAIL = "[Config] LOAD_HTTP_FAIL",

  REFRESH_HTTP = "[Config] REFRESH_HTTP",
  REFRESH_HTTP_SUCCESS = "[Config] REFRESH_HTTP_SUCCESS",
  REFRESH_HTTP_FAIL = "[Config] REFRESH_HTTP_FAIL"

}

export class AddHTTP implements Action {
  readonly type =ConfigHTTPActionsType.ADD_HTTP;
  constructor(public payload: {data:IConfig}) { }
}

export class UpdateHTTP implements Action {
  readonly type =ConfigHTTPActionsType.UPDATE_HTTP;
  constructor(public payload: { id: number, data: any }) { }
}

export class AddUpdateHTTPSuccess implements Action {
  readonly type =ConfigHTTPActionsType.ADD_UPDATE_HTTP_SUCCESS;
  constructor(public payload: {data:IConfig}) { }
}

export class AddUpdateHTTPFail implements Action {
  readonly type =ConfigHTTPActionsType.ADD_UPDATE_HTTP_FAIL;
  constructor(public payload: any) { }
}

export class DeleteHTTP implements Action {
  readonly type =ConfigHTTPActionsType.DELETE_HTTP;
  constructor(public payload: { id: number }) { }
}

export class DeleteHTTPSuccess implements Action {
  readonly type =ConfigHTTPActionsType.DELETE_HTTP_SUCCESS;
  constructor(public payload: number) { }
}

export class DeleteHTTPFail implements Action {
  readonly type =ConfigHTTPActionsType.DELETE_HTTP_FAIL;
  constructor(public payload: any) { }
}

// malak: in case load http
export class LoadHTTP implements Action {
  readonly type =ConfigHTTPActionsType.LOAD_HTTP;
  constructor(public payload: { domain: any, limit: number, offset: number, fields?: any }) { }
}

// malak: in case load http success
export class LoadHTTPSuccess implements Action {
  readonly type =ConfigHTTPActionsType.LOAD_HTTP_SUCCESS;
  constructor(public payload: IConfig) { }
}

// malak: in case load http fail
export class LoadHTTPFail implements Action {
  readonly type =ConfigHTTPActionsType.LOAD_HTTP_FAIL;
  constructor(public payload: any) { }
}

export class RefreshHTTP implements Action {
  readonly type =ConfigHTTPActionsType.REFRESH_HTTP;
  constructor(public payload: { domain: any, limit: number, offset: number, fields?: any }) { }
}

export class RefreshHTTPSuccess implements Action {
  readonly type =ConfigHTTPActionsType.REFRESH_HTTP_SUCCESS;
  constructor(public payload: IConfig) { }
}

export class RefreshHTTPFail implements Action {
  readonly type =ConfigHTTPActionsType.REFRESH_HTTP_FAIL;
  constructor(public payload: any) { }
}

export type ConfigHTTPActions =
  | AddHTTP
  | UpdateHTTP
  | AddUpdateHTTPSuccess
  | AddUpdateHTTPFail
  | DeleteHTTP
  | DeleteHTTPSuccess
  | DeleteHTTPFail
  | LoadHTTP
  | LoadHTTPSuccess
  | LoadHTTPFail
  | RefreshHTTP
  | RefreshHTTPSuccess
  | RefreshHTTPFail;


