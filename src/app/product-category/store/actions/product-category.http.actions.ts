import { Action } from "@ngrx/store";
import { IProductCategory} from "../../models/product-category";

// HTTP CRUD

export enum ProductCategoryHTTPActionsType {

  // HTTP CRUD
  ADD_HTTP = "[ProductCategory] ADD_HTTP",
  UPDATE_HTTP = "[ProductCategory] UPDATE_HTTP",
  ADD_UPDATE_HTTP_SUCCESS = "[ProductCategory] ADD_UPDATE_HTTP_SUCCESS",
  ADD_UPDATE_HTTP_FAIL = "[ProductCategory] ADD_UPDATE_HTTP_FAIL",

  DELETE_HTTP = "[ProductCategory] DELETE_HTTP",
  DELETE_HTTP_SUCCESS = "[ProductCategory] DELETE_HTTP_SUCCESS",
  DELETE_HTTP_FAIL = "[ProductCategory] DELETE_HTTP_FAIL",

  LOAD_HTTP = "[ProductCategory] LOAD_HTTP",
  LOAD_HTTP_SUCCESS = "[ProductCategory] LOAD_HTTP_SUCCESS",
  LOAD_HTTP_FAIL = "[ProductCategory] LOAD_HTTP_FAIL",

  LOAD_IMAGE_HTTP = '[ProductCategory] LOAD_IMAGE_HTTP',
  LOAD_IMAGE_HTTP_SUCCESS = '[ProductCategory] LOAD_IMAGE_HTTP_SUCCESS',
  LOAD_IMAGE_HTTP_FAIL = '[ProductCategory] LOAD_IMAGE_HTTP_FAIL',

  REFRESH_HTTP = "[ProductCategory] REFRESH_HTTP",
  REFRESH_HTTP_SUCCESS = "[ProductCategory] REFRESH_HTTP_SUCCESS",
  REFRESH_HTTP_FAIL = "[ProductCategory] REFRESH_HTTP_FAIL",

  SEARCH_HTTP = "[ProductCategory] SEARCH_HTTP",
  SEARCH_HTTP_SUCCESS = "[ProductCategory] SEARCH_HTTP_SUCCESS",
  SEARCH_HTTP_FAIL = "[ProductCategory] SEARCH_HTTP_FAIL",

}

// malak : used to add product category on odoo db
export class AddHTTP implements Action {
  readonly type =ProductCategoryHTTPActionsType.ADD_HTTP;
  constructor(public payload: {data:IProductCategory}) { }
}
// malak : used to update product category on odoo db
export class UpdateHTTP implements Action {
  readonly type =ProductCategoryHTTPActionsType.UPDATE_HTTP;
  constructor(public payload: { id: number, data: any }) { }
}
// malak : used in case success add product category on odoo db
export class AddUpdateHTTPSuccess implements Action {
  readonly type =ProductCategoryHTTPActionsType.ADD_UPDATE_HTTP_SUCCESS;
  constructor(public payload: {data:IProductCategory}) { }
}
// malak : used in case fail add product category on odoo db
export class AddUpdateHTTPFail implements Action {
  readonly type =ProductCategoryHTTPActionsType.ADD_UPDATE_HTTP_FAIL;
  constructor(public payload: any) { }
}

// malak : used to delete product category on odoo db
export class DeleteHTTP implements Action {
  readonly type =ProductCategoryHTTPActionsType.DELETE_HTTP;
  constructor(public payload: { id: number }) { }
}
// malak : used in case success delete product category from odoo db
export class DeleteHTTPSuccess implements Action {
  readonly type =ProductCategoryHTTPActionsType.DELETE_HTTP_SUCCESS;
  constructor(public payload: number) { }
}
// malak : used in case fail delete product category from odoo db
export class DeleteHTTPFail implements Action {
  readonly type =ProductCategoryHTTPActionsType.DELETE_HTTP_FAIL;
  constructor(public payload: any) { }
}

// malak : used to load product categories from odoo db
export class LoadHTTP implements Action {
  readonly type =ProductCategoryHTTPActionsType.LOAD_HTTP;
  constructor(public payload: { domain: any, limit: number, offset: number, fields?: any }) { }
}
// malak : used in case success load product categories from odoo db
export class LoadHTTPSuccess implements Action {
  readonly type =ProductCategoryHTTPActionsType.LOAD_HTTP_SUCCESS;
  constructor(public payload: IProductCategory) { }
}
// malak : used in case fail load product categories from odoo db
export class LoadHTTPFail implements Action {
  readonly type =ProductCategoryHTTPActionsType.LOAD_HTTP_FAIL;
  constructor(public payload: any) { }
}

// malak : used to load image for product categories from odoo db
export class LoadImageHttp implements Action {
  readonly type = ProductCategoryHTTPActionsType.LOAD_IMAGE_HTTP;
  constructor(public payload: {id:number,image_field_name:string}) { }
}
// malak : used in case success to load image for product categories from odoo db
export class LoadImageHttpSuccess implements Action {
  readonly type = ProductCategoryHTTPActionsType.LOAD_IMAGE_HTTP_SUCCESS;
  constructor(public payload:any) { }
}
// malak : used in case fail to load image for product categories from odoo db
export class LoadImageHttpFail implements Action {
  readonly type = ProductCategoryHTTPActionsType.LOAD_IMAGE_HTTP_FAIL;
  constructor(public payload: any) { }
}

// malak : used to load product categories from odoo db in case refresh
export class RefreshHTTP implements Action {
  readonly type =ProductCategoryHTTPActionsType.REFRESH_HTTP;
  constructor(public payload: { domain: any, limit: number, offset: number, fields?: any }) { }
}
// malak : used in case success load product categories from odoo db in case refresh
export class RefreshHTTPSuccess implements Action {
  readonly type =ProductCategoryHTTPActionsType.REFRESH_HTTP_SUCCESS;
  constructor(public payload: IProductCategory) { }
}
// malak : used in case fail load product categories from odoo db in case refresh
export class RefreshHTTPFail implements Action {
  readonly type =ProductCategoryHTTPActionsType.REFRESH_HTTP_FAIL;
  constructor(public payload: any) { }
}

// malak : used to load product categories from odoo db in case search
export class SearchHTTP implements Action {
  readonly type =ProductCategoryHTTPActionsType.SEARCH_HTTP;
  constructor(public payload: { domain: any, limit: number, offset: number, fields?: any }) { }
}
// malak : used in case success load product categories from odoo db in case search
export class SearchHTTPSuccess implements Action {
  readonly type =ProductCategoryHTTPActionsType.SEARCH_HTTP_SUCCESS;
  constructor(public payload: IProductCategory[]) { }
}
// malak : used in case fail load product categories from odoo db in case search
export class SearchHTTPFail implements Action {
  readonly type =ProductCategoryHTTPActionsType.SEARCH_HTTP_FAIL;
  constructor(public payload: any) { }
}

export type ProductCategoryHTTPActions =
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
  | LoadImageHttp
  | LoadImageHttpSuccess
  | LoadImageHttpFail
  | SearchHTTP
  | SearchHTTPSuccess
  | SearchHTTPFail
  | RefreshHTTP
  | RefreshHTTPSuccess
  | RefreshHTTPFail;


