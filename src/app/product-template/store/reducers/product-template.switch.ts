import * as fromProductTemplateActions from "../actions";
export function stateSwitch(action, state,productTemplateAdapter, initialState) {

  switch (action.type) {
    case fromProductTemplateActions.ProductTemplateActionsType.DELETE: {
      return productTemplateAdapter.removeOne(action.payload, state);
    }

 
    case fromProductTemplateActions.ProductTemplateActionsType.UPDATE_NOTIFICATIONS: {
      const notifications = state.notifications
      return { ...state, notifications };
    }

    case fromProductTemplateActions.ProductTemplateActionsType.INCREMENT_NOTIFICATIONS: {
      let notifications = state.notifications
      notifications++;
      return { ...state, notifications };
    }
    case fromProductTemplateActions.ProductTemplateActionsType.DECREMENT_NOTIFICATIONS: {
      let notifications = state.notifications
      notifications--;
      return { ...state, notifications };
    }
    case fromProductTemplateActions.ProductTemplateActionsType.CLEAR_NOTIFICATIONS: {
      const notifications = 0
      return { ...state, notifications };
    }
    case fromProductTemplateActions.ProductTemplateActionsType.CLEAR_SEARCH_DATA: {
      const search_data = []
      return { ...state, search_data };
    }
    case fromProductTemplateActions.ProductTemplateActionsType.UPDATE_SEARCH_VALUE: {
      const search_value = action.payload.search_value
      return { ...state, search_value };
    }

    // default:
    //   return state;
  }
}
