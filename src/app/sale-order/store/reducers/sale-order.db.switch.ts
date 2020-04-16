import * as fromSaleOrderActions from "../actions";
export function dbSwitch(action, state,saleOrderAdapter, initialState) {

  switch (action.type) {
    case fromSaleOrderActions.SaleOrderDBActionsType.LOAD_DB_SUCCESS: {
      return saleOrderAdapter.addMany(action.payload, state);
    }
    case fromSaleOrderActions.SaleOrderDBActionsType.ADD_UPDATE_DB_SUCCESS: {
      return saleOrderAdapter.upsertOne(
        { id: action.payload.id, changes: action.payload },
        state
      );
    }

    case fromSaleOrderActions.SaleOrderDBActionsType.ADD_UPDATE_DB_FAIL: {
      return { ...state, syncing: false };
    }

    case fromSaleOrderActions.SaleOrderDBActionsType.NEW_TABLE: {
      state = initialState;
      return state;
    }

    case fromSaleOrderActions.SaleOrderDBActionsType.DELETE_DB_SUCCESS: {
      return saleOrderAdapter.removeOne(action.payload.id, state);
    }

    case fromSaleOrderActions.SaleOrderDBActionsType.DELETE_MANY_DB_SUCCESS: {
      return saleOrderAdapter.removeMany(action.payload, state);
    }



    // default:
    //   return state;
  }
}
