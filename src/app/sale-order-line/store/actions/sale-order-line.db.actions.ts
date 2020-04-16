import { Action } from "@ngrx/store";
import { ISaleOrderLine} from "../../models/sale-order-line";
import {SaleOrderLineActionsType } from "./sale-order-line.actions";
import {saleOrderLineAdapter } from "../state";

// HTTP CRUD

// DB CRUD
export enum SaleOrderLineDBActionsType {

    ADD_DB = "[SaleOrderLine] ADD_DB",
    UPDATE_DB = "[SaleOrderLine] UPDATE_DB",
    ADD_UPDATE_DB_SUCCESS = "[SaleOrderLine] ADD_UPDATE_DB_SUCCESS",
    ADD_UPDATE_DB_FAIL = "[SaleOrderLine] ADD_UPDATE_DB_FAIL",

    DELETE_DB = "[SaleOrderLine] DELETE_DB",
    DELETE_DB_SUCCESS = "[SaleOrderLine] DELETE_DB_SUCCESS",
    DELETE_DB_FAIL = "[SaleOrderLine] DELETE_DB_FAIL",

    LOAD_DB = "[SaleOrderLine] LOAD_DB",
    LOAD_DB_SUCCESS = "[SaleOrderLine] LOAD_DB_SUCCESS",
    LOAD_DB_FAIL = "[SaleOrderLine] LOAD_DB_SUCCESS",

    ADD_MANY_DB = "[SaleOrderLine] ADD_MANY_DB",
    ADD_MANY_DB_SUCCESS = "[SaleOrderLine] ADD_MANY_DB_SUCCESS",

    ADD_MANY_DB_FAIL = "[SaleOrderLine] ADD_MANY_DB_FAIL",
    ADD_UPDATE_MANY_LINE_DB_SUCCESS = "[SaleOrderLine] ADD_UPDATE_MANY_LINE_DB_SUCCESS",
    ADD_UPDATE_MANY_LINE_DB_FAIL = "[SaleOrderLine] ADD_UPDATE_MANY_LINE_DB_FAIL",

    DELETE_MANY_DB = "[SaleOrderLine] DELETE_MANY_DB",
    DELETE_MANY_DB_SUCCESS = "[SaleOrderLine] DELETE_MAN_DB_SUCCESS",
    DELETE_MANY_DB_FAIL = "[SaleOrderLine] DELETE_MAN_DB_FAIL",

    DROP_TABLE = "[SaleOrderLine] DROP_TABLE",
    DROP_TABLE_SUCCESS = "[SaleOrderLine] DROP_TABLE_SUCCESS",
    DROP_TABLE_FAIL = "[SaleOrderLine] DROP_TABLE_FAIL",

    NEW_TABLE = "[SaleOrderLine] NEW_TABLE",
    NEW_TABLE_SUCCESS = "[SaleOrderLine] NEW_TABLE_SUCCESS",
    NEW_TABLE_FAIL = "[SaleOrderLine] NEW_TABLE_FAIL",

    ADD_TO_CART_DB = "[SaleOrderLine] ADD_TO_CART_DB",
    ADD_TO_CART_DB_SUCCESS = "[SaleOrderLine] ADD_TO_CART_DB_SUCCESS",
    ADD_TO_CART_DB_FAIL = "[SaleOrderLine] ADD_TO_CART_DB_FAIL",
    UPDATE_TO_CART_DB = "[SaleOrderLine] UPDATE_TO_CART_DB",
    UPDATE_TO_CART_DB_SUCCESS = "[SaleOrderLine] UPDATE_TO_CART_DB_SUCCESS",
    UPDATE_TO_CART_DB_FAIL = "[SaleOrderLine] UPDATE_TO_CART_DB_FAIL",

    REMOVE_FROM_CART_DB = "[SaleOrderLine] REMOVE_FROM_CART_DB",
    REMOVE_FROM_CART_DB_SUCCESS = "[SaleOrderLine] REMOVE_FROM_CART_DB_SUCCESS",
    REMOVE_FROM_CART_DB_FAIL = "[SaleOrderLine] REMOVE_FROM_CART_DB_FAIL",


    LOAD_CART_DB = "[SaleOrderLine] LOAD_CART_DB",
    LOAD_CART_DB_SUCCESS = "[SaleOrderLine] LOAD_CART_DB_SUCCESS",
    LOAD_CART_DB_FAIL = "[SaleOrderLine] LOAD_CART_DB_FAIL",



}

export class AddDB implements Action {
  readonly type =SaleOrderLineDBActionsType.ADD_DB;
constructor(public payload: ISaleOrderLine) { }
}

export class UpdateDB implements Action {
  readonly type =SaleOrderLineDBActionsType.UPDATE_DB;
constructor(public payload: { id: number; changes: any }) { }
}

export class AddUpdateDBSuccess implements Action {
  readonly type =SaleOrderLineDBActionsType.ADD_UPDATE_DB_SUCCESS;
// comes from effect
constructor(public payload: ISaleOrderLine) { }
}
export class AddUpdateDBFail implements Action {
  readonly type =SaleOrderLineDBActionsType.ADD_UPDATE_DB_FAIL;
constructor(public payload: any) { }
}

export class DeleteDB implements Action {
  readonly type =SaleOrderLineDBActionsType.DELETE_DB;
constructor(public payload: ISaleOrderLine) { }
}

export class DeleteDBSuccess implements Action {
  readonly type =SaleOrderLineDBActionsType.DELETE_DB_SUCCESS;
constructor(public payload: ISaleOrderLine) { }
}

