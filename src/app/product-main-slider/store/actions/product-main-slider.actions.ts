import { Action } from "@ngrx/store";
import { IProductMainSlider} from "../../models/product-main-slider";

// HTTP CRUD

//  CRUD
export enum ProductMainSliderActionsType {
    ADD = "[ProductMainSlider] ADD",
    UPDATE = "[ProductMainSlider] UPDATE",
    ADD_UPDATE_SUCCESS = "[ProductMainSlider] ADD_UPDATE_SUCCESS",
    ADD_UPDATE_FAIL = "[ProductMainSlider] ADD_UPDATE_FAIL",

    DELETE = "[ProductMainSlider] DELETE",
    DELETE_SUCCESS = "[ProductMainSlider] DELETE_TRAINING_SUCCESS",
    DELETE_FAIL = "[ProductMainSlider] DELETE_TRAINING_FAIL",
    UPDATE_OFFSET = '[ProductMainSlider] Update Offset',
    UPDATE_LIMIT = '[ProductMainSlider] Update Limit',
    UPDATE_NOTIFICATIONS = '[ProductMainSlider] UPDATE_NOTIFICATIONS',
    INCREMENT_NOTIFICATIONS = '[ProductMainSlider] INCREMENT_NOTIFICATIONS',
    DECREMENT_NOTIFICATIONS = '[ProductMainSlider] DECREMENT_NOTIFICATIONS',
    CLEAR_NOTIFICATIONS = '[ProductMainSlider] CLEAR_NOTIFICATIONS',

}


export class Add implements Action {
  readonly type =ProductMainSliderActionsType.ADD;
  constructor(public payload: IProductMainSlider) { }
}

export class Update implements Action {
  readonly type =ProductMainSliderActionsType.UPDATE;
constructor(public payload: IProductMainSlider) { }
}

export class AddUpdateSuccess implements Action {
  readonly type =ProductMainSliderActionsType.ADD;
// comes from effect
constructor(public payload: IProductMainSlider) { }
}
export class AddUpdateFail implements Action {
  readonly type =ProductMainSliderActionsType.ADD_UPDATE_FAIL;
constructor(public payload: any) { }
}

export class Delete implements Action {
  readonly type =ProductMainSliderActionsType.DELETE;
constructor(public payload: IProductMainSlider) { }
}

export class UpdateOffset implements Action {
  readonly type =ProductMainSliderActionsType.UPDATE_OFFSET;
constructor(public offset: number) { }
}
export class UpdateLimit implements Action {
  readonly type =ProductMainSliderActionsType.UPDATE_LIMIT;
constructor(public limit: number) { }

}


export class UpdateNotifications implements Action {

  readonly type = ProductMainSliderActionsType.UPDATE_NOTIFICATIONS;
  constructor(public payload: { notifications: number }) { }
}
export class IncrementNotifications implements Action {
  readonly type = ProductMainSliderActionsType.INCREMENT_NOTIFICATIONS;
}
export class DecrementNotifications implements Action {
  readonly type = ProductMainSliderActionsType.DECREMENT_NOTIFICATIONS;
}
export class ClearNotifications implements Action {
  readonly type = ProductMainSliderActionsType.CLEAR_NOTIFICATIONS;
}


export type ProductMainSliderActions =
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
