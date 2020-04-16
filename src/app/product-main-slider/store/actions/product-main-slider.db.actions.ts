import { Action } from "@ngrx/store";
import { IProductMainSlider} from "../../models/product-main-slider";
import {ProductMainSliderActionsType } from "./product-main-slider.actions";
import {productMainSliderAdapter } from "../state";

// HTTP CRUD

// DB CRUD
export enum ProductMainSliderDBActionsType {

  ADD_DB = "[ProductMainSlider] ADD_DB",
    UPDATE_DB = "[ProductMainSlider] UPDATE_DB",
    ADD_UPDATE_DB_SUCCESS = "[ProductMainSlider] ADD_UPDATE_DB_SUCCESS",
    ADD_UPDATE_DB_FAIL = "[ProductMainSlider] ADD_UPDATE_DB_FAIL",

    DELETE_DB = "[ProductMainSlider] DELETE_DB",
    DELETE_DB_SUCCESS = "[ProductMainSlider] DELETE_DB_SUCCESS",
    DELETE_DB_FAIL = "[ProductMainSlider] DELETE_DB_FAIL",

    LOAD_DB = "[ProductMainSlider] LOAD_DB",
    LOAD_DB_SUCCESS = "[ProductMainSlider] LOAD_DB_SUCCESS",
    LOAD_DB_FAIL = "[ProductMainSlider] LOAD_DB_SUCCESS",

    ADD_MANY_DB = "[ProductMainSlider] ADD_MANY_DB",
    ADD_MANY_DB_SUCCESS = "[ProductMainSlider] ADD_MANY_DB_SUCCESS",

    ADD_MANY_DB_FAIL = "[ProductMainSlider] ADD_MANY_DB_FAIL",
    ADD_UPDATE_MANY_LINE_DB_SUCCESS = "[ProductMainSlider] ADD_UPDATE_MANY_LINE_DB_SUCCESS",
    ADD_UPDATE_MANY_LINE_DB_FAIL = "[ProductMainSlider] ADD_UPDATE_MANY_LINE_DB_FAIL",

    DELETE_MANY_DB = "[ProductMainSlider] DELETE_MANY_DB",
    DELETE_MANY_DB_SUCCESS = "[ProductMainSlider] DELETE_MAN_DB_SUCCESS",
    DELETE_MANY_DB_FAIL = "[ProductMainSlider] DELETE_MAN_DB_FAIL",

    DROP_TABLE = "[ProductMainSlider] DROP_TABLE",
    DROP_TABLE_SUCCESS = "[ProductMainSlider] DROP_TABLE_SUCCESS",
    DROP_TABLE_FAIL = "[ProductMainSlider] DROP_TABLE_FAIL",

    NEW_TABLE = "[ProductMainSlider] NEW_TABLE",
    NEW_TABLE_SUCCESS = "[ProductMainSlider] NEW_TABLE_SUCCESS",
    NEW_TABLE_FAIL = "[ProductMainSlider] NEW_TABLE_FAIL"

}

export class AddDB implements Action {
  readonly type =ProductMainSliderDBActionsType.ADD_DB;
constructor(public payload: IProductMainSlider) { }
}

export class UpdateDB implements Action {
  readonly type =ProductMainSliderDBActionsType.UPDATE_DB;
constructor(public payload: { id: number; changes: any }) { }
}

export class AddUpdateDBSuccess implements Action {
  readonly type =ProductMainSliderDBActionsType.ADD_UPDATE_DB_SUCCESS;
// comes from effect
constructor(public payload: IProductMainSlider) { }
}
export class AddUpdateDBFail implements Action {
  readonly type =ProductMainSliderDBActionsType.ADD_UPDATE_DB_FAIL;
constructor(public payload: any) { }
}

export class DeleteDB implements Action {
  readonly type =ProductMainSliderDBActionsType.DELETE_DB;
constructor(public payload: IProductMainSlider) { }
}

export class DeleteDBSuccess implements Action {
  readonly type =ProductMainSliderDBActionsType.DELETE_DB_SUCCESS;
constructor(public payload: IProductMainSlider) { }
}

export class DeleteDBFail implements Action {
  readonly type =ProductMainSliderDBActionsType.DELETE_DB_FAIL;
constructor(public payload: any) { }
}

export class LoadDB implements Action {
  readonly type =ProductMainSliderDBActionsType.LOAD_DB;
constructor() { }
}
export class LoadDBSuccess implements Action {
  readonly type =ProductMainSliderDBActionsType.LOAD_DB_SUCCESS;
constructor(public payload: IProductMainSlider[]) { }
}
export class LoadDBFail implements Action {
  readonly type =ProductMainSliderDBActionsType.LOAD_DB_FAIL;
constructor(public payload: any) { }
}
export class AddManyDB implements Action {
  readonly type =ProductMainSliderDBActionsType.ADD_MANY_DB;
constructor(public payload: IProductMainSlider[]) { }
}
export class AddManyDBSuccess implements Action {
  readonly type =ProductMainSliderDBActionsType.ADD_MANY_DB;
constructor(public payload: IProductMainSlider[]) { }
}

export class AddManyDBFail implements Action {
  readonly type =ProductMainSliderDBActionsType.ADD_MANY_DB;
constructor(public payload: any) { }
}

export class DeleteManyDB implements Action {
  readonly type =ProductMainSliderDBActionsType.DELETE_MANY_DB;
constructor(public payload: number[]) { }
}

export class DeleteManyDBSuccess implements Action {
  readonly type =ProductMainSliderDBActionsType.DELETE_MANY_DB_SUCCESS;
constructor(public payload: any) { }
}
export class DeleteManyDBFail implements Action {
  readonly type =ProductMainSliderDBActionsType.DELETE_MANY_DB_FAIL;
constructor(public payload: any) { }
}

export class DropTable implements Action {
  readonly type =ProductMainSliderDBActionsType.DROP_TABLE;
constructor() { }
}

export class DropTableSuccess implements Action {
  readonly type =ProductMainSliderDBActionsType.DROP_TABLE_SUCCESS;
constructor(public payload: any) { }
}
export class DropTableFail implements Action {
  readonly type =ProductMainSliderDBActionsType.DROP_TABLE_FAIL;
constructor(public payload: any) { }
}

export class NewTable implements Action {
  readonly type =ProductMainSliderDBActionsType.NEW_TABLE;
constructor() { }
}
export class NewTableSuccess implements Action {
  readonly type =ProductMainSliderDBActionsType.NEW_TABLE_SUCCESS;
constructor(public payload: any) { }
}
export class NewTableFail implements Action {
  readonly type =ProductMainSliderDBActionsType.NEW_TABLE_FAIL;
constructor(public payload: any) { }
}

export type ProductMainSliderDBActions =
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
