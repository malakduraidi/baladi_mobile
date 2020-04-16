import { Action } from "@ngrx/store";
import { IResPartner} from "../../models/res-partner";

// HTTP CRUD

//  CRUD
export enum ResPartnerActionsType {
    ADD = "[ResPartner] ADD",
    UPDATE = "[ResPartner] UPDATE",
    ADD_UPDATE_SUCCESS = "[ResPartner] ADD_UPDATE_SUCCESS",
    ADD_UPDATE_FAIL = "[ResPartner] ADD_UPDATE_FAIL",

    DELETE = "[ResPartner] DELETE",
    DELETE_SUCCESS = "[ResPartner] DELETE_TRAINING_SUCCESS",
    DELETE_FAIL = "[ResPartner] DELETE_TRAINING_FAIL",
    UPDATE_OFFSET = '[ResPartner] Update Offset',
    UPDATE_LIMIT = '[ResPartner] Update Limit',
    UPDATE_NOTIFICATIONS = '[ResPartner] UPDATE_NOTIFICATIONS',
    INCREMENT_NOTIFICATIONS = '[ResPartner] INCREMENT_NOTIFICATIONS',
    DECREMENT_NOTIFICATIONS = '[ResPartner] DECREMENT_NOTIFICATIONS',
    CLEAR_NOTIFICATIONS = '[ResPartner] CLEAR_NOTIFICATIONS',

    UPDATE_PUBLIC_PARTNER = "[ResPartner] UPDATE_PUBLIC_PARTNER",
}


export class Add implements Action {
  readonly type =ResPartnerActionsType.ADD;
  constructor(public payload: IResPartner) { }
}

export class Update implements Action {
  readonly type =ResPartnerActionsType.UPDATE;
constructor(public payload: IResPartner) { }
}

export class AddUpdateSuccess implements Action {
  readonly type =ResPartnerActionsType.ADD;
// comes from effect
constructor(public payload: IResPartner) { }
}
export class AddUpdateFail implements Action {
  readonly type =ResPartnerActionsType.ADD_UPDATE_FAIL;
constructor(public payload: any) { }
}

export class Delete implements Action {
  readonly type =ResPartnerActionsType.DELETE;
constructor(public payload: IResPartner) { }
}

export class UpdateOffset implements Action {
  readonly type =ResPartnerActionsType.UPDATE_OFFSET;
constructor(public offset: number) { }
}
export class UpdateLimit implements Action {
  readonly type =ResPartnerActionsType.UPDATE_LIMIT;
constructor(public limit: number) { }

}


export class UpdateNotifications implements Action {

  readonly type = ResPartnerActionsType.UPDATE_NOTIFICATIONS;
  constructor(public payload: { notifications: number }) { }
}
export class IncrementNotifications implements Action {
  readonly type = ResPartnerActionsType.INCREMENT_NOTIFICATIONS;
}
export class DecrementNotifications implements Action {
  readonly type = ResPartnerActionsType.DECREMENT_NOTIFICATIONS;
}
export class ClearNotifications implements Action {
  readonly type = ResPartnerActionsType.CLEAR_NOTIFICATIONS;
}





export class UpdatePublicPartner implements Action {
  readonly type =ResPartnerActionsType.UPDATE_PUBLIC_PARTNER;
  constructor(public payload: IResPartner) {}
}


export type ResPartnerActions =
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
  | ClearNotifications
  | UpdatePublicPartner

