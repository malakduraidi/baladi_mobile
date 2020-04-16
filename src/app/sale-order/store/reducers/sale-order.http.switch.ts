import * as fromSaleOrderActions from "../actions";

export function httpSwitch(action, state,saleOrderAdapter, initialState) {
  switch (action.type) {
    // HTTP Actions
    case fromSaleOrderActions.SaleOrderHTTPActionsType.LOAD_HTTP: {
      return {
        ...state,
        loading: true
      };
    }


  case fromSaleOrderActions.SaleOrderHTTPActionsType.LOAD_HTTP_SUCCESS: {
    // TODO need to be reviewed  
    return { ...saleOrderAdapter.upsertMany(action.payload, state), loading: false }
  }

  case fromSaleOrderActions.SaleOrderHTTPActionsType.REFRESH_HTTP_SUCCESS: {
    // TODO need to be reviewed  
    return { ...saleOrderAdapter.addAll(action.payload, state), loading: false }
  }

    case fromSaleOrderActions.SaleOrderHTTPActionsType.ADD_UPDATE_HTTP_SUCCESS: {
    return { ...saleOrderAdapter.upsertOne(action.payload.data, state), loading: false
  }
}


    case fromSaleOrderActions.SaleOrderHTTPActionsType.DELETE_HTTP_SUCCESS: {
  return { ...saleOrderAdapter.removeOne(action.payload.id, state), loading: false
}
    }


    case fromSaleOrderActions.SaleOrderHTTPActionsType.LOAD_HTTP_FAIL: {
  return {
    ...state,
    loading: false,
    syncing: false
  };
}


    case fromSaleOrderActions.SaleOrderActionsType.UPDATE_OFFSET: {
  return {
    ...state,
    offset: action.offset
  };
}

    case fromSaleOrderActions.SaleOrderActionsType.UPDATE_LIMIT: {
  return {
    ...state,
    limit: action.limit
  };
}



    case fromSaleOrderActions.SaleOrderHTTPActionsType.DELETE_HTTP_SUCCESS: {
  return saleOrderAdapter.removeOne(action.payload, state);
}

    // case fromSaleOrderActions.SaleOrderSyncActionsType
    //   .DELETE_SYNC_HTTP_SUCCESS: {
    //   returnsaleOrderAdapter.removeOne(action.payload, state);
    // }
    case fromSaleOrderActions.SaleOrderHTTPActionsType.ADD_UPDATE_HTTP_SUCCESS: {
  return saleOrderAdapter.addOne(action.payload, state)
}

    // default:
    //   return state;
  }
}
