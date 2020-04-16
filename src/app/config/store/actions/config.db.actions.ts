import { Action } from "@ngrx/store";
import { IConfig} from "../../models/config";
import {ConfigActionsType } from "./config.actions";
import {configAdapter } from "../state";

// HTTP CRUD

// DB CRUD
export enum ConfigDBActionsType {

  ADD_DB = "[Config] ADD_DB",
  UPDATE_DB = "[Config] UPDATE_DB",
  ADD_UPDATE_DB_SUCCESS = "[Config] ADD_UPDATE_DB_SUCCESS",
  ADD_UPDATE_DB_FAIL = "[Config] ADD_UPDATE_DB_FAIL",

  DELETE_DB = "[Config] DELETE_DB",
  DELETE_DB_SUCCESS = "[Config] DELETE_DB_SUCCESS",
  DELETE_DB_FAIL = "[Config] DELETE_DB_FAIL",

  LOAD_DB = "[Config] LOAD_DB",
  LOAD_DB_SUCCESS = "[Config] LOAD_DB_SUCCESS",
  LOAD_DB_FAIL = "[Config] LOAD_DB_SUCCESS",

  ADD_MANY_DB = "[Config] ADD_MANY_DB",
  ADD_MANY_DB_SUCCESS = "[Config] ADD_MANY_DB_SUCCESS",
  ADD_MANY_DB_FAIL = "[Config] ADD_MANY_DB_FAIL",
  ADD_UPDATE_MANY_LINE_DB_SUCCESS = "[Config] ADD_UPDATE_MANY_LINE_DB_SUCCESS",
  ADD_UPDATE_MANY_LINE_DB_FAIL = "[Config] ADD_UPDATE_MANY_LINE_DB_FAIL",

  DELETE_MANY_DB = "[Config] DELETE_MANY_DB",
  DELETE_MANY_DB_SUCCESS = "[Config] DELETE_MAN_DB_SUCCESS",
  DELETE_MANY_DB_FAIL = "[Config] DELETE_MAN_DB_FAIL",

  DROP_TABLE = "[Config] DROP_TABLE",
  DROP_TABLE_SUCCESS = "[Config] DROP_TABLE_SUCCESS",
  DROP_TABLE_FAIL = "[Config] DROP_TABLE_FAIL",

  NEW_TABLE = "[Config] NEW_TABLE",
  NEW_TABLE_SUCCESS = "[Config] NEW_TABLE_SUCCESS",
  NEW_TABLE_FAIL = "[Config] NEW_TABLE_FAIL"

}

export class AddDB implements Action {
  readonly type =ConfigDBActionsType.ADD_DB;
  constructor(public payload: IConfig) { }
}

export class UpdateDB implements Action {
  readonly type =ConfigDBActionsType.UPDATE_DB;
  constructor(public payload: { id: number; changes: any }) { }
}

export class AddUpdateDBSuccess implements Action {
  readonly type =ConfigDBActionsType.ADD_UPDATE_DB_SUCCESS;
  // comes from effect
  constructor(public payload: IConfig) { }
}

export class AddUpdateDBFail implements Action {
  readonly type =ConfigDBActionsType.ADD_UPDATE_DB_FAIL;
  constructor(public payload: any) { }
}

export class DeleteDB implements Action {
  readonly type =ConfigDBActionsType.DELETE_DB;
  constructor(public payload: IConfig) { }
}

export class DeleteDBSuccess implements Action {
  readonly type =ConfigDBActionsType.DELETE_DB_SUCCESS;
  constructor(public payload: IConfig) { }
}

export class DeleteDBFail implements Action {
  readonly type =ConfigDBActionsType.DELETE_DB_FAIL;
  constructor(public payload: any) { }
}

export class LoadDB implements Action {
  readonly type =ConfigDBActionsType.LOAD_DB;
  constructor() { }
}

export class LoadDBSuccess implements Action {
  readonly type =ConfigDBActionsType.LOAD_DB_SUCCESS;
  constructor(public payload: IConfig[]) { }
}

export class LoadDBFail implements Action {
  readonly type =ConfigDBActionsType.LOAD_DB_FAIL;
  constructor(public payload: any) { }
}

// malak: in case add data in db
export class AddManyDB implements Action {
  readonly type =ConfigDBActionsType.ADD_MANY_DB;
  constructor(public payload: IConfig[]) { }
}

// malak: in case success add data in db
export class AddManyDBSuccess implements Action {
  readonly type =ConfigDBActionsType.ADD_MANY_DB_SUCCESS;
  constructor(public payload: IConfig[]) { }
}

// malak: in case fail add data in db
export class AddManyDBFail implements Action {
  readonly type =ConfigDBActionsType.ADD_MANY_DB_FAIL;
  constructor(public payload: any) { }
}

export class DeleteManyDB implements Action {
  readonly type =ConfigDBActionsType.DELETE_MANY_DB;
  constructor(public payload: number[]) { }
}

export class DeleteManyDBSuccess implements Action {
  readonly type =ConfigDBActionsType.DELETE_MANY_DB_SUCCESS;
  constructor(public payload: any) { }
}

export class DeleteManyDBFail implements Action {
  readonly type =ConfigDBActionsType.DELETE_MANY_DB_FAIL;
  constructor(public payload: any) { }
}

export class DropTable implements Action {
  readonly type =ConfigDBActionsType.DROP_TABLE;
  constructor() { }
}

export class DropTableSuccess implements Action {
  readonly type =ConfigDBActionsType.DROP_TABLE_SUCCESS;
  constructor(public payload: any) { }
}

export class DropTableFail implements Action {
  readonly type =ConfigDBActionsType.DROP_TABLE_FAIL;
  constructor(public payload: any) { }
}

export class NewTable implements Action {
  readonly type =ConfigDBActionsType.NEW_TABLE;
  constructor() { }
}

export class NewTableSuccess implements Action {
  readonly type =ConfigDBActionsType.NEW_TABLE_SUCCESS;
  constructor(public payload: any) { }
}

export class NewTableFail implements Action {
  readonly type =ConfigDBActionsType.NEW_TABLE_FAIL;
  constructor(public payload: any) { }
}

export type ConfigDBActions =
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
