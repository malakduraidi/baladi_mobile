import { Action } from "@ngrx/store";
import { IProductMainSlider} from "../../models/product-main-slider";

// HTTP CRUD

export enum ProductMainSliderHTTPActionsType {
  // HTTP CRUD
  ADD_HTTP = "[ProductMainSlider] ADD_HTTP",
    UPDATE_HTTP = "[ProductMainSlider] UPDATE_HTTP",
    ADD_UPDATE_HTTP_SUCCESS = "[ProductMainSlider] ADD_UPDATE_HTTP_SUCCESS",
    ADD_UPDATE_HTTP_FAIL = "[ProductMainSlider] ADD_UPDATE_HTTP_FAIL",

    DELETE_HTTP = "[ProductMainSlider] DELETE_HTTP",
    DELETE_HTTP_SUCCESS = "[ProductMainSlider] DELETE_HTTP_SUCCESS",
    DELETE_HTTP_FAIL = "[ProductMainSlider] DELETE_HTTP_FAIL",

    LOAD_HTTP = "[ProductMainSlider] LOAD_HTTP",
    LOAD_HTTP_SUCCESS = "[ProductMainSlider] LOAD_HTTP_SUCCESS",
    LOAD_HTTP_FAIL = "[ProductMainSlider] LOAD_HTTP_FAIL",

    REFRESH_HTTP = "[ProductMainSlider] REFRESH_HTTP",
    REFRESH_HTTP_SUCCESS = "[ProductMainSlider] REFRESH_HTTP_SUCCESS",
    REFRESH_HTTP_FAIL = "[ProductMainSlider] REFRESH_HTTP_FAIL"



}

export class AddHTTP implements Action {
  readonly type =ProductMainSliderHTTPActionsType.ADD_HTTP;
constructor(public payload: {data:IProductMainSlider}) { }
}

export class UpdateHTTP implements Action {
  readonly type =ProductMainSliderHTTPActionsType.UPDATE_HTTP;
constructor(public payload: { id: number, data: any }) { }
}

export class AddUpdateHTTPSuccess implements Action {
  readonly type =ProductMainSliderHTTPActionsType.ADD_UPDATE_HTTP_SUCCESS;
constructor(public payload: {data:IProductMainSlider}) { }
}
export class AddUpdateHTTPFail implements Action {
  readonly type =ProductMainSliderHTTPActionsType.ADD_UPDATE_HTTP_FAIL;
constructor(public payload: any) { }
}

export class DeleteHTTP implements Action {
  readonly type =ProductMainSliderHTTPActionsType.DELETE_HTTP;
constructor(public payload: { id: number }) { }
}

export class DeleteHTTPSuccess implements Action {
  readonly type =ProductMainSliderHTTPActionsType.DELETE_HTTP_SUCCESS;
constructor(public payload: number) { }
}

export class DeleteHTTPFail implements Action {
  readonly type =ProductMainSliderHTTPActionsType.DELETE_HTTP_FAIL;
constructor(public payload: any) { }
}

export class LoadHTTP implements Action {
  readonly type =ProductMainSliderHTTPActionsType.LOAD_HTTP;
constructor(public payload: { domain: any, limit: number, offset: number, fields?: any }) { }
}
export class LoadHTTPSuccess implements Action {
  readonly type =ProductMainSliderHTTPActionsType.LOAD_HTTP_SUCCESS;
constructor(public payload: IProductMainSlider) { }
}
export class LoadHTTPFail implements Action {
  readonly type =ProductMainSliderHTTPActionsType.LOAD_HTTP_FAIL;
constructor(public payload: any) { }
}

export class RefreshHTTP implements Action {
  readonly type =ProductMainSliderHTTPActionsType.REFRESH_HTTP;
constructor(public payload: { domain: any, limit: number, offset: number, fields?: any }) { }
}
export class RefreshHTTPSuccess implements Action {
  readonly type =ProductMainSliderHTTPActionsType.REFRESH_HTTP_SUCCESS;
constructor(public payload: IProductMainSlider) { }
}
export class RefreshHTTPFail implements Action {
  readonly type =ProductMainSliderHTTPActionsType.REFRESH_HTTP_FAIL;
constructor(public payload: any) { }
}



export type ProductMainSliderHTTPActions =
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


