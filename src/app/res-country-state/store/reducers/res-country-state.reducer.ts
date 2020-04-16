import * as fromResCountryStateActions from "../actions";

import {ResCountryStateState, initialState,resCountryStateAdapter } from "../state/res-country-state.state";
import { dbSwitch } from "./res-country-state.db.switch";
import { httpSwitch } from "./res-country-state.http.switch";
import { stateSwitch } from "./res-country-state.switch";

export function ResCountryStateReducer(
  state = initialState,
  action: fromResCountryStateActions.ResCountryStateDBActions
):ResCountryStateState {

  let returned_state = undefined;
  returned_state = dbSwitch(action, state,resCountryStateAdapter, initialState);
  if (returned_state) return returned_state;
  returned_state = httpSwitch(action, state,resCountryStateAdapter, initialState);
  if (returned_state) return returned_state;

  returned_state = stateSwitch(action, state,resCountryStateAdapter, initialState);
  if (returned_state) return returned_state;


  return state;
}
