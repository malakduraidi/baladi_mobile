import * as fromProductMainSliderActions from "../actions";

import {ProductMainSliderState, initialState,productMainSliderAdapter } from "../state/product-main-slider.state";
import { dbSwitch } from "./product-main-slider.db.switch";
import { httpSwitch } from "./product-main-slider.http.switch";
import { stateSwitch } from "./product-main-slider.switch";

export function ProductMainSliderReducer(
  state = initialState,
  action: fromProductMainSliderActions.ProductMainSliderDBActions
):ProductMainSliderState {

  let returned_state = undefined;
  returned_state = dbSwitch(action, state,productMainSliderAdapter, initialState);
  if (returned_state) return returned_state;
  returned_state = httpSwitch(action, state,productMainSliderAdapter, initialState);
  if (returned_state) return returned_state;

  returned_state = stateSwitch(action, state,productMainSliderAdapter, initialState);
  if (returned_state) return returned_state;


  return state;
}
