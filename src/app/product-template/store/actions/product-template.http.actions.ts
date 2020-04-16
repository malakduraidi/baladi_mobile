import { Action } from "@ngrx/store";
import { IProductTemplate} from "../../models/product-template";

// HTTP CRUD

export enum ProductTemplateHTTPActionsType {
  // HTTP CRUD
  ADD_HTTP = "[ProductTemplate] ADD_HTTP",
  UPDATE_HTTP = "[ProductTemplate] UPDATE_HTTP",
  ADD_UPDATE_HTTP_SUCCESS = "[ProductTemplate] ADD_UPDATE_HTTP_SUCCESS",
  ADD_UPDATE_HTTP_FAIL = "[ProductTemplate] ADD_UPDATE_HTTP_FAIL",

  DELETE_HTTP = "[ProductTemplate] DELETE_HTTP",
  DELETE_HTTP_SUCCESS = "[ProductTemplate] DELETE_HTTP_SUCCESS",
  DELETE_HTTP_FAIL = "[ProductTemplate] DELETE_HTTP_FAIL",

  LOAD_HTTP = "[ProductTemplate] LOAD_HTTP",
  LOAD_HTTP_SUCCESS = "[ProductTemplate] LOAD_HTTP_SUCCESS",
  LOAD_HTTP_FAIL = "[ProductTemplate] LOAD_HTTP_FAIL",

  REFRESH_HTTP = "[ProductTemplate] REFRESH_HTTP",
  REFRESH_HTTP_SUCCESS = "[ProductTemplate] REFRESH_HTTP_SUCCESS",
  REFRESH_HTTP_FAIL = "[ProductTemplate] REFRESH_HTTP_FAIL",

  LOAD_IMAGE_HTTP = '[ProductTemplate] LOAD_IMAGE_HTTP',
  LOAD_IMAGE_HTTP_SUCCESS = '[ProductTemplate] LOAD_IMAGE_HTTP_SUCCESS',
  LOAD_IMAGE_HTTP_FAIL = '[ProductTemplate] LOAD_IMAGE_HTTP_FAIL',

    LOAD_FEATURE_IMAGE_HTTP = '[ProductTemplate] Load Feature Image Http',
    LOAD_FEATURE_IMAGE_HTTP_SUCCESS = '[ProductTemplate] Load Feature Image Http Success',
    LOAD_FEATURE_IMAGE_HTTP_FAIL = '[ProductTemplate] Load Feature Image Http Fail',


    LOAD_FEATURE_HTTP = "[ProductTemplate] LOAD_FEATURE_HTTP",
    LOAD_FEATURE_HTTP_SUCCESS = "[ProductTemplate] LOAD_FEATURE_HTTP_SUCCESS",
    LOAD_FEATURE_HTTP_FAIL = "[ProductTemplate] LOAD_FEATURE_HTTP_FAIL",

  SEARCH_HTTP = "[ProductTemplate] SEARCH_HTTP",
  SEARCH_HTTP_SUCCESS = "[ProductTemplate] SEARCH_HTTP_SUCCESS",
  SEARCH_HTTP_FAIL = "[ProductTemplate] SEARCH_HTTP_FAIL",

}

// malak : used to add product on odoo db
export class AddHTTP implements Action {
  readonly type =ProductTemplateHTTPActionsType.ADD_HTTP;
  constructor(public payload: {data:IProductTemplate}) { }
}
// malak : used to update product on odoo db
export class UpdateHTTP implements Action {
  readonly type =ProductTemplateHTTPActionsType.UPDATE_HTTP;
constructor(public payload: { id: number, data: any }) { }
}
// malak : used in case success add product on odoo db
export class AddUpdateHTTPSuccess implements Action {
  readonly type =ProductTemplateHTTPActionsType.ADD_UPDATE_HTTP_SUCCESS;
  constructor(public payload: {data:IProductTemplate}) { }
}
// malak : used in case fail add product on odoo db
export class AddUpdateHTTPFail implements Action {
  readonly type =ProductTemplateHTTPActionsType.ADD_UPDATE_HTTP_FAIL;
  constructor(public payload: {error:any}) { }
}

// malak : used to delete product on odoo db
export class DeleteHTTP implements Action {
  readonly type =ProductTemplateHTTPActionsType.DELETE_HTTP;
  constructor(public payload: { id: number }) { }
}
// malak : used in case success delete product from odoo db
export class DeleteHTTPSuccess implements Action {
  readonly type =ProductTemplateHTTPActionsType.DELETE_HTTP_SUCCESS;
  constructor(public payload: number) { }
}
// malak : used in case fail delete product from odoo db
export class DeleteHTTPFail implements Action {
  readonly type =ProductTemplateHTTPActionsType.DELETE_HTTP_FAIL;
  constructor(public payload: any) { }
}

