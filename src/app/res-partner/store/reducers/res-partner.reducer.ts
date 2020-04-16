import * as fromResPartnerActions from "../actions";

import {ResPartnerState, initialState,resPartnerAdapter } from "../state/res-partner.state";
import { dbSwitch } from "./res-partner.db.switch";
import { httpSwitch } from "./res-partner.http.switch";
import { stateSwitch } from "./res-partner.switch";

export function ResPartnerReducer(
  state = initialState,
  action: fromResPartnerActions.ResPartnerDBActions
):ResPartnerState {

  let returned_state = undefined;
  returned_state = dbSwitch(action, state,resPartnerAdapter, initialState);
  if (returned_state) return returned_state;
  returned_state = httpSwitch(action, state,resPartnerAdapter, initialState);
  if (returned_state) return returned_state;

  returned_state = stateSwitch(action, state,resPartnerAdapter, initialState);
  if (returned_state) return returned_state;


  return state;
}
