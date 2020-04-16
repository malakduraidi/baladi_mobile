import * as fromProductTemplateActions from "../actions";

import {ProductTemplateState, initialState,productTemplateAdapter } from "../state/product-template.state";
import { dbSwitch } from "./product-template.db.switch";
import { httpSwitch } from "./product-template.http.switch";
import { stateSwitch } from "./product-template.switch";

export function ProductTemplateReducer(
  state = initialState,
  action: fromProductTemplateActions.ProductTemplateDBActions
):ProductTemplateState {

  let returned_state = undefined;
  returned_state = dbSwitch(action, state,productTemplateAdapter, initialState);
  if (returned_state) return returned_state;
  returned_state = httpSwitch(action, state,productTemplateAdapter, initialState);
  if (returned_state) return returned_state;

  returned_state = stateSwitch(action, state,productTemplateAdapter, initialState);
  if (returned_state) return returned_state;


  return state;
}
