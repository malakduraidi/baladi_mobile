import { Action } from "@ngrx/store";
import { IResCountryState} from "../../models/res-country-state";

// HTTP CRUD

export enum ResCountryStateHTTPActionsType {
  // HTTP CRUD
  ADD_HTTP = "[ResCountryState] ADD_HTTP",
    UPDATE_HTTP = "[ResCountryState] UPDATE_HTTP",
    ADD_UPDATE_HTTP_SUCCESS = "[ResCountryState] ADD_UPDATE_HTTP_SUCCESS",
    ADD_UPDATE_HTTP_FAIL = "[ResCountryState] ADD_UPDATE_HTTP_FAIL",

    DELETE_HTTP = "[ResCountryState] DELETE_HTTP",
    DELETE_HTTP_SUCCESS = "[ResCountryState] DELETE_HTTP_SUCCESS",
    DELETE_HTTP_FAIL = "[ResCountryState] DELETE_HTTP_FAIL",

    LOAD_HTTP = "[ResCountryState] LOAD_HTTP",
    LOAD_HTTP_SUCCESS = "[ResCountryState] LOAD_HTTP_SUCCESS",
    LOAD_HTTP_FAIL = "[ResCountryState] LOAD_HTTP_FAIL",

    REFRESH_HTTP = "[ResCountryState] REFRESH_HTTP",
    REFRESH_HTTP_SUCCESS = "[ResCountryState] REFRESH_HTTP_SUCCESS",
    REFRESH_HTTP_FAIL = "[ResCountryState] REFRESH_HTTP_FAIL"



}

export class AddHTTP implements Action {
  readonly type =ResCountryStateHTTPActionsType.ADD_HTTP;
constructor(public payload: {data:IResCountryState}) { }
}

export class UpdateHTTP implements Action {
  readonly type =ResCountryStateHTTPActionsType.UPDATE_HTTP;
constructor(public payload: { id: number, data: any }) { }
}

export class AddUpdateHTTPSuccess implements Action {
  readonly type =ResCountryStateHTTPActionsType.ADD_UPDATE_HTTP_SUCCESS;
constructor(public payload: {data:IResCountryState}) { }
}
export class AddUpdateHTTPFail implements Action {
  readonly type =ResCountryStateHTTPActionsType.ADD_UPDATE_HTTP_FAIL;
constructor(public payload: any) { }
}

export class DeleteHTTP implements Action {
  readonly type =ResCountryStateHTTPActionsType.DELETE_HTTP;
constructor(public payload: { id: number }) { }
}

export class DeleteHTTPSuccess implements Action {
  readonly type =ResCountryStateHTTPActionsType.DELETE_HTTP_SUCCESS;
constructor(public payload: number) { }
}

export class DeleteHTTPFail implements Action {
  readonly type =ResCountryStateHTTPActionsType.DELETE_HTTP_FAIL;
constructor(public payload: any) { }
}

export class LoadHTTP implements Action {
  readonly type =ResCountryStateHTTPActionsType.LOAD_HTTP;
constructor(public payload: { domain: any, limit: number, offset: number, fields?: any }) { }
}
export class LoadHTTPSuccess implements Action {
  readonly type =ResCountryStateHTTPActionsType.LOAD_HTTP_SUCCESS;
constructor(public payload: IResCountryState[]) { }
}
export class LoadHTTPFail implements Action {
  readonly type =ResCountryStateHTTPActionsType.LOAD_HTTP_FAIL;
constructor(public payload: any) { }
}

export class RefreshHTTP implements Action {
  readonly type =ResCountryStateHTTPActionsType.REFRESH_HTTP;
constructor(public payload: { domain: any, limit: number, offset: number, fields?: any }) { }
}
export class RefreshHTTPSuccess implements Action {
  readonly type =ResCountryStateHTTPActionsType.REFRESH_HTTP_SUCCESS;
constructor(public payload: IResCountryState[]) { }
}
export class RefreshHTTPFail implements Action {
  readonly type =ResCountryStateHTTPActionsType.REFRESH_HTTP_FAIL;
constructor(public payload: any) { }
}



export type ResCountryStateHTTPActions =
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


