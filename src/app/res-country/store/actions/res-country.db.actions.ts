import { Action } from "@ngrx/store";
import { IResCountry} from "../../models/res-country";
import {ResCountryActionsType } from "./res-country.actions";
import {resCountryAdapter } from "../state";

// HTTP CRUD

// DB CRUD
export enum ResCountryDBActionsType {

  ADD_DB = "[ResCountry] ADD_DB",
    UPDATE_DB = "[ResCountry] UPDATE_DB",
    ADD_UPDATE_DB_SUCCESS = "[ResCountry] ADD_UPDATE_DB_SUCCESS",
    ADD_UPDATE_DB_FAIL = "[ResCountry] ADD_UPDATE_DB_FAIL",

    DELETE_DB = "[ResCountry] DELETE_DB",
    DELETE_DB_SUCCESS = "[ResCountry] DELETE_DB_SUCCESS",
    DELETE_DB_FAIL = "[ResCountry] DELETE_DB_FAIL",

    LOAD_DB = "[ResCountry] LOAD_DB",
    LOAD_DB_SUCCESS = "[ResCountry] LOAD_DB_SUCCESS",
    LOAD_DB_FAIL = "[ResCountry] LOAD_DB_SUCCESS",

    ADD_MANY_DB = "[ResCountry] ADD_MANY_DB",
    ADD_MANY_DB_SUCCESS = "[ResCountry] ADD_MANY_DB_SUCCESS",

    ADD_MANY_DB_FAIL = "[ResCountry] ADD_MANY_DB_FAIL",
    ADD_UPDATE_MANY_LINE_DB_SUCCESS = "[ResCountry] ADD_UPDATE_MANY_LINE_DB_SUCCESS",
    ADD_UPDATE_MANY_LINE_DB_FAIL = "[ResCountry] ADD_UPDATE_MANY_LINE_DB_FAIL",

    DELETE_MANY_DB = "[ResCountry] DELETE_MANY_DB",
    DELETE_MANY_DB_SUCCESS = "[ResCountry] DELETE_MAN_DB_SUCCESS",
    DELETE_MANY_DB_FAIL = "[ResCountry] DELETE_MAN_DB_FAIL",

    DROP_TABLE = "[ResCountry] DROP_TABLE",
    DROP_TABLE_SUCCESS = "[ResCountry] DROP_TABLE_SUCCESS",
    DROP_TABLE_FAIL = "[ResCountry] DROP_TABLE_FAIL",

    NEW_TABLE = "[ResCountry] NEW_TABLE",
    NEW_TABLE_SUCCESS = "[ResCountry] NEW_TABLE_SUCCESS",
    NEW_TABLE_FAIL = "[ResCountry] NEW_TABLE_FAIL"

}

export class AddDB implements Action {
  readonly type =ResCountryDBActionsType.ADD_DB;
  constructor(public payload: IResCountry) { }
}
export class UpdateDB implements Action {
  readonly type =ResCountryDBActionsType.UPDATE_DB;
  constructor(public payload: { id: number; changes: any }) { }
}
export class AddUpdateDBSuccess implements Action {
  readonly type =ResCountryDBActionsType.ADD_UPDATE_DB_SUCCESS;
  // comes from effect
  constructor(public payload: IResCountry) { }
}
export class AddUpdateDBFail implements Action {
  readonly type =ResCountryDBActionsType.ADD_UPDATE_DB_FAIL;
  constructor(public payload: any) { }
}

export class DeleteDB implements Action {
  readonly type =ResCountryDBActionsType.DELETE_DB;
  constructor(public payload: IResCountry) { }
}
export class DeleteDBSuccess implements Action {
  readonly type =ResCountryDBActionsType.DELETE_DB_SUCCESS;
  constructor(public payload: IResCountry) { }
}
export class DeleteDBFail implements Action {
  readonly type =ResCountryDBActionsType.DELETE_DB_FAIL;
  constructor(public payload: any) { }
}

export class LoadDB implements Action {
  readonly type =ResCountryDBActionsType.LOAD_DB;
  constructor() { }
}
export class LoadDBSuccess implements Action {
  readonly type =ResCountryDBActionsType.LOAD_DB_SUCCESS;
  constructor(public payload: IResCountry[]) { }
}
export class LoadDBFail implements Action {
  readonly type =ResCountryDBActionsType.LOAD_DB_FAIL;
  constructor(public payload: any) { }
}

export class AddManyDB implements Action {
  readonly type =ResCountryDBActionsType.ADD_MANY_DB;
  constructor(public payload: IResCountry[]) { }
}
export class AddManyDBSuccess implements Action {
  readonly type =ResCountryDBActionsType.ADD_MANY_DB;
  constructor(public payload: IResCountry[]) { }
}
export class AddManyDBFail implements Action {
  readonly type =ResCountryDBActionsType.ADD_MANY_DB;
  constructor(public payload: any) { }
}

export class DeleteManyDB implements Action {
  readonly type =ResCountryDBActionsType.DELETE_MANY_DB;
  constructor(public payload: number[]) { }
}
export class DeleteManyDBSuccess implements Action {
  readonly type =ResCountryDBActionsType.DELETE_MANY_DB_SUCCESS;
  constructor(public payload: any) { }
}
export class DeleteManyDBFail implements Action {
  readonly type =ResCountryDBActionsType.DELETE_MANY_DB_FAIL;
  constructor(public payload: any) { }
}

export class DropTable implements Action {
  readonly type =ResCountryDBActionsType.DROP_TABLE;
  constructor() { }
}
export class DropTableSuccess implements Action {
  readonly type =ResCountryDBActionsType.DROP_TABLE_SUCCESS;
  constructor(public payload: any) { }
}
export class DropTableFail implements Action {
  readonly type =ResCountryDBActionsType.DROP_TABLE_FAIL;
  constructor(public payload: any) { }
}

export class NewTable implements Action {
  readonly type =ResCountryDBActionsType.NEW_TABLE;
  constructor() { }
}
export class NewTableSuccess implements Action {
  readonly type =ResCountryDBActionsType.NEW_TABLE_SUCCESS;
  constructor(public payload: any) { }
}
export class NewTableFail implements Action {
  readonly type =ResCountryDBActionsType.NEW_TABLE_FAIL;
  constructor(public payload: any) { }
}

export type ResCountryDBActions =
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
