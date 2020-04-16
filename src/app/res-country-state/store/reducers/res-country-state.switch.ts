import * as fromResCountryStateActions from "../actions";
export function stateSwitch(action, state,resCountryStateAdapter, initialState) {

  switch (action.type) {
    case fromResCountryStateActions.ResCountryStateActionsType.DELETE: {
      return resCountryStateAdapter.removeOne(action.payload, state);
    }

 
    case fromResCountryStateActions.ResCountryStateActionsType.UPDATE_NOTIFICATIONS: {
      const notifications = state.notifications
      return { ...state, notifications };
    }

    case fromResCountryStateActions.ResCountryStateActionsType.INCREMENT_NOTIFICATIONS: {
      let notifications = state.notifications
      notifications++;
      return { ...state, notifications };
    }
    case fromResCountryStateActions.ResCountryStateActionsType.DECREMENT_NOTIFICATIONS: {
      let notifications = state.notifications
      notifications--;
      return { ...state, notifications };
    }
    case fromResCountryStateActions.ResCountryStateActionsType.CLEAR_NOTIFICATIONS: {
      const notifications = 0
      return { ...state, notifications };
    }

    // default:
    //   return state;
  }
}
