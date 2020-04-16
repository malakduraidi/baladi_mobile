import * as fromResCountryActions from "../actions";
export function stateSwitch(action, state,resCountryAdapter, initialState) {

  switch (action.type) {
    case fromResCountryActions.ResCountryActionsType.DELETE: {
      return resCountryAdapter.removeOne(action.payload, state);
    }

 
    case fromResCountryActions.ResCountryActionsType.UPDATE_NOTIFICATIONS: {
      const notifications = state.notifications
      return { ...state, notifications };
    }

    case fromResCountryActions.ResCountryActionsType.INCREMENT_NOTIFICATIONS: {
      let notifications = state.notifications
      notifications++;
      return { ...state, notifications };
    }
    case fromResCountryActions.ResCountryActionsType.DECREMENT_NOTIFICATIONS: {
      let notifications = state.notifications
      notifications--;
      return { ...state, notifications };
    }
    case fromResCountryActions.ResCountryActionsType.CLEAR_NOTIFICATIONS: {
      const notifications = 0
      return { ...state, notifications };
    }

    // default:
    //   return state;
  }
}
