import { Action } from "@ngrx/store";
import { IResCountryState} from "../../models/res-country-state";

// HTTP CRUD

//  CRUD
export enum ResCountryStateActionsType {
    ADD = "[ResCountryState] ADD",
    UPDATE = "[ResCountryState] UPDATE",
    ADD_UPDATE_SUCCESS = "[ResCountryState] ADD_UPDATE_SUCCESS",
    ADD_UPDATE_FAIL = "[ResCountryState] ADD_UPDATE_FAIL",

    DELETE = "[ResCountryState] DELETE",
    DELETE_SUCCESS = "[ResCountryState] DELETE_TRAINING_SUCCESS",
    DELETE_FAIL = "[ResCountryState] DELETE_TRAINING_FAIL",
    UPDATE_OFFSET = '[ResCountryState] Update Offset',
    UPDATE_LIMIT = '[ResCountryState] Update Limit',
    UPDATE_NOTIFICATIONS = '[ResCountryState] UPDATE_NOTIFICATIONS',
    INCREMENT_NOTIFICATIONS = '[ResCountryState] INCREMENT_NOTIFICATIONS',
    DECREMENT_NOTIFICATIONS = '[ResCountryState] DECREMENT_NOTIFICATIONS',
    CLEAR_NOTIFICATIONS = '[ResCountryState] CLEAR_NOTIFICATIONS',

}


export class Add implements Action {
  readonly type =ResCountryStateActionsType.ADD;
  constructor(public payload: IResCountryState) { }
}

export class Update implements Action {
  readonly type =ResCountryStateActionsType.UPDATE;
constructor(public payload: IResCountryState) { }
}

export class AddUpdateSuccess implements Action {
  readonly type =ResCountryStateActionsType.ADD;
// comes from effect
constructor(public payload: IResCountryState) { }
}
export class AddUpdateFail implements Action {
  readonly type =ResCountryStateActionsType.ADD_UPDATE_FAIL;
constructor(public payload: any) { }
}

export class Delete implements Action {
  readonly type =ResCountryStateActionsType.DELETE;
constructor(public payload: IResCountryState) { }
}

export class UpdateOffset implements Action {
  readonly type =ResCountryStateActionsType.UPDATE_OFFSET;
constructor(public offset: number) { }
}
export class UpdateLimit implements Action {
  readonly type =ResCountryStateActionsType.UPDATE_LIMIT;
constructor(public limit: number) { }

}


export class UpdateNotifications implements Action {

  readonly type = ResCountryStateActionsType.UPDATE_NOTIFICATIONS;
  constructor(public payload: { notifications: number }) { }
}
export class IncrementNotifications implements Action {
  readonly type = ResCountryStateActionsType.INCREMENT_NOTIFICATIONS;
}
export class DecrementNotifications implements Action {
  readonly type = ResCountryStateActionsType.DECREMENT_NOTIFICATIONS;
}
export class ClearNotifications implements Action {
  readonly type = ResCountryStateActionsType.CLEAR_NOTIFICATIONS;
}


export type ResCountryStateActions =
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