// malak : used to load products from odoo db
export class LoadHTTP implements Action {
  readonly type =ProductTemplateHTTPActionsType.LOAD_HTTP;
  constructor(public payload: { domain: any, limit: number, offset: number, fields?: any }) { }
}
// malak : used in case success load products from odoo db
export class LoadHTTPSuccess implements Action {
  readonly type =ProductTemplateHTTPActionsType.LOAD_HTTP_SUCCESS;
  constructor(public payload: IProductTemplate[]) { }
}
// malak : used in case fail load products from odoo db
export class LoadHTTPFail implements Action {
  readonly type =ProductTemplateHTTPActionsType.LOAD_HTTP_FAIL;
  constructor(public payload: any) { }
}

// malak : used to load products from odoo db in case refresh
export class RefreshHTTP implements Action {
  readonly type =ProductTemplateHTTPActionsType.REFRESH_HTTP;
  constructor(public payload: { domain: any, limit: number, offset: number, fields?: any }) { }
}
// malak : used in case success load products from odoo db in case refresh
export class RefreshHTTPSuccess implements Action {
  readonly type =ProductTemplateHTTPActionsType.REFRESH_HTTP_SUCCESS;
  constructor(public payload: IProductTemplate[]) { }
}
// malak : used in case fail load products from odoo db in case refresh
export class RefreshHTTPFail implements Action {
  readonly type =ProductTemplateHTTPActionsType.REFRESH_HTTP_FAIL;
  constructor(public payload: any) { }
}

// malak : used to load products from odoo db in case search
export class SearchHTTP implements Action {
  readonly type =ProductTemplateHTTPActionsType.SEARCH_HTTP;
  constructor(public payload: { domain: any, limit: number, offset: number, fields?: any }) { }
}
// malak : used in case success load products from odoo db in case search
export class SearchHTTPSuccess implements Action {
  readonly type =ProductTemplateHTTPActionsType.SEARCH_HTTP_SUCCESS;
  constructor(public payload: IProductTemplate[]) { }
}
// malak : used in case fail load products from odoo db in case search
export class SearchHTTPFail implements Action {
  readonly type =ProductTemplateHTTPActionsType.SEARCH_HTTP_FAIL;
  constructor(public payload: any) { }
}

// malak : used to load image for products from odoo db
export class LoadImageHttp implements Action {
  readonly type = ProductTemplateHTTPActionsType.LOAD_IMAGE_HTTP;
  constructor(public payload: {id:number,image_field_name:string}) { }
}
// malak : used in case success to load image for products from odoo db
export class LoadImageHttpSuccess implements Action {
  readonly type = ProductTemplateHTTPActionsType.LOAD_IMAGE_HTTP_SUCCESS;
  constructor(public payload:any) { }
}
// malak : used in case fail to load image for products from odoo db
export class LoadImageHttpFail implements Action {
  readonly type = ProductTemplateHTTPActionsType.LOAD_IMAGE_HTTP_FAIL;
  constructor(public payload: any) { }
}

export class LoadFeatureImageHttp implements Action {
  readonly type = ProductTemplateHTTPActionsType.LOAD_FEATURE_IMAGE_HTTP;
  constructor(public payload: {id:number,image_field_name:string}) { }
}
export class LoadFeatureImageHttpSuccess implements Action {
  readonly type = ProductTemplateHTTPActionsType.LOAD_FEATURE_IMAGE_HTTP_SUCCESS;
  constructor(public payload:any) { }
}

export class LoadFeatureImageHttpFail implements Action {
  readonly type = ProductTemplateHTTPActionsType.LOAD_FEATURE_IMAGE_HTTP_FAIL;
  constructor(public payload: any) { }
}


export class LoadFeatureHttp implements Action {
  readonly type = ProductTemplateHTTPActionsType.LOAD_FEATURE_HTTP;
  constructor(public payload: { type:string,data:{domain: any, limit: number, offset: number, fields?: any }}) { }
}
export class LoadFeatureHttpSuccess implements Action {
  readonly type = ProductTemplateHTTPActionsType.LOAD_FEATURE_HTTP_SUCCESS;
  constructor(public payload: {type:string , data:IProductTemplate}) { }
}
export class LoadFeatureHttpFail implements Action {
  readonly type = ProductTemplateHTTPActionsType.LOAD_FEATURE_HTTP_FAIL;
  constructor(public payload: {error:any}) { }
}

export type ProductTemplateHTTPActions =
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
  | RefreshHTTPFail
  | LoadImageHttp
  | LoadImageHttpSuccess
  | LoadImageHttpFail
  | LoadFeatureImageHttp
  | LoadFeatureImageHttpSuccess
  | LoadFeatureImageHttpFail
  | LoadFeatureHttp
  | LoadFeatureHttpSuccess
  | LoadFeatureHttpFail
  | SearchHTTP
  | SearchHTTPSuccess
  | SearchHTTPFail ;


