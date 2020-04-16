import * as fromProductMainSliderActions from "../actions";

export function httpSwitch(action, state,productMainSliderAdapter, initialState) {
  switch (action.type) {
    // HTTP Actions
    case fromProductMainSliderActions.ProductMainSliderHTTPActionsType.LOAD_HTTP: {
      return {
        ...state,
        loading: true
      };
    }


  case fromProductMainSliderActions.ProductMainSliderHTTPActionsType.LOAD_HTTP_SUCCESS: {
    // TODO need to be reviewed  
    return { ...productMainSliderAdapter.upsertMany(action.payload, state), loading: false }
  }

  case fromProductMainSliderActions.ProductMainSliderHTTPActionsType.REFRESH_HTTP_SUCCESS: {
    // TODO need to be reviewed  
    return { ...productMainSliderAdapter.addAll(action.payload, state), loading: false }
  }

    case fromProductMainSliderActions.ProductMainSliderHTTPActionsType.ADD_UPDATE_HTTP_SUCCESS: {
    return { ...productMainSliderAdapter.upsertOne(action.payload.data, state), loading: false
  }
}


    case fromProductMainSliderActions.ProductMainSliderHTTPActionsType.DELETE_HTTP_SUCCESS: {
  return { ...productMainSliderAdapter.removeOne(action.payload.id, state), loading: false
}
    }


    case fromProductMainSliderActions.ProductMainSliderHTTPActionsType.LOAD_HTTP_FAIL: {
  return {
    ...state,
    loading: false,
    syncing: false
  };
}


    case fromProductMainSliderActions.ProductMainSliderActionsType.UPDATE_OFFSET: {
  return {
    ...state,
    offset: action.offset
  };
}

    case fromProductMainSliderActions.ProductMainSliderActionsType.UPDATE_LIMIT: {
  return {
    ...state,
    limit: action.limit
  };
}



    case fromProductMainSliderActions.ProductMainSliderHTTPActionsType.DELETE_HTTP_SUCCESS: {
  return productMainSliderAdapter.removeOne(action.payload, state);
}

    // case fromProductMainSliderActions.ProductMainSliderSyncActionsType
    //   .DELETE_SYNC_HTTP_SUCCESS: {
    //   returnproductMainSliderAdapter.removeOne(action.payload, state);
    // }
    case fromProductMainSliderActions.ProductMainSliderHTTPActionsType.ADD_UPDATE_HTTP_SUCCESS: {
  return productMainSliderAdapter.addOne(action.payload, state)
}

    // default:
    //   return state;
  }
}
