import { Action } from "@ngrx/store";
import { IResCountry} from "../../models/res-country";

// HTTP CRUD

//  CRUD
export enum ResCountryActionsType {
    ADD = "[ResCountry] ADD",
    UPDATE = "[ResCountry] UPDATE",
    ADD_UPDATE_SUCCESS = "[ResCountry] ADD_UPDATE_SUCCESS",
    ADD_UPDATE_FAIL = "[ResCountry] ADD_UPDATE_FAIL",

    DELETE = "[ResCountry] DELETE",
    DELETE_SUCCESS = "[ResCountry] DELETE_TRAINING_SUCCESS",
    DELETE_FAIL = "[ResCountry] DELETE_TRAINING_FAIL",
    UPDATE_OFFSET = '[ResCountry] Update Offset',
    UPDATE_LIMIT = '[ResCountry] Update Limit',
    UPDATE_NOTIFICATIONS = '[ResCountry] UPDATE_NOTIFICATIONS',
    INCREMENT_NOTIFICATIONS = '[ResCountry] INCREMENT_NOTIFICATIONS',
    DECREMENT_NOTIFICATIONS = '[ResCountry] DECREMENT_NOTIFICATIONS',
    CLEAR_NOTIFICATIONS = '[ResCountry] CLEAR_NOTIFICATIONS',

}


export class Add implements Action {
  readonly type =ResCountryActionsType.ADD;
  constructor(public payload: IResCountry) { }
}

export class Update implements Action {
  readonly type =ResCountryActionsType.UPDATE;
constructor(public payload: IResCountry) { }
}

export class AddUpdateSuccess implements Action {
  readonly type =ResCountryActionsType.ADD;
// comes from effect
constructor(public payload: IResCountry) { }
}
export class AddUpdateFail implements Action {
  readonly type =ResCountryActionsType.ADD_UPDATE_FAIL;
constructor(public payload: any) { }
}

export class Delete implements Action {
  readonly type =ResCountryActionsType.DELETE;
constructor(public payload: IResCountry) { }
}

export class UpdateOffset implements Action {
  readonly type =ResCountryActionsType.UPDATE_OFFSET;
constructor(public offset: number) { }
}
export class UpdateLimit implements Action {
  readonly type =ResCountryActionsType.UPDATE_LIMIT;
constructor(public limit: number) { }

}


export class UpdateNotifications implements Action {

  readonly type = ResCountryActionsType.UPDATE_NOTIFICATIONS;
  constructor(public payload: { notifications: number }) { }
}
export class IncrementNotifications implements Action {
  readonly type = ResCountryActionsType.INCREMENT_NOTIFICATIONS;
}
export class DecrementNotifications implements Action {
  readonly type = ResCountryActionsType.DECREMENT_NOTIFICATIONS;
}
export class ClearNotifications implements Action {
  readonly type = ResCountryActionsType.CLEAR_NOTIFICATIONS;
}


export type ResCountryActions =
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
