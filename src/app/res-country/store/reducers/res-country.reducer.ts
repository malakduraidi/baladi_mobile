import * as fromResCountryActions from "../actions";

import {ResCountryState, initialState,resCountryAdapter } from "../state/res-country.state";
import { dbSwitch } from "./res-country.db.switch";
import { httpSwitch } from "./res-country.http.switch";
import { stateSwitch } from "./res-country.switch";

export function ResCountryReducer(
  state = initialState,
  action: fromResCountryActions.ResCountryDBActions
):ResCountryState {

  let returned_state = undefined;
  returned_state = dbSwitch(action, state,resCountryAdapter, initialState);
  if (returned_state) return returned_state;
  returned_state = httpSwitch(action, state,resCountryAdapter, initialState);
  if (returned_state) return returned_state;

  returned_state = stateSwitch(action, state,resCountryAdapter, initialState);
  if (returned_state) return returned_state;


  return state;
}
