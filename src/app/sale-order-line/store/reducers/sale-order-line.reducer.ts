import * as fromSaleOrderLineActions from "../actions";

import {SaleOrderLineState, initialState,saleOrderLineAdapter } from "../state/sale-order-line.state";
import { dbSwitch } from "./sale-order-line.db.switch";
import { httpSwitch } from "./sale-order-line.http.switch";
import { stateSwitch } from "./sale-order-line.switch";

export function SaleOrderLineReducer(
  state = initialState,
  action: fromSaleOrderLineActions.SaleOrderLineDBActions
):SaleOrderLineState {

  let returned_state = undefined;
  returned_state = dbSwitch(action, state,saleOrderLineAdapter, initialState);
  if (returned_state) return returned_state;
  returned_state = httpSwitch(action, state,saleOrderLineAdapter, initialState);
  if (returned_state) return returned_state;

  returned_state = stateSwitch(action, state,saleOrderLineAdapter, initialState);
  if (returned_state) return returned_state;


  return state;
}
