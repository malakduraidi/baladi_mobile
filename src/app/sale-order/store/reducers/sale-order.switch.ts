import * as fromSaleOrderActions from "../actions";
export function stateSwitch(action, state,saleOrderAdapter, initialState) {

  switch (action.type) {
    case fromSaleOrderActions.SaleOrderActionsType.DELETE: {
      return saleOrderAdapter.removeOne(action.payload, state);
    }

 
    case fromSaleOrderActions.SaleOrderActionsType.UPDATE_NOTIFICATIONS: {
      const notifications = state.notifications
      return { ...state, notifications };
    }

    case fromSaleOrderActions.SaleOrderActionsType.INCREMENT_NOTIFICATIONS: {
      let notifications = state.notifications
      notifications++;
      return { ...state, notifications };
    }
    case fromSaleOrderActions.SaleOrderActionsType.DECREMENT_NOTIFICATIONS: {
      let notifications = state.notifications
      notifications--;
      return { ...state, notifications };
    }
    case fromSaleOrderActions.SaleOrderActionsType.CLEAR_NOTIFICATIONS: {
      const notifications = 0
      return { ...state, notifications };
    }

    // default:
    //   return state;
  }
}
