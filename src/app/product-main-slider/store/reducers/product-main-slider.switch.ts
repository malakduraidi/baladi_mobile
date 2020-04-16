import * as fromProductMainSliderActions from "../actions";
export function stateSwitch(action, state,productMainSliderAdapter, initialState) {

  switch (action.type) {
    case fromProductMainSliderActions.ProductMainSliderActionsType.DELETE: {
      return productMainSliderAdapter.removeOne(action.payload, state);
    }

 
    case fromProductMainSliderActions.ProductMainSliderActionsType.UPDATE_NOTIFICATIONS: {
      const notifications = state.notifications
      return { ...state, notifications };
    }

    case fromProductMainSliderActions.ProductMainSliderActionsType.INCREMENT_NOTIFICATIONS: {
      let notifications = state.notifications
      notifications++;
      return { ...state, notifications };
    }
    case fromProductMainSliderActions.ProductMainSliderActionsType.DECREMENT_NOTIFICATIONS: {
      let notifications = state.notifications
      notifications--;
      return { ...state, notifications };
    }
    case fromProductMainSliderActions.ProductMainSliderActionsType.CLEAR_NOTIFICATIONS: {
      const notifications = 0
      return { ...state, notifications };
    }

    // default:
    //   return state;
  }
}
