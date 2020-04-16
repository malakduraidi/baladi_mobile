import * as fromResCountryStateActions from "../actions";

export function httpSwitch(action, state,resCountryStateAdapter, initialState) {
  switch (action.type) {
    // HTTP Actions
    case fromResCountryStateActions.ResCountryStateHTTPActionsType.LOAD_HTTP: {
      return {
        ...state,
        loading: true
      };
    }


  case fromResCountryStateActions.ResCountryStateHTTPActionsType.LOAD_HTTP_SUCCESS: {
    // TODO need to be reviewed  
    return { ...resCountryStateAdapter.upsertMany(action.payload, state), loading: false }
    }
    case fromResCountryStateActions.ResCountryStateHTTPActionsType.REFRESH_HTTP: {
      return {
        ...state,
        loading: true
      };
    }
    case fromResCountryStateActions.ResCountryStateHTTPActionsType.REFRESH_HTTP_SUCCESS: {
      // TODO need to be reviewed  
      return { ...resCountryStateAdapter.addAll(action.payload, state), loading: false }
    }

    case fromResCountryStateActions.ResCountryStateHTTPActionsType.ADD_UPDATE_HTTP_SUCCESS: {
      return {
        ...resCountryStateAdapter.upsertOne(action.payload.data, state), loading: false
      }
    }


    case fromResCountryStateActions.ResCountryStateHTTPActionsType.DELETE_HTTP_SUCCESS: {
      return {
        ...resCountryStateAdapter.removeOne(action.payload.id, state), loading: false
      }
    }


    case fromResCountryStateActions.ResCountryStateHTTPActionsType.LOAD_HTTP_FAIL: {
      return {
        ...state,
        loading: false,
        syncing: false
      };
    }


    case fromResCountryStateActions.ResCountryStateActionsType.UPDATE_OFFSET: {
      return {
        ...state,
        offset: action.offset
      };
    }

    case fromResCountryStateActions.ResCountryStateActionsType.UPDATE_LIMIT: {
      return {
        ...state,
        limit: action.limit
      };
    }



    case fromResCountryStateActions.ResCountryStateHTTPActionsType.DELETE_HTTP_SUCCESS: {
      return resCountryStateAdapter.removeOne(action.payload, state);
    }

    // case fromResCountryStateActions.ResCountryStateSyncActionsType
    //   .DELETE_SYNC_HTTP_SUCCESS: {
    //   returnresCountryStateAdapter.removeOne(action.payload, state);
    // }
    case fromResCountryStateActions.ResCountryStateHTTPActionsType.ADD_UPDATE_HTTP_SUCCESS: {
      return resCountryStateAdapter.addOne(action.payload, state)
    }

    // default:
    //   return state;
  }
}
