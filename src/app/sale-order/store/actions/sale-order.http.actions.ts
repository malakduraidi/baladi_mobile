import { Action } from "@ngrx/store";
import { ISaleOrder} from "../../models/sale-order";

// HTTP CRUD

export enum SaleOrderHTTPActionsType {
  // HTTP CRUD
  ADD_HTTP = "[SaleOrder] ADD_HTTP",
    UPDATE_HTTP = "[SaleOrder] UPDATE_HTTP",
    ADD_UPDATE_HTTP_SUCCESS = "[SaleOrder] ADD_UPDATE_HTTP_SUCCESS",
    ADD_UPDATE_HTTP_FAIL = "[SaleOrder] ADD_UPDATE_HTTP_FAIL",

    DELETE_HTTP = "[SaleOrder] DELETE_HTTP",
    DELETE_HTTP_SUCCESS = "[SaleOrder] DELETE_HTTP_SUCCESS",
    DELETE_HTTP_FAIL = "[SaleOrder] DELETE_HTTP_FAIL",

    LOAD_HTTP = "[SaleOrder] LOAD_HTTP",
    LOAD_HTTP_SUCCESS = "[SaleOrder] LOAD_HTTP_SUCCESS",
    LOAD_HTTP_FAIL = "[SaleOrder] LOAD_HTTP_FAIL",

    REFRESH_HTTP = "[SaleOrder] REFRESH_HTTP",
    REFRESH_HTTP_SUCCESS = "[SaleOrder] REFRESH_HTTP_SUCCESS",
    REFRESH_HTTP_FAIL = "[SaleOrder] REFRESH_HTTP_FAIL"



}

export class AddHTTP implements Action {
  readonly type =SaleOrderHTTPActionsType.ADD_HTTP;
constructor(public payload: {data:ISaleOrder}) { }
}

export class UpdateHTTP implements Action {
  readonly type =SaleOrderHTTPActionsType.UPDATE_HTTP;
constructor(public payload: { id: number, data: any }) { }
}

export class AddUpdateHTTPSuccess implements Action {
  readonly type =SaleOrderHTTPActionsType.ADD_UPDATE_HTTP_SUCCESS;
constructor(public payload: {data:ISaleOrder}) { }
}
export class AddUpdateHTTPFail implements Action {
  readonly type =SaleOrderHTTPActionsType.ADD_UPDATE_HTTP_FAIL;
constructor(public payload: any) { }
}

export class DeleteHTTP implements Action {
  readonly type =SaleOrderHTTPActionsType.DELETE_HTTP;
constructor(public payload: { id: number }) { }
}

export class DeleteHTTPSuccess implements Action {
  readonly type =SaleOrderHTTPActionsType.DELETE_HTTP_SUCCESS;
constructor(public payload: number) { }
}

export class DeleteHTTPFail implements Action {
  readonly type =SaleOrderHTTPActionsType.DELETE_HTTP_FAIL;
constructor(public payload: any) { }
}

export class LoadHTTP implements Action {
  readonly type =SaleOrderHTTPActionsType.LOAD_HTTP;
constructor(public payload: { domain: any, limit: number, offset: number, fields?: any }) { }
}
export class LoadHTTPSuccess implements Action {
  readonly type =SaleOrderHTTPActionsType.LOAD_HTTP_SUCCESS;
constructor(public payload: ISaleOrder) { }
}
export class LoadHTTPFail implements Action {
  readonly type =SaleOrderHTTPActionsType.LOAD_HTTP_FAIL;
constructor(public payload: any) { }
}

export class RefreshHTTP implements Action {
  readonly type =SaleOrderHTTPActionsType.REFRESH_HTTP;
constructor(public payload: { domain: any, limit: number, offset: number, fields?: any }) { }
}
export class RefreshHTTPSuccess implements Action {
  readonly type =SaleOrderHTTPActionsType.REFRESH_HTTP_SUCCESS;
constructor(public payload: ISaleOrder) { }
}
export class RefreshHTTPFail implements Action {
  readonly type =SaleOrderHTTPActionsType.REFRESH_HTTP_FAIL;
constructor(public payload: any) { }
}



export type SaleOrderHTTPActions =
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


