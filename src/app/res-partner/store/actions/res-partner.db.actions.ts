import { Action } from "@ngrx/store";
import { IResPartner} from "../../models/res-partner";
import {ResPartnerActionsType } from "./res-partner.actions";
import {resPartnerAdapter } from "../state";

// HTTP CRUD

// DB CRUD
export enum ResPartnerDBActionsType {

    ADD_DB = "[ResPartner] ADD_DB",
    UPDATE_DB = "[ResPartner] UPDATE_DB",
    ADD_UPDATE_DB_SUCCESS = "[ResPartner] ADD_UPDATE_DB_SUCCESS",
    ADD_UPDATE_DB_FAIL = "[ResPartner] ADD_UPDATE_DB_FAIL",

    DELETE_DB = "[ResPartner] DELETE_DB",
    DELETE_DB_SUCCESS = "[ResPartner] DELETE_DB_SUCCESS",
    DELETE_DB_FAIL = "[ResPartner] DELETE_DB_FAIL",

    LOAD_DB = "[ResPartner] LOAD_DB",
    LOAD_DB_SUCCESS = "[ResPartner] LOAD_DB_SUCCESS",
    LOAD_DB_FAIL = "[ResPartner] LOAD_DB_SUCCESS",

    LOAD_LOGGED_USER_DB = "[ResPartner] LOAD_LOGGED_USER_DB",
    LOAD_LOGGED_USER_DB_SUCCESS = "[ResPartner] LOAD_LOGGED_USER_DB_SUCCESS",
    LOAD_LOGGED_USER_DB_FAIL = "[ResPartner] LOAD_LOGGED_USER_DB_FAIL",

    ADD_MANY_DB = "[ResPartner] ADD_MANY_DB",
    ADD_MANY_DB_SUCCESS = "[ResPartner] ADD_MANY_DB_SUCCESS",
    ADD_MANY_DB_FAIL = "[ResPartner] ADD_MANY_DB_FAIL",
    
    ADD_UPDATE_MANY_LINE_DB_SUCCESS = "[ResPartner] ADD_UPDATE_MANY_LINE_DB_SUCCESS",
    ADD_UPDATE_MANY_LINE_DB_FAIL = "[ResPartner] ADD_UPDATE_MANY_LINE_DB_FAIL",

    DELETE_MANY_DB = "[ResPartner] DELETE_MANY_DB",
    DELETE_MANY_DB_SUCCESS = "[ResPartner] DELETE_MAN_DB_SUCCESS",
    DELETE_MANY_DB_FAIL = "[ResPartner] DELETE_MAN_DB_FAIL",

    DROP_TABLE = "[ResPartner] DROP_TABLE",
    DROP_TABLE_SUCCESS = "[ResPartner] DROP_TABLE_SUCCESS",
    DROP_TABLE_FAIL = "[ResPartner] DROP_TABLE_FAIL",

    NEW_TABLE = "[ResPartner] NEW_TABLE",
    NEW_TABLE_SUCCESS = "[ResPartner] NEW_TABLE_SUCCESS",
    NEW_TABLE_FAIL = "[ResPartner] NEW_TABLE_FAIL"

}

export class AddDB implements Action {
    readonly type =ResPartnerDBActionsType.ADD_DB;
    constructor(public payload: IResPartner) { }
}

export class UpdateDB implements Action {
    readonly type =ResPartnerDBActionsType.UPDATE_DB;
    constructor(public payload: { id: number; changes: any }) { }
}

export class AddUpdateDBSuccess implements Action {
    readonly type =ResPartnerDBActionsType.ADD_UPDATE_DB_SUCCESS;
    // comes from effect
    constructor(public payload: IResPartner) { }
}

export class AddUpdateDBFail implements Action {
    readonly type =ResPartnerDBActionsType.ADD_UPDATE_DB_FAIL;
    constructor(public payload: any) { }
}

export class DeleteDB implements Action {
    readonly type =ResPartnerDBActionsType.DELETE_DB;
    constructor(public payload: IResPartner) { }
}

export class DeleteDBSuccess implements Action {
    readonly type =ResPartnerDBActionsType.DELETE_DB_SUCCESS;
    constructor(public payload: IResPartner) { }
}

export class DeleteDBFail implements Action {
    readonly type =ResPartnerDBActionsType.DELETE_DB_FAIL;
    constructor(public payload: any) { }
}

export class LoadDB implements Action {
    readonly type =ResPartnerDBActionsType.LOAD_DB;
    constructor() { }
}

export class LoadDBSuccess implements Action {
    readonly type =ResPartnerDBActionsType.LOAD_DB_SUCCESS;
    constructor(public payload: IResPartner[]) { }
}

export class LoadDBFail implements Action {
    readonly type =ResPartnerDBActionsType.LOAD_DB_FAIL;
    constructor(public payload: any) { }
}

export class LoadloggedUserDB implements Action {
    readonly type =ResPartnerDBActionsType.LOAD_LOGGED_USER_DB;
    constructor() { }
}

export class LoadLoggedUserDBSuccess implements Action {
    readonly type =ResPartnerDBActionsType.LOAD_LOGGED_USER_DB_SUCCESS;
    constructor(public payload: IResPartner) { }
}

export class LoadLoggedUserDBFail implements Action {
    readonly type =ResPartnerDBActionsType.LOAD_LOGGED_USER_DB_FAIL;
    constructor(public payload: {error:any}) { }
}

export class AddManyDB implements Action {
    readonly type =ResPartnerDBActionsType.ADD_MANY_DB;
    constructor(public payload: IResPartner[]) { }
}

export class AddManyDBSuccess implements Action {
    readonly type =ResPartnerDBActionsType.ADD_MANY_DB_SUCCESS;
    constructor(public payload: IResPartner[]) { }
}

export class AddManyDBFail implements Action {
    readonly type =ResPartnerDBActionsType.ADD_MANY_DB_FAIL;
    constructor(public payload: any) { }
}

export class DeleteManyDB implements Action {
    readonly type =ResPartnerDBActionsType.DELETE_MANY_DB;
    constructor(public payload: number[]) { }
}

export class DeleteManyDBSuccess implements Action {
    readonly type =ResPartnerDBActionsType.DELETE_MANY_DB_SUCCESS;
    constructor(public payload: any) { }
}

export class DeleteManyDBFail implements Action {
    readonly type =ResPartnerDBActionsType.DELETE_MANY_DB_FAIL;
    constructor(public payload: any) { }
}

export class DropTable implements Action {
    readonly type =ResPartnerDBActionsType.DROP_TABLE;
    constructor() { }
}

export class DropTableSuccess implements Action {
    readonly type =ResPartnerDBActionsType.DROP_TABLE_SUCCESS;
    constructor(public payload: any) { }
}

export class DropTableFail implements Action {
    readonly type =ResPartnerDBActionsType.DROP_TABLE_FAIL;
    constructor(public payload: any) { }
}

export class NewTable implements Action {
    readonly type =ResPartnerDBActionsType.NEW_TABLE;
    constructor() { }
}

export class NewTableSuccess implements Action {
    readonly type =ResPartnerDBActionsType.NEW_TABLE_SUCCESS;
    constructor(public payload: any) { }
}

export class NewTableFail implements Action {
    readonly type =ResPartnerDBActionsType.NEW_TABLE_FAIL;
    constructor(public payload: any) { }
}

export type ResPartnerDBActions =
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
