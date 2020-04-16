import * as fromProductCategoryActions from "../actions";
export function stateSwitch(action, state,productCategoryAdapter, initialState) {

  switch (action.type) {
    case fromProductCategoryActions.ProductCategoryActionsType.DELETE: {
      return productCategoryAdapter.removeOne(action.payload, state);
    }

 
    case fromProductCategoryActions.ProductCategoryActionsType.UPDATE_NOTIFICATIONS: {
      const notifications = state.notifications
      return { ...state, notifications };
    }

    case fromProductCategoryActions.ProductCategoryActionsType.INCREMENT_NOTIFICATIONS: {
      let notifications = state.notifications
      notifications++;
      return { ...state, notifications };
    }
    case fromProductCategoryActions.ProductCategoryActionsType.DECREMENT_NOTIFICATIONS: {
      let notifications = state.notifications
      notifications--;
      return { ...state, notifications };
    }
    case fromProductCategoryActions.ProductCategoryActionsType.CLEAR_NOTIFICATIONS: {
      const notifications = 0
      return { ...state, notifications };
    }

    // default:
    //   return state;
  }
}
