import { Action } from "@ngrx/store";
import { ISaleOrder} from "../../models/sale-order";

// HTTP CRUD

//  CRUD
export enum SaleOrderActionsType {
    ADD = "[SaleOrder] ADD",
    UPDATE = "[SaleOrder] UPDATE",
    ADD_UPDATE_SUCCESS = "[SaleOrder] ADD_UPDATE_SUCCESS",
    ADD_UPDATE_FAIL = "[SaleOrder] ADD_UPDATE_FAIL",

    DELETE = "[SaleOrder] DELETE",
    DELETE_SUCCESS = "[SaleOrder] DELETE_TRAINING_SUCCESS",
    DELETE_FAIL = "[SaleOrder] DELETE_TRAINING_FAIL",
    UPDATE_OFFSET = '[SaleOrder] Update Offset',
    UPDATE_LIMIT = '[SaleOrder] Update Limit',
    UPDATE_NOTIFICATIONS = '[SaleOrder] UPDATE_NOTIFICATIONS',
    INCREMENT_NOTIFICATIONS = '[SaleOrder] INCREMENT_NOTIFICATIONS',
    DECREMENT_NOTIFICATIONS = '[SaleOrder] DECREMENT_NOTIFICATIONS',
    CLEAR_NOTIFICATIONS = '[SaleOrder] CLEAR_NOTIFICATIONS',

}


export class Add implements Action {
  readonly type =SaleOrderActionsType.ADD;
  constructor(public payload: ISaleOrder) { }
}

export class Update implements Action {
  readonly type =SaleOrderActionsType.UPDATE;
constructor(public payload: ISaleOrder) { }
}

export class AddUpdateSuccess implements Action {
  readonly type =SaleOrderActionsType.ADD;
// comes from effect
constructor(public payload: ISaleOrder) { }
}
export class AddUpdateFail implements Action {
  readonly type =SaleOrderActionsType.ADD_UPDATE_FAIL;
constructor(public payload: any) { }
}

export class Delete implements Action {
  readonly type =SaleOrderActionsType.DELETE;
constructor(public payload: ISaleOrder) { }
}

export class UpdateOffset implements Action {
  readonly type =SaleOrderActionsType.UPDATE_OFFSET;
constructor(public offset: number) { }
}
export class UpdateLimit implements Action {
  readonly type =SaleOrderActionsType.UPDATE_LIMIT;
constructor(public limit: number) { }

}


export class UpdateNotifications implements Action {

  readonly type = SaleOrderActionsType.UPDATE_NOTIFICATIONS;
  constructor(public payload: { notifications: number }) { }
}
export class IncrementNotifications implements Action {
  readonly type = SaleOrderActionsType.INCREMENT_NOTIFICATIONS;
}
export class DecrementNotifications implements Action {
  readonly type = SaleOrderActionsType.DECREMENT_NOTIFICATIONS;
}
export class ClearNotifications implements Action {
  readonly type = SaleOrderActionsType.CLEAR_NOTIFICATIONS;
}


export type SaleOrderActions =
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
