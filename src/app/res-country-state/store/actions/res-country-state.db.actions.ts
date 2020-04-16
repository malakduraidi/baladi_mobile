import { Action } from "@ngrx/store";
import { IResCountryState} from "../../models/res-country-state";
import {ResCountryStateActionsType } from "./res-country-state.actions";
import {resCountryStateAdapter } from "../state";

// HTTP CRUD

// DB CRUD
export enum ResCountryStateDBActionsType {

  ADD_DB = "[ResCountryState] ADD_DB",
    UPDATE_DB = "[ResCountryState] UPDATE_DB",
    ADD_UPDATE_DB_SUCCESS = "[ResCountryState] ADD_UPDATE_DB_SUCCESS",
    ADD_UPDATE_DB_FAIL = "[ResCountryState] ADD_UPDATE_DB_FAIL",

    DELETE_DB = "[ResCountryState] DELETE_DB",
    DELETE_DB_SUCCESS = "[ResCountryState] DELETE_DB_SUCCESS",
    DELETE_DB_FAIL = "[ResCountryState] DELETE_DB_FAIL",

    LOAD_DB = "[ResCountryState] LOAD_DB",
    LOAD_DB_SUCCESS = "[ResCountryState] LOAD_DB_SUCCESS",
    LOAD_DB_FAIL = "[ResCountryState] LOAD_DB_SUCCESS",

    ADD_MANY_DB = "[ResCountryState] ADD_MANY_DB",
    ADD_MANY_DB_SUCCESS = "[ResCountryState] ADD_MANY_DB_SUCCESS",

    ADD_MANY_DB_FAIL = "[ResCountryState] ADD_MANY_DB_FAIL",
    ADD_UPDATE_MANY_LINE_DB_SUCCESS = "[ResCountryState] ADD_UPDATE_MANY_LINE_DB_SUCCESS",
    ADD_UPDATE_MANY_LINE_DB_FAIL = "[ResCountryState] ADD_UPDATE_MANY_LINE_DB_FAIL",

    DELETE_MANY_DB = "[ResCountryState] DELETE_MANY_DB",
    DELETE_MANY_DB_SUCCESS = "[ResCountryState] DELETE_MAN_DB_SUCCESS",
    DELETE_MANY_DB_FAIL = "[ResCountryState] DELETE_MAN_DB_FAIL",

    DROP_TABLE = "[ResCountryState] DROP_TABLE",
    DROP_TABLE_SUCCESS = "[ResCountryState] DROP_TABLE_SUCCESS",
    DROP_TABLE_FAIL = "[ResCountryState] DROP_TABLE_FAIL",

    NEW_TABLE = "[ResCountryState] NEW_TABLE",
    NEW_TABLE_SUCCESS = "[ResCountryState] NEW_TABLE_SUCCESS",
    NEW_TABLE_FAIL = "[ResCountryState] NEW_TABLE_FAIL"

}

export class AddDB implements Action {
  readonly type =ResCountryStateDBActionsType.ADD_DB;
constructor(public payload: IResCountryState) { }
}

export class UpdateDB implements Action {
  readonly type =ResCountryStateDBActionsType.UPDATE_DB;
constructor(public payload: { id: number; changes: any }) { }
}

export class AddUpdateDBSuccess implements Action {
  readonly type =ResCountryStateDBActionsType.ADD_UPDATE_DB_SUCCESS;
// comes from effect
constructor(public payload: IResCountryState) { }
}
export class AddUpdateDBFail implements Action {
  readonly type =ResCountryStateDBActionsType.ADD_UPDATE_DB_FAIL;
constructor(public payload: any) { }
}

export class DeleteDB implements Action {
  readonly type =ResCountryStateDBActionsType.DELETE_DB;
constructor(public payload: IResCountryState) { }
}

export class DeleteDBSuccess implements Action {
  readonly type =ResCountryStateDBActionsType.DELETE_DB_SUCCESS;
constructor(public payload: IResCountryState) { }
}

export class DeleteDBFail implements Action {
  readonly type =ResCountryStateDBActionsType.DELETE_DB_FAIL;
constructor(public payload: any) { }
}

export class LoadDB implements Action {
  readonly type =ResCountryStateDBActionsType.LOAD_DB;
constructor() { }
}
export class LoadDBSuccess implements Action {
  readonly type =ResCountryStateDBActionsType.LOAD_DB_SUCCESS;
constructor(public payload: IResCountryState[]) { }
}
export class LoadDBFail implements Action {
  readonly type =ResCountryStateDBActionsType.LOAD_DB_FAIL;
constructor(public payload: any) { }
}
export class AddManyDB implements Action {
  readonly type =ResCountryStateDBActionsType.ADD_MANY_DB;
constructor(public payload: IResCountryState[]) { }
}
export class AddManyDBSuccess implements Action {
  readonly type =ResCountryStateDBActionsType.ADD_MANY_DB;
constructor(public payload: IResCountryState[]) { }
}

export class AddManyDBFail implements Action {
  readonly type =ResCountryStateDBActionsType.ADD_MANY_DB;
constructor(public payload: any) { }
}

export class DeleteManyDB implements Action {
  readonly type =ResCountryStateDBActionsType.DELETE_MANY_DB;
constructor(public payload: number[]) { }
}

export class DeleteManyDBSuccess implements Action {
  readonly type =ResCountryStateDBActionsType.DELETE_MANY_DB_SUCCESS;
constructor(public payload: any) { }
}
export class DeleteManyDBFail implements Action {
  readonly type =ResCountryStateDBActionsType.DELETE_MANY_DB_FAIL;
constructor(public payload: any) { }
}

export class DropTable implements Action {
  readonly type =ResCountryStateDBActionsType.DROP_TABLE;
constructor() { }
}

export class DropTableSuccess implements Action {
  readonly type =ResCountryStateDBActionsType.DROP_TABLE_SUCCESS;
constructor(public payload: any) { }
}
export class DropTableFail implements Action {
  readonly type =ResCountryStateDBActionsType.DROP_TABLE_FAIL;
constructor(public payload: any) { }
}

export class NewTable implements Action {
  readonly type =ResCountryStateDBActionsType.NEW_TABLE;
constructor() { }
}
export class NewTableSuccess implements Action {
  readonly type =ResCountryStateDBActionsType.NEW_TABLE_SUCCESS;
constructor(public payload: any) { }
}
export class NewTableFail implements Action {
  readonly type =ResCountryStateDBActionsType.NEW_TABLE_FAIL;
constructor(public payload: any) { }
}

export type ResCountryStateDBActions =
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