export class DeleteDBFail implements Action {
  readonly type =SaleOrderLineDBActionsType.DELETE_DB_FAIL;
constructor(public payload: any) { }
}

export class LoadDB implements Action {
  readonly type =SaleOrderLineDBActionsType.LOAD_DB;
constructor() { }
}
export class LoadDBSuccess implements Action {
  readonly type =SaleOrderLineDBActionsType.LOAD_DB_SUCCESS;
constructor(public payload: ISaleOrderLine[]) { }
}
export class LoadDBFail implements Action {
  readonly type =SaleOrderLineDBActionsType.LOAD_DB_FAIL;
constructor(public payload: any) { }
}
export class AddManyDB implements Action {
  readonly type =SaleOrderLineDBActionsType.ADD_MANY_DB;
constructor(public payload: ISaleOrderLine[]) { }
}
export class AddManyDBSuccess implements Action {
  readonly type =SaleOrderLineDBActionsType.ADD_MANY_DB;
constructor(public payload: ISaleOrderLine[]) { }
}

export class AddManyDBFail implements Action {
  readonly type =SaleOrderLineDBActionsType.ADD_MANY_DB;
constructor(public payload: any) { }
}

export class DeleteManyDB implements Action {
  readonly type =SaleOrderLineDBActionsType.DELETE_MANY_DB;
constructor(public payload: number[]) { }
}

export class DeleteManyDBSuccess implements Action {
  readonly type =SaleOrderLineDBActionsType.DELETE_MANY_DB_SUCCESS;
constructor(public payload: any) { }
}
export class DeleteManyDBFail implements Action {
  readonly type =SaleOrderLineDBActionsType.DELETE_MANY_DB_FAIL;
constructor(public payload: any) { }
}

export class DropTable implements Action {
  readonly type =SaleOrderLineDBActionsType.DROP_TABLE;
constructor() { }
}

export class DropTableSuccess implements Action {
  readonly type =SaleOrderLineDBActionsType.DROP_TABLE_SUCCESS;
constructor(public payload: any) { }
}
export class DropTableFail implements Action {
  readonly type =SaleOrderLineDBActionsType.DROP_TABLE_FAIL;
constructor(public payload: any) { }
}

export class NewTable implements Action {
  readonly type =SaleOrderLineDBActionsType.NEW_TABLE;
constructor() { }
}
export class NewTableSuccess implements Action {
  readonly type =SaleOrderLineDBActionsType.NEW_TABLE_SUCCESS;
constructor(public payload: any) { }
}
export class NewTableFail implements Action {
  readonly type =SaleOrderLineDBActionsType.NEW_TABLE_FAIL;
constructor(public payload: any) { }
}

export class AddToCartDb implements Action {
  readonly type =SaleOrderLineDBActionsType.ADD_TO_CART_DB;
constructor(public payload: ISaleOrderLine) { }
}


export class AddToCartDbSuccess implements Action {
  readonly type =SaleOrderLineDBActionsType.ADD_TO_CART_DB_SUCCESS;
constructor(public payload: ISaleOrderLine) { }
}
export class AddToCartDbFail implements Action {
  readonly type =SaleOrderLineDBActionsType.ADD_TO_CART_DB_FAIL;
constructor(public payload: {error:any}) { }
}

export class UpdateToCartDb implements Action {
  readonly type =SaleOrderLineDBActionsType.UPDATE_TO_CART_DB;
constructor(public payload: ISaleOrderLine) { }
}

export class UpdateToCartDbSuccess implements Action {
  readonly type =SaleOrderLineDBActionsType.UPDATE_TO_CART_DB_SUCCESS;
constructor(public payload: ISaleOrderLine) { }
}
export class UpdateToCartDbFail implements Action {
  readonly type =SaleOrderLineDBActionsType.UPDATE_TO_CART_DB_FAIL;
constructor(public payload: {error:any}) { }
}


export class RemoveFromCartDb implements Action {
  readonly type =SaleOrderLineDBActionsType.REMOVE_FROM_CART_DB;
constructor(public payload: ISaleOrderLine) { }
}

export class RemoveFromCartDbSuccess implements Action {
  readonly type =SaleOrderLineDBActionsType.REMOVE_FROM_CART_DB_SUCCESS;
constructor(public payload: ISaleOrderLine) { }
}

export class RemoveFromCartDbFail implements Action {
  readonly type =SaleOrderLineDBActionsType.REMOVE_FROM_CART_DB_FAIL;
constructor(public payload: {error:any}) { }
}


export class LoadCartDB implements Action {
  readonly type =SaleOrderLineDBActionsType.LOAD_CART_DB;
}
export class LoadCartDBSuccess implements Action {
  readonly type =SaleOrderLineDBActionsType.LOAD_CART_DB_SUCCESS;
constructor(public payload: ISaleOrderLine[]) { }
}
export class LoadCartDBFail implements Action {
  readonly type =SaleOrderLineDBActionsType.LOAD_CART_DB_FAIL;
constructor(public payload: {error:any}) { }
}




export type SaleOrderLineDBActions =
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
  | NewTableFail
  | AddToCartDb
  | AddToCartDbSuccess
  | AddToCartDbFail
  | UpdateToCartDb
  | UpdateToCartDbSuccess
  | UpdateToCartDbFail
  | RemoveFromCartDb
  | RemoveFromCartDbSuccess
  | RemoveFromCartDbFail
   ;
