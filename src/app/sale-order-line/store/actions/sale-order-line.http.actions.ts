import { Action } from "@ngrx/store";
import { ISaleOrderLine} from "../../models/sale-order-line";

// HTTP CRUD

export enum SaleOrderLineHTTPActionsType {
  // HTTP CRUD
  ADD_HTTP = "[SaleOrderLine] ADD_HTTP",
    UPDATE_HTTP = "[SaleOrderLine] UPDATE_HTTP",
    ADD_UPDATE_HTTP_SUCCESS = "[SaleOrderLine] ADD_UPDATE_HTTP_SUCCESS",
    ADD_UPDATE_HTTP_FAIL = "[SaleOrderLine] ADD_UPDATE_HTTP_FAIL",

    DELETE_HTTP = "[SaleOrderLine] DELETE_HTTP",
    DELETE_HTTP_SUCCESS = "[SaleOrderLine] DELETE_HTTP_SUCCESS",
    DELETE_HTTP_FAIL = "[SaleOrderLine] DELETE_HTTP_FAIL",

    LOAD_HTTP = "[SaleOrderLine] LOAD_HTTP",
    LOAD_HTTP_SUCCESS = "[SaleOrderLine] LOAD_HTTP_SUCCESS",
    LOAD_HTTP_FAIL = "[SaleOrderLine] LOAD_HTTP_FAIL",

    REFRESH_HTTP = "[SaleOrderLine] REFRESH_HTTP",
    REFRESH_HTTP_SUCCESS = "[SaleOrderLine] REFRESH_HTTP_SUCCESS",
    REFRESH_HTTP_FAIL = "[SaleOrderLine] REFRESH_HTTP_FAIL"



}

export class AddHTTP implements Action {
  readonly type =SaleOrderLineHTTPActionsType.ADD_HTTP;
constructor(public payload: {data:ISaleOrderLine}) { }
}

export class UpdateHTTP implements Action {
  readonly type =SaleOrderLineHTTPActionsType.UPDATE_HTTP;
constructor(public payload: { id: number, data: any }) { }
}

export class AddUpdateHTTPSuccess implements Action {
  readonly type =SaleOrderLineHTTPActionsType.ADD_UPDATE_HTTP_SUCCESS;
constructor(public payload: {data:ISaleOrderLine}) { }
}
export class AddUpdateHTTPFail implements Action {
  readonly type =SaleOrderLineHTTPActionsType.ADD_UPDATE_HTTP_FAIL;
constructor(public payload: any) { }
}

export class DeleteHTTP implements Action {
  readonly type =SaleOrderLineHTTPActionsType.DELETE_HTTP;
constructor(public payload: { id: number }) { }
}

export class DeleteHTTPSuccess implements Action {
  readonly type =SaleOrderLineHTTPActionsType.DELETE_HTTP_SUCCESS;
constructor(public payload: number) { }
}

export class DeleteHTTPFail implements Action {
  readonly type =SaleOrderLineHTTPActionsType.DELETE_HTTP_FAIL;
constructor(public payload: any) { }
}

export class LoadHTTP implements Action {
  readonly type =SaleOrderLineHTTPActionsType.LOAD_HTTP;
constructor(public payload: { domain: any, limit: number, offset: number, fields?: any }) { }
}
export class LoadHTTPSuccess implements Action {
  readonly type =SaleOrderLineHTTPActionsType.LOAD_HTTP_SUCCESS;
constructor(public payload: ISaleOrderLine) { }
}
export class LoadHTTPFail implements Action {
  readonly type =SaleOrderLineHTTPActionsType.LOAD_HTTP_FAIL;
constructor(public payload: any) { }
}

export class RefreshHTTP implements Action {
  readonly type =SaleOrderLineHTTPActionsType.REFRESH_HTTP;
constructor(public payload: { domain: any, limit: number, offset: number, fields?: any }) { }
}
export class RefreshHTTPSuccess implements Action {
  readonly type =SaleOrderLineHTTPActionsType.REFRESH_HTTP_SUCCESS;
constructor(public payload: ISaleOrderLine) { }
}
export class RefreshHTTPFail implements Action {
  readonly type =SaleOrderLineHTTPActionsType.REFRESH_HTTP_FAIL;
constructor(public payload: any) { }
}



export type SaleOrderLineHTTPActions =
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


