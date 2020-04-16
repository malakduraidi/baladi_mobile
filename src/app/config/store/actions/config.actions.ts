import { Action } from "@ngrx/store";
import { IConfig} from "../../models/config";

// HTTP CRUD

//  CRUD
export enum ConfigActionsType {
    ADD = "[Config] ADD",
    UPDATE = "[Config] UPDATE",
    ADD_UPDATE_SUCCESS = "[Config] ADD_UPDATE_SUCCESS",
    ADD_UPDATE_FAIL = "[Config] ADD_UPDATE_FAIL",

    DELETE = "[Config] DELETE",
    DELETE_SUCCESS = "[Config] DELETE_TRAINING_SUCCESS",
    DELETE_FAIL = "[Config] DELETE_TRAINING_FAIL",

    UPDATE_OFFSET = '[Config] Update Offset',
    UPDATE_LIMIT = '[Config] Update Limit',
    UPDATE_NOTIFICATIONS = '[Config] UPDATE_NOTIFICATIONS',

    INCREMENT_NOTIFICATIONS = '[Config] INCREMENT_NOTIFICATIONS',
    DECREMENT_NOTIFICATIONS = '[Config] DECREMENT_NOTIFICATIONS',
    CLEAR_NOTIFICATIONS = '[Config] CLEAR_NOTIFICATIONS',

}

export class Add implements Action {
  readonly type =ConfigActionsType.ADD;
  constructor(public payload: IConfig) { }
}

export class Update implements Action {
  readonly type =ConfigActionsType.UPDATE;
  constructor(public payload: IConfig) { }
}

export class AddUpdateSuccess implements Action {
  readonly type =ConfigActionsType.ADD;
  // comes from effect
  constructor(public payload: IConfig) { }
}

export class AddUpdateFail implements Action {
  readonly type =ConfigActionsType.ADD_UPDATE_FAIL;
  constructor(public payload: any) { }
}

export class Delete implements Action {
  readonly type =ConfigActionsType.DELETE;
  constructor(public payload: IConfig) { }
}

export class UpdateOffset implements Action {
  readonly type =ConfigActionsType.UPDATE_OFFSET;
  constructor(public offset: number) { }
}

export class UpdateLimit implements Action {
  readonly type =ConfigActionsType.UPDATE_LIMIT;
  constructor(public limit: number) { }
}

export class UpdateNotifications implements Action {
  readonly type = ConfigActionsType.UPDATE_NOTIFICATIONS;
  constructor(public payload: { notifications: number }) { }
}

export class IncrementNotifications implements Action {
  readonly type = ConfigActionsType.INCREMENT_NOTIFICATIONS;
}

export class DecrementNotifications implements Action {
  readonly type = ConfigActionsType.DECREMENT_NOTIFICATIONS;
}

export class ClearNotifications implements Action {
  readonly type = ConfigActionsType.CLEAR_NOTIFICATIONS;
}

export type ConfigActions =
  | Add
  | Update
  | AddUpdateSuccess
  | AddUpdateFail
  | Delete
  | UpdateOffset
  | UpdateLimit
  | UpdateNotifications
  | IncrementNotifications
  | DecrementNotifications
  | ClearNotifications;
