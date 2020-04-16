import * as fromSaleOrderActions from "../actions";

import {SaleOrderState, initialState,saleOrderAdapter } from "../state/sale-order.state";
import { dbSwitch } from "./sale-order.db.switch";
import { httpSwitch } from "./sale-order.http.switch";
import { stateSwitch } from "./sale-order.switch";

export function SaleOrderReducer(
  state = initialState,
  action: fromSaleOrderActions.SaleOrderDBActions
):SaleOrderState {

  let returned_state = undefined;
  returned_state = dbSwitch(action, state,saleOrderAdapter, initialState);
  if (returned_state) return returned_state;
  returned_state = httpSwitch(action, state,saleOrderAdapter, initialState);
  if (returned_state) return returned_state;

  returned_state = stateSwitch(action, state,saleOrderAdapter, initialState);
  if (returned_state) return returned_state;


  return state;
}
