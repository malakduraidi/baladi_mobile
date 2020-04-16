import { Action } from "@ngrx/store";
import { IProductTemplate} from "../../models/product-template";
import {ProductTemplateActionsType } from "./product-template.actions";
import {productTemplateAdapter } from "../state";

// HTTP CRUD

// DB CRUD
export enum ProductTemplateDBActionsType {

  ADD_DB = "[ProductTemplate] ADD_DB",
    UPDATE_DB = "[ProductTemplate] UPDATE_DB",
    ADD_UPDATE_DB_SUCCESS = "[ProductTemplate] ADD_UPDATE_DB_SUCCESS",
    ADD_UPDATE_DB_FAIL = "[ProductTemplate] ADD_UPDATE_DB_FAIL",

    DELETE_DB = "[ProductTemplate] DELETE_DB",
    DELETE_DB_SUCCESS = "[ProductTemplate] DELETE_DB_SUCCESS",
    DELETE_DB_FAIL = "[ProductTemplate] DELETE_DB_FAIL",

    LOAD_DB = "[ProductTemplate] LOAD_DB",
    LOAD_DB_SUCCESS = "[ProductTemplate] LOAD_DB_SUCCESS",
    LOAD_DB_FAIL = "[ProductTemplate] LOAD_DB_SUCCESS",

    ADD_MANY_DB = "[ProductTemplate] ADD_MANY_DB",
    ADD_MANY_DB_SUCCESS = "[ProductTemplate] ADD_MANY_DB_SUCCESS",

    ADD_MANY_DB_FAIL = "[ProductTemplate] ADD_MANY_DB_FAIL",
    ADD_UPDATE_MANY_LINE_DB_SUCCESS = "[ProductTemplate] ADD_UPDATE_MANY_LINE_DB_SUCCESS",
    ADD_UPDATE_MANY_LINE_DB_FAIL = "[ProductTemplate] ADD_UPDATE_MANY_LINE_DB_FAIL",

    DELETE_MANY_DB = "[ProductTemplate] DELETE_MANY_DB",
    DELETE_MANY_DB_SUCCESS = "[ProductTemplate] DELETE_MAN_DB_SUCCESS",
    DELETE_MANY_DB_FAIL = "[ProductTemplate] DELETE_MAN_DB_FAIL",

    DROP_TABLE = "[ProductTemplate] DROP_TABLE",
    DROP_TABLE_SUCCESS = "[ProductTemplate] DROP_TABLE_SUCCESS",
    DROP_TABLE_FAIL = "[ProductTemplate] DROP_TABLE_FAIL",

    NEW_TABLE = "[ProductTemplate] NEW_TABLE",
    NEW_TABLE_SUCCESS = "[ProductTemplate] NEW_TABLE_SUCCESS",
    NEW_TABLE_FAIL = "[ProductTemplate] NEW_TABLE_FAIL"

}

export class AddDB implements Action {
  readonly type =ProductTemplateDBActionsType.ADD_DB;
constructor(public payload: IProductTemplate) { }
}

export class UpdateDB implements Action {
  readonly type =ProductTemplateDBActionsType.UPDATE_DB;
constructor(public payload: { id: number; changes: any }) { }
}

export class AddUpdateDBSuccess implements Action {
  readonly type =ProductTemplateDBActionsType.ADD_UPDATE_DB_SUCCESS;
// comes from effect
constructor(public payload: IProductTemplate) { }
}
export class AddUpdateDBFail implements Action {
  readonly type =ProductTemplateDBActionsType.ADD_UPDATE_DB_FAIL;
constructor(public payload: any) { }
}

export class DeleteDB implements Action {
  readonly type =ProductTemplateDBActionsType.DELETE_DB;
constructor(public payload: IProductTemplate) { }
}

export class DeleteDBSuccess implements Action {
  readonly type =ProductTemplateDBActionsType.DELETE_DB_SUCCESS;
constructor(public payload: IProductTemplate) { }
}

export class DeleteDBFail implements Action {
  readonly type =ProductTemplateDBActionsType.DELETE_DB_FAIL;
constructor(public payload: any) { }
}

export class LoadDB implements Action {
  readonly type =ProductTemplateDBActionsType.LOAD_DB;
constructor() { }
}
export class LoadDBSuccess implements Action {
  readonly type =ProductTemplateDBActionsType.LOAD_DB_SUCCESS;
constructor(public payload: IProductTemplate[]) { }
}
export class LoadDBFail implements Action {
  readonly type =ProductTemplateDBActionsType.LOAD_DB_FAIL;
constructor(public payload: any) { }
}
export class AddManyDB implements Action {
  readonly type =ProductTemplateDBActionsType.ADD_MANY_DB;
constructor(public payload: IProductTemplate[]) { }
}
export class AddManyDBSuccess implements Action {
  readonly type =ProductTemplateDBActionsType.ADD_MANY_DB;
constructor(public payload: IProductTemplate[]) { }
}

export class AddManyDBFail implements Action {
  readonly type =ProductTemplateDBActionsType.ADD_MANY_DB;
constructor(public payload: any) { }
}

export class DeleteManyDB implements Action {
  readonly type =ProductTemplateDBActionsType.DELETE_MANY_DB;
constructor(public payload: number[]) { }
}

export class DeleteManyDBSuccess implements Action {
  readonly type =ProductTemplateDBActionsType.DELETE_MANY_DB_SUCCESS;
constructor(public payload: any) { }
}
export class DeleteManyDBFail implements Action {
  readonly type =ProductTemplateDBActionsType.DELETE_MANY_DB_FAIL;
constructor(public payload: any) { }
}

export class DropTable implements Action {
  readonly type =ProductTemplateDBActionsType.DROP_TABLE;
constructor() { }
}

export class DropTableSuccess implements Action {
  readonly type =ProductTemplateDBActionsType.DROP_TABLE_SUCCESS;
constructor(public payload: any) { }
}
export class DropTableFail implements Action {
  readonly type =ProductTemplateDBActionsType.DROP_TABLE_FAIL;
constructor(public payload: any) { }
}

export class NewTable implements Action {
  readonly type =ProductTemplateDBActionsType.NEW_TABLE;
constructor() { }
}
export class NewTableSuccess implements Action {
  readonly type =ProductTemplateDBActionsType.NEW_TABLE_SUCCESS;
constructor(public payload: any) { }
}
export class NewTableFail implements Action {
  readonly type =ProductTemplateDBActionsType.NEW_TABLE_FAIL;
constructor(public payload: any) { }
}

export type ProductTemplateDBActions =
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
