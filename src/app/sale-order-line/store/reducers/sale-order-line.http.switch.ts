import * as fromSaleOrderLineActions from "../actions";

export function httpSwitch(action, state,saleOrderLineAdapter, initialState) {
  switch (action.type) {
    // HTTP Actions
    case fromSaleOrderLineActions.SaleOrderLineHTTPActionsType.LOAD_HTTP: {
      return {
        ...state,
        loading: true
      };
    }


  case fromSaleOrderLineActions.SaleOrderLineHTTPActionsType.LOAD_HTTP_SUCCESS: {
    // TODO need to be reviewed  
    return { ...saleOrderLineAdapter.upsertMany(action.payload, state), loading: false }
  }

  case fromSaleOrderLineActions.SaleOrderLineHTTPActionsType.REFRESH_HTTP_SUCCESS: {
    // TODO need to be reviewed  
    return { ...saleOrderLineAdapter.addAll(action.payload, state), loading: false }
  }

    case fromSaleOrderLineActions.SaleOrderLineHTTPActionsType.ADD_UPDATE_HTTP_SUCCESS: {
    return { ...saleOrderLineAdapter.upsertOne(action.payload.data, state), loading: false
  }
}


    case fromSaleOrderLineActions.SaleOrderLineHTTPActionsType.DELETE_HTTP_SUCCESS: {
  return { ...saleOrderLineAdapter.removeOne(action.payload.id, state), loading: false
}
    }


    case fromSaleOrderLineActions.SaleOrderLineHTTPActionsType.LOAD_HTTP_FAIL: {
  return {
    ...state,
    loading: false,
    syncing: false
  };
}


    case fromSaleOrderLineActions.SaleOrderLineActionsType.UPDATE_OFFSET: {
  return {
    ...state,
    offset: action.offset
  };
}

    case fromSaleOrderLineActions.SaleOrderLineActionsType.UPDATE_LIMIT: {
  return {
    ...state,
    limit: action.limit
  };
}



    case fromSaleOrderLineActions.SaleOrderLineHTTPActionsType.DELETE_HTTP_SUCCESS: {
  return saleOrderLineAdapter.removeOne(action.payload, state);
}

    // case fromSaleOrderLineActions.SaleOrderLineSyncActionsType
    //   .DELETE_SYNC_HTTP_SUCCESS: {
    //   returnsaleOrderLineAdapter.removeOne(action.payload, state);
    // }
    case fromSaleOrderLineActions.SaleOrderLineHTTPActionsType.ADD_UPDATE_HTTP_SUCCESS: {
  return saleOrderLineAdapter.addOne(action.payload, state)
}

    // default:
    //   return state;
  }
}
