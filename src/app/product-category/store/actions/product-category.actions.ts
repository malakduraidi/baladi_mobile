import { Action } from "@ngrx/store";
import { IProductCategory} from "../../models/product-category";

// HTTP CRUD

//  CRUD
export enum ProductCategoryActionsType {
    ADD = "[ProductCategory] ADD",
    UPDATE = "[ProductCategory] UPDATE",
    ADD_UPDATE_SUCCESS = "[ProductCategory] ADD_UPDATE_SUCCESS",
    ADD_UPDATE_FAIL = "[ProductCategory] ADD_UPDATE_FAIL",

    DELETE = "[ProductCategory] DELETE",
    DELETE_SUCCESS = "[ProductCategory] DELETE_TRAINING_SUCCESS",
    DELETE_FAIL = "[ProductCategory] DELETE_TRAINING_FAIL",
    UPDATE_OFFSET = '[ProductCategory] Update Offset',
    UPDATE_LIMIT = '[ProductCategory] Update Limit',
    UPDATE_NOTIFICATIONS = '[ProductCategory] UPDATE_NOTIFICATIONS',
    INCREMENT_NOTIFICATIONS = '[ProductCategory] INCREMENT_NOTIFICATIONS',
    DECREMENT_NOTIFICATIONS = '[ProductCategory] DECREMENT_NOTIFICATIONS',
    CLEAR_NOTIFICATIONS = '[ProductCategory] CLEAR_NOTIFICATIONS',

}


export class Add implements Action {
  readonly type =ProductCategoryActionsType.ADD;
  constructor(public payload: IProductCategory) { }
}

export class Update implements Action {
  readonly type =ProductCategoryActionsType.UPDATE;
constructor(public payload: IProductCategory) { }
}

export class AddUpdateSuccess implements Action {
  readonly type =ProductCategoryActionsType.ADD;
// comes from effect
constructor(public payload: IProductCategory) { }
}
export class AddUpdateFail implements Action {
  readonly type =ProductCategoryActionsType.ADD_UPDATE_FAIL;
constructor(public payload: any) { }
}

export class Delete implements Action {
  readonly type =ProductCategoryActionsType.DELETE;
constructor(public payload: IProductCategory) { }
}

export class UpdateOffset implements Action {
  readonly type =ProductCategoryActionsType.UPDATE_OFFSET;
constructor(public offset: number) { }
}
export class UpdateLimit implements Action {
  readonly type =ProductCategoryActionsType.UPDATE_LIMIT;
constructor(public limit: number) { }

}


export class UpdateNotifications implements Action {

  readonly type = ProductCategoryActionsType.UPDATE_NOTIFICATIONS;
  constructor(public payload: { notifications: number }) { }
}
export class IncrementNotifications implements Action {
  readonly type = ProductCategoryActionsType.INCREMENT_NOTIFICATIONS;
}
export class DecrementNotifications implements Action {
  readonly type = ProductCategoryActionsType.DECREMENT_NOTIFICATIONS;
}
export class ClearNotifications implements Action {
  readonly type = ProductCategoryActionsType.CLEAR_NOTIFICATIONS;
}


export type ProductCategoryActions =
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
