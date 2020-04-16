import * as fromConfigActions from "../actions";
export function stateSwitch(action, state,configAdapter, initialState) {

  switch (action.type) {
    case fromConfigActions.ConfigActionsType.DELETE: {
      return configAdapter.removeOne(action.payload, state);
    }

 
    case fromConfigActions.ConfigActionsType.UPDATE_NOTIFICATIONS: {
      const notifications = state.notifications
      return { ...state, notifications };
    }

    case fromConfigActions.ConfigActionsType.INCREMENT_NOTIFICATIONS: {
      let notifications = state.notifications
      notifications++;
      return { ...state, notifications };
    }
    case fromConfigActions.ConfigActionsType.DECREMENT_NOTIFICATIONS: {
      let notifications = state.notifications
      notifications--;
      return { ...state, notifications };
    }
    case fromConfigActions.ConfigActionsType.CLEAR_NOTIFICATIONS: {
      const notifications = 0
      return { ...state, notifications };
    }

    // default:
    //   return state;
  }
}
