import { Action } from "@ngrx/store";
import { IProductTemplate} from "../../models/product-template";

// HTTP CRUD

//  CRUD
export enum ProductTemplateActionsType {
    ADD = "[ProductTemplate] ADD",
    UPDATE = "[ProductTemplate] UPDATE",
    ADD_UPDATE_SUCCESS = "[ProductTemplate] ADD_UPDATE_SUCCESS",
    ADD_UPDATE_FAIL = "[ProductTemplate] ADD_UPDATE_FAIL",

    DELETE = "[ProductTemplate] DELETE",
    DELETE_SUCCESS = "[ProductTemplate] DELETE_TRAINING_SUCCESS",
    DELETE_FAIL = "[ProductTemplate] DELETE_TRAINING_FAIL",
    UPDATE_OFFSET = '[ProductTemplate] Update Offset',
    UPDATE_LIMIT = '[ProductTemplate] Update Limit',
    UPDATE_NOTIFICATIONS = '[ProductTemplate] UPDATE_NOTIFICATIONS',
    INCREMENT_NOTIFICATIONS = '[ProductTemplate] INCREMENT_NOTIFICATIONS',
    DECREMENT_NOTIFICATIONS = '[ProductTemplate] DECREMENT_NOTIFICATIONS',
    CLEAR_NOTIFICATIONS = '[ProductTemplate] CLEAR_NOTIFICATIONS',
    CLEAR_SEARCH_DATA = '[ProductTemplate] CLEAR_SEARCH_DATA',
    UPDATE_SEARCH_VALUE = '[ProductTemplate] UPDATE_SEARCH_VALUE',

}


export class Add implements Action {
  readonly type =ProductTemplateActionsType.ADD;
  constructor(public payload: IProductTemplate) { }
}

export class Update implements Action {
  readonly type =ProductTemplateActionsType.UPDATE;
constructor(public payload: IProductTemplate) { }
}

export class AddUpdateSuccess implements Action {
  readonly type =ProductTemplateActionsType.ADD;
// comes from effect
constructor(public payload: IProductTemplate) { }
}
export class AddUpdateFail implements Action {
  readonly type =ProductTemplateActionsType.ADD_UPDATE_FAIL;
constructor(public payload: any) { }
}

export class Delete implements Action {
  readonly type =ProductTemplateActionsType.DELETE;
constructor(public payload: IProductTemplate) { }
}

export class UpdateOffset implements Action {
  readonly type =ProductTemplateActionsType.UPDATE_OFFSET;
constructor(public offset: number) { }
}
export class UpdateLimit implements Action {
  readonly type =ProductTemplateActionsType.UPDATE_LIMIT;
constructor(public limit: number) { }

}


export class UpdateNotifications implements Action {

  readonly type = ProductTemplateActionsType.UPDATE_NOTIFICATIONS;
  constructor(public payload: { notifications: number }) { }
}
export class IncrementNotifications implements Action {
  readonly type = ProductTemplateActionsType.INCREMENT_NOTIFICATIONS;
}
export class DecrementNotifications implements Action {
  readonly type = ProductTemplateActionsType.DECREMENT_NOTIFICATIONS;
}
export class ClearNotifications implements Action {
  readonly type = ProductTemplateActionsType.CLEAR_NOTIFICATIONS;
}


export class ClearSearchData implements Action {
  readonly type = ProductTemplateActionsType.CLEAR_SEARCH_DATA;
}
export class UpdateSearchValue implements Action {
  readonly type = ProductTemplateActionsType.UPDATE_SEARCH_VALUE;
  constructor(public payload: { search_value: string }) { }
}


export type ProductTemplateActions =
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
  | UpdateSearchValue
  | ClearSearchData
  ;
