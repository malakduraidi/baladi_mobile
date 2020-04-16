import { Action } from "@ngrx/store";
import { ISaleOrder} from "../../models/sale-order";
import {SaleOrderActionsType } from "./sale-order.actions";
import {saleOrderAdapter } from "../state";

// HTTP CRUD

// DB CRUD
export enum SaleOrderDBActionsType {

  ADD_DB = "[SaleOrder] ADD_DB",
    UPDATE_DB = "[SaleOrder] UPDATE_DB",
    ADD_UPDATE_DB_SUCCESS = "[SaleOrder] ADD_UPDATE_DB_SUCCESS",
    ADD_UPDATE_DB_FAIL = "[SaleOrder] ADD_UPDATE_DB_FAIL",

    DELETE_DB = "[SaleOrder] DELETE_DB",
    DELETE_DB_SUCCESS = "[SaleOrder] DELETE_DB_SUCCESS",
    DELETE_DB_FAIL = "[SaleOrder] DELETE_DB_FAIL",

    LOAD_DB = "[SaleOrder] LOAD_DB",
    LOAD_DB_SUCCESS = "[SaleOrder] LOAD_DB_SUCCESS",
    LOAD_DB_FAIL = "[SaleOrder] LOAD_DB_SUCCESS",

    ADD_MANY_DB = "[SaleOrder] ADD_MANY_DB",
    ADD_MANY_DB_SUCCESS = "[SaleOrder] ADD_MANY_DB_SUCCESS",

    ADD_MANY_DB_FAIL = "[SaleOrder] ADD_MANY_DB_FAIL",
    ADD_UPDATE_MANY_LINE_DB_SUCCESS = "[SaleOrder] ADD_UPDATE_MANY_LINE_DB_SUCCESS",
    ADD_UPDATE_MANY_LINE_DB_FAIL = "[SaleOrder] ADD_UPDATE_MANY_LINE_DB_FAIL",

    DELETE_MANY_DB = "[SaleOrder] DELETE_MANY_DB",
    DELETE_MANY_DB_SUCCESS = "[SaleOrder] DELETE_MAN_DB_SUCCESS",
    DELETE_MANY_DB_FAIL = "[SaleOrder] DELETE_MAN_DB_FAIL",

    DROP_TABLE = "[SaleOrder] DROP_TABLE",
    DROP_TABLE_SUCCESS = "[SaleOrder] DROP_TABLE_SUCCESS",
    DROP_TABLE_FAIL = "[SaleOrder] DROP_TABLE_FAIL",

    NEW_TABLE = "[SaleOrder] NEW_TABLE",
    NEW_TABLE_SUCCESS = "[SaleOrder] NEW_TABLE_SUCCESS",
    NEW_TABLE_FAIL = "[SaleOrder] NEW_TABLE_FAIL"

}

export class AddDB implements Action {
  readonly type =SaleOrderDBActionsType.ADD_DB;
constructor(public payload: ISaleOrder) { }
}

export class UpdateDB implements Action {
  readonly type =SaleOrderDBActionsType.UPDATE_DB;
constructor(public payload: { id: number; changes: any }) { }
}

export class AddUpdateDBSuccess implements Action {
  readonly type =SaleOrderDBActionsType.ADD_UPDATE_DB_SUCCESS;
// comes from effect
constructor(public payload: ISaleOrder) { }
}
export class AddUpdateDBFail implements Action {
  readonly type =SaleOrderDBActionsType.ADD_UPDATE_DB_FAIL;
constructor(public payload: any) { }
}

export class DeleteDB implements Action {
  readonly type =SaleOrderDBActionsType.DELETE_DB;
constructor(public payload: ISaleOrder) { }
}

export class DeleteDBSuccess implements Action {
  readonly type =SaleOrderDBActionsType.DELETE_DB_SUCCESS;
constructor(public payload: ISaleOrder) { }
}

export class DeleteDBFail implements Action {
  readonly type =SaleOrderDBActionsType.DELETE_DB_FAIL;
constructor(public payload: any) { }
}

export class LoadDB implements Action {
  readonly type =SaleOrderDBActionsType.LOAD_DB;
constructor() { }
}
export class LoadDBSuccess implements Action {
  readonly type =SaleOrderDBActionsType.LOAD_DB_SUCCESS;
constructor(public payload: ISaleOrder[]) { }
}
export class LoadDBFail implements Action {
  readonly type =SaleOrderDBActionsType.LOAD_DB_FAIL;
constructor(public payload: any) { }
}
export class AddManyDB implements Action {
  readonly type =SaleOrderDBActionsType.ADD_MANY_DB;
constructor(public payload: ISaleOrder[]) { }
}
export class AddManyDBSuccess implements Action {
  readonly type =SaleOrderDBActionsType.ADD_MANY_DB;
constructor(public payload: ISaleOrder[]) { }
}

export class AddManyDBFail implements Action {
  readonly type =SaleOrderDBActionsType.ADD_MANY_DB;
constructor(public payload: any) { }
}

export class DeleteManyDB implements Action {
  readonly type =SaleOrderDBActionsType.DELETE_MANY_DB;
constructor(public payload: number[]) { }
}

export class DeleteManyDBSuccess implements Action {
  readonly type =SaleOrderDBActionsType.DELETE_MANY_DB_SUCCESS;
constructor(public payload: any) { }
}
export class DeleteManyDBFail implements Action {
  readonly type =SaleOrderDBActionsType.DELETE_MANY_DB_FAIL;
constructor(public payload: any) { }
}

export class DropTable implements Action {
  readonly type =SaleOrderDBActionsType.DROP_TABLE;
constructor() { }
}

export class DropTableSuccess implements Action {
  readonly type =SaleOrderDBActionsType.DROP_TABLE_SUCCESS;
constructor(public payload: any) { }
}
export class DropTableFail implements Action {
  readonly type =SaleOrderDBActionsType.DROP_TABLE_FAIL;
constructor(public payload: any) { }
}

export class NewTable implements Action {
  readonly type =SaleOrderDBActionsType.NEW_TABLE;
constructor() { }
}
export class NewTableSuccess implements Action {
  readonly type =SaleOrderDBActionsType.NEW_TABLE_SUCCESS;
constructor(public payload: any) { }
}
export class NewTableFail implements Action {
  readonly type =SaleOrderDBActionsType.NEW_TABLE_FAIL;
constructor(public payload: any) { }
}

export type SaleOrderDBActions =
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
