import * as fromSaleOrderLineActions from "../actions";
export function stateSwitch(action, state,saleOrderLineAdapter, initialState) {

  switch (action.type) {
    case fromSaleOrderLineActions.SaleOrderLineActionsType.DELETE: {
      return saleOrderLineAdapter.removeOne(action.payload, state);
    }

 
    case fromSaleOrderLineActions.SaleOrderLineActionsType.UPDATE_NOTIFICATIONS: {
      const notifications = state.notifications
      return { ...state, notifications };
    }

    case fromSaleOrderLineActions.SaleOrderLineActionsType.INCREMENT_NOTIFICATIONS: {
      let notifications = state.notifications
      notifications++;
      return { ...state, notifications };
    }
    case fromSaleOrderLineActions.SaleOrderLineActionsType.DECREMENT_NOTIFICATIONS: {
      let notifications = state.notifications
      notifications--;
      return { ...state, notifications };
    }
    case fromSaleOrderLineActions.SaleOrderLineActionsType.CLEAR_NOTIFICATIONS: {
      const notifications = 0
      return { ...state, notifications };
    }

    // default:
    //   return state;
  }
}
