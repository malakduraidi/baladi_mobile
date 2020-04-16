import * as fromResCountryActions from "../actions";

export function httpSwitch(action, state,resCountryAdapter, initialState) {
  switch (action.type) {
    // HTTP Actions
    case fromResCountryActions.ResCountryHTTPActionsType.LOAD_HTTP: {
      return {
        ...state,
        loading: true
      };
    }


  case fromResCountryActions.ResCountryHTTPActionsType.LOAD_HTTP_SUCCESS: {
    // TODO need to be reviewed  
    return { ...resCountryAdapter.upsertMany(action.payload, state), loading: false }
  }

  case fromResCountryActions.ResCountryHTTPActionsType.REFRESH_HTTP_SUCCESS: {
    // TODO need to be reviewed  
    return { ...resCountryAdapter.addAll(action.payload, state), loading: false }
  }

    case fromResCountryActions.ResCountryHTTPActionsType.ADD_UPDATE_HTTP_SUCCESS: {
    return { ...resCountryAdapter.upsertOne(action.payload.data, state), loading: false
  }
}


    case fromResCountryActions.ResCountryHTTPActionsType.DELETE_HTTP_SUCCESS: {
  return { ...resCountryAdapter.removeOne(action.payload.id, state), loading: false
}
    }


    case fromResCountryActions.ResCountryHTTPActionsType.LOAD_HTTP_FAIL: {
  return {
    ...state,
    loading: false,
    syncing: false
  };
}


    case fromResCountryActions.ResCountryActionsType.UPDATE_OFFSET: {
  return {
    ...state,
    offset: action.offset
  };
}

    case fromResCountryActions.ResCountryActionsType.UPDATE_LIMIT: {
  return {
    ...state,
    limit: action.limit
  };
}



    case fromResCountryActions.ResCountryHTTPActionsType.DELETE_HTTP_SUCCESS: {
  return resCountryAdapter.removeOne(action.payload, state);
}

    // case fromResCountryActions.ResCountrySyncActionsType
    //   .DELETE_SYNC_HTTP_SUCCESS: {
    //   returnresCountryAdapter.removeOne(action.payload, state);
    // }
    case fromResCountryActions.ResCountryHTTPActionsType.ADD_UPDATE_HTTP_SUCCESS: {
  return resCountryAdapter.addOne(action.payload, state)
}

    // default:
    //   return state;
  }
}
