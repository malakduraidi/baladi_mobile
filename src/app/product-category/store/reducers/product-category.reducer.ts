import * as fromProductCategoryActions from "../actions";

import {ProductCategoryState, initialState,productCategoryAdapter } from "../state/product-category.state";
import { dbSwitch } from "./product-category.db.switch";
import { httpSwitch } from "./product-category.http.switch";
import { stateSwitch } from "./product-category.switch";

export function ProductCategoryReducer(
  state = initialState,
  action: fromProductCategoryActions.ProductCategoryDBActions
):ProductCategoryState {

  let returned_state = undefined;
  returned_state = dbSwitch(action, state,productCategoryAdapter, initialState);
  if (returned_state) return returned_state;
  returned_state = httpSwitch(action, state,productCategoryAdapter, initialState);
  if (returned_state) return returned_state;

  returned_state = stateSwitch(action, state,productCategoryAdapter, initialState);
  if (returned_state) return returned_state;


  return state;
}
