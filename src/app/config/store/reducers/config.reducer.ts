import * as fromConfigActions from "../actions";

import {ConfigState, initialState,configAdapter } from "../state/config.state";
import { dbSwitch } from "./config.db.switch";
import { httpSwitch } from "./config.http.switch";
import { stateSwitch } from "./config.switch";

export function ConfigReducer(
  state = initialState,
  action: fromConfigActions.ConfigDBActions
):ConfigState {

  let returned_state = undefined;
  returned_state = dbSwitch(action, state,configAdapter, initialState);
  if (returned_state) return returned_state;
  returned_state = httpSwitch(action, state,configAdapter, initialState);
  if (returned_state) return returned_state;

  returned_state = stateSwitch(action, state,configAdapter, initialState);
  if (returned_state) return returned_state;


  return state;
}
