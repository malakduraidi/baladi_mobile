import { Action } from "@ngrx/store";
import { IProductCategory} from "../../models/product-category";
import {ProductCategoryActionsType } from "./product-category.actions";
import {productCategoryAdapter } from "../state";

// HTTP CRUD

// DB CRUD
export enum ProductCategoryDBActionsType {

  ADD_DB = "[ProductCategory] ADD_DB",
    UPDATE_DB = "[ProductCategory] UPDATE_DB",
    ADD_UPDATE_DB_SUCCESS = "[ProductCategory] ADD_UPDATE_DB_SUCCESS",
    ADD_UPDATE_DB_FAIL = "[ProductCategory] ADD_UPDATE_DB_FAIL",

    DELETE_DB = "[ProductCategory] DELETE_DB",
    DELETE_DB_SUCCESS = "[ProductCategory] DELETE_DB_SUCCESS",
    DELETE_DB_FAIL = "[ProductCategory] DELETE_DB_FAIL",

    LOAD_DB = "[ProductCategory] LOAD_DB",
    LOAD_DB_SUCCESS = "[ProductCategory] LOAD_DB_SUCCESS",
    LOAD_DB_FAIL = "[ProductCategory] LOAD_DB_SUCCESS",

    ADD_MANY_DB = "[ProductCategory] ADD_MANY_DB",
    ADD_MANY_DB_SUCCESS = "[ProductCategory] ADD_MANY_DB_SUCCESS",

    ADD_MANY_DB_FAIL = "[ProductCategory] ADD_MANY_DB_FAIL",
    ADD_UPDATE_MANY_LINE_DB_SUCCESS = "[ProductCategory] ADD_UPDATE_MANY_LINE_DB_SUCCESS",
    ADD_UPDATE_MANY_LINE_DB_FAIL = "[ProductCategory] ADD_UPDATE_MANY_LINE_DB_FAIL",

    DELETE_MANY_DB = "[ProductCategory] DELETE_MANY_DB",
    DELETE_MANY_DB_SUCCESS = "[ProductCategory] DELETE_MAN_DB_SUCCESS",
    DELETE_MANY_DB_FAIL = "[ProductCategory] DELETE_MAN_DB_FAIL",

    DROP_TABLE = "[ProductCategory] DROP_TABLE",
    DROP_TABLE_SUCCESS = "[ProductCategory] DROP_TABLE_SUCCESS",
    DROP_TABLE_FAIL = "[ProductCategory] DROP_TABLE_FAIL",

    NEW_TABLE = "[ProductCategory] NEW_TABLE",
    NEW_TABLE_SUCCESS = "[ProductCategory] NEW_TABLE_SUCCESS",
    NEW_TABLE_FAIL = "[ProductCategory] NEW_TABLE_FAIL"

}

export class AddDB implements Action {
  readonly type =ProductCategoryDBActionsType.ADD_DB;
constructor(public payload: IProductCategory) { }
}

export class UpdateDB implements Action {
  readonly type =ProductCategoryDBActionsType.UPDATE_DB;
constructor(public payload: { id: number; changes: any }) { }
}

export class AddUpdateDBSuccess implements Action {
  readonly type =ProductCategoryDBActionsType.ADD_UPDATE_DB_SUCCESS;
// comes from effect
constructor(public payload: IProductCategory) { }
}
export class AddUpdateDBFail implements Action {
  readonly type =ProductCategoryDBActionsType.ADD_UPDATE_DB_FAIL;
constructor(public payload: any) { }
}

export class DeleteDB implements Action {
  readonly type =ProductCategoryDBActionsType.DELETE_DB;
constructor(public payload: IProductCategory) { }
}

export class DeleteDBSuccess implements Action {
  readonly type =ProductCategoryDBActionsType.DELETE_DB_SUCCESS;
constructor(public payload: IProductCategory) { }
}

export class DeleteDBFail implements Action {
  readonly type =ProductCategoryDBActionsType.DELETE_DB_FAIL;
constructor(public payload: any) { }
}

export class LoadDB implements Action {
  readonly type =ProductCategoryDBActionsType.LOAD_DB;
constructor() { }
}
export class LoadDBSuccess implements Action {
  readonly type =ProductCategoryDBActionsType.LOAD_DB_SUCCESS;
constructor(public payload: IProductCategory[]) { }
}
export class LoadDBFail implements Action {
  readonly type =ProductCategoryDBActionsType.LOAD_DB_FAIL;
constructor(public payload: any) { }
}
export class AddManyDB implements Action {
  readonly type =ProductCategoryDBActionsType.ADD_MANY_DB;
constructor(public payload: IProductCategory[]) { }
}
export class AddManyDBSuccess implements Action {
  readonly type =ProductCategoryDBActionsType.ADD_MANY_DB;
constructor(public payload: IProductCategory[]) { }
}

export class AddManyDBFail implements Action {
  readonly type =ProductCategoryDBActionsType.ADD_MANY_DB;
constructor(public payload: any) { }
}

export class DeleteManyDB implements Action {
  readonly type =ProductCategoryDBActionsType.DELETE_MANY_DB;
constructor(public payload: number[]) { }
}

export class DeleteManyDBSuccess implements Action {
  readonly type =ProductCategoryDBActionsType.DELETE_MANY_DB_SUCCESS;
constructor(public payload: any) { }
}
export class DeleteManyDBFail implements Action {
  readonly type =ProductCategoryDBActionsType.DELETE_MANY_DB_FAIL;
constructor(public payload: any) { }
}

export class DropTable implements Action {
  readonly type =ProductCategoryDBActionsType.DROP_TABLE;
constructor() { }
}

export class DropTableSuccess implements Action {
  readonly type =ProductCategoryDBActionsType.DROP_TABLE_SUCCESS;
constructor(public payload: any) { }
}
export class DropTableFail implements Action {
  readonly type =ProductCategoryDBActionsType.DROP_TABLE_FAIL;
constructor(public payload: any) { }
}

export class NewTable implements Action {
  readonly type =ProductCategoryDBActionsType.NEW_TABLE;
constructor() { }
}
export class NewTableSuccess implements Action {
  readonly type =ProductCategoryDBActionsType.NEW_TABLE_SUCCESS;
constructor(public payload: any) { }
}
export class NewTableFail implements Action {
  readonly type =ProductCategoryDBActionsType.NEW_TABLE_FAIL;
constructor(public payload: any) { }
}

export type ProductCategoryDBActions =
  | AddDB
  | UpdateDB
  | AddUpdateDBSuccess
  | AddUpdateDBFail
  | DeleteDB
  | DeleteDBSuccess
  | DeleteDBFail
  | LoadDB
  | LoadDBSuccess
  | LoadDBFail
  | AddManyDB
  | AddManyDBSuccess
  | AddManyDBFail
  | DeleteManyDB
  | DeleteManyDBSuccess
  | DeleteManyDBFail
  | DropTable
  | DropTableSuccess
  | DropTableFail
  | NewTable
  | NewTableSuccess
  | NewTableFail;
