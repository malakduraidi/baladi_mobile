import { Action } from "@ngrx/store";
import { ISaleOrderLine} from "../../models/sale-order-line";

// HTTP CRUD

//  CRUD
export enum SaleOrderLineActionsType {
    ADD = "[SaleOrderLine] ADD",
    UPDATE = "[SaleOrderLine] UPDATE",
    ADD_UPDATE_SUCCESS = "[SaleOrderLine] ADD_UPDATE_SUCCESS",
    ADD_UPDATE_FAIL = "[SaleOrderLine] ADD_UPDATE_FAIL",

    DELETE = "[SaleOrderLine] DELETE",
    DELETE_SUCCESS = "[SaleOrderLine] DELETE_TRAINING_SUCCESS",
    DELETE_FAIL = "[SaleOrderLine] DELETE_TRAINING_FAIL",
    UPDATE_OFFSET = '[SaleOrderLine] Update Offset',
    UPDATE_LIMIT = '[SaleOrderLine] Update Limit',
    UPDATE_NOTIFICATIONS = '[SaleOrderLine] UPDATE_NOTIFICATIONS',
    INCREMENT_NOTIFICATIONS = '[SaleOrderLine] INCREMENT_NOTIFICATIONS',
    DECREMENT_NOTIFICATIONS = '[SaleOrderLine] DECREMENT_NOTIFICATIONS',
    CLEAR_NOTIFICATIONS = '[SaleOrderLine] CLEAR_NOTIFICATIONS',

}


export class Add implements Action {
  readonly type =SaleOrderLineActionsType.ADD;
  constructor(public payload: ISaleOrderLine) { }
}

export class Update implements Action {
  readonly type =SaleOrderLineActionsType.UPDATE;
constructor(public payload: ISaleOrderLine) { }
}

export class AddUpdateSuccess implements Action {
  readonly type =SaleOrderLineActionsType.ADD;
// comes from effect
constructor(public payload: ISaleOrderLine) { }
}
export class AddUpdateFail implements Action {
  readonly type =SaleOrderLineActionsType.ADD_UPDATE_FAIL;
constructor(public payload: any) { }
}

export class Delete implements Action {
  readonly type =SaleOrderLineActionsType.DELETE;
constructor(public payload: ISaleOrderLine) { }
}

export class UpdateOffset implements Action {
  readonly type =SaleOrderLineActionsType.UPDATE_OFFSET;
constructor(public offset: number) { }
}
export class UpdateLimit implements Action {
  readonly type =SaleOrderLineActionsType.UPDATE_LIMIT;
constructor(public limit: number) { }

}


export class UpdateNotifications implements Action {

  readonly type = SaleOrderLineActionsType.UPDATE_NOTIFICATIONS;
  constructor(public payload: { notifications: number }) { }
}
export class IncrementNotifications implements Action {
  readonly type = SaleOrderLineActionsType.INCREMENT_NOTIFICATIONS;
}
export class DecrementNotifications implements Action {
  readonly type = SaleOrderLineActionsType.DECREMENT_NOTIFICATIONS;
}
export class ClearNotifications implements Action {
  readonly type = SaleOrderLineActionsType.CLEAR_NOTIFICATIONS;
}


export type SaleOrderLineActions =
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
