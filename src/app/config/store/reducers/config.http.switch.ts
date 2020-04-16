import * as fromConfigActions from "../actions";

export function httpSwitch(action, state,configAdapter, initialState) {
  switch (action.type) {
    // HTTP Actions
    
    // malak: used in case load data from odoo db
    case fromConfigActions.ConfigHTTPActionsType.LOAD_HTTP: {
      return {
        ...state,
        loading: true
      };
    }
    
    // malak: used in case success of return data from odoo db
    case fromConfigActions.ConfigHTTPActionsType.LOAD_HTTP_SUCCESS: {
      return { 
        ...state, 
        loading: false }
      // configAdapter.upsertMany(action.payload, state),
    }

    // malak: used in case fail of return data from odoo db
    case fromConfigActions.ConfigHTTPActionsType.LOAD_HTTP_FAIL: {
      return {
        ...state,
        loading: false};
    }

    case fromConfigActions.ConfigHTTPActionsType.REFRESH_HTTP_SUCCESS: {
      return { ...configAdapter.addAll(action.payload, state), loading: false }
    }

    case fromConfigActions.ConfigHTTPActionsType.ADD_UPDATE_HTTP_SUCCESS: {
      return { ...configAdapter.upsertOne(action.payload.data, state), loading: false }
    }

    case fromConfigActions.ConfigHTTPActionsType.DELETE_HTTP_SUCCESS: {
      return { ...configAdapter.removeOne(action.payload.id, state), loading: false}
    }

    case fromConfigActions.ConfigActionsType.UPDATE_OFFSET: {
      return {
        ...state,
        offset: action.offset
      };
    }

    case fromConfigActions.ConfigActionsType.UPDATE_LIMIT: {
      return {
        ...state,
        limit: action.limit};
    }

    case fromConfigActions.ConfigHTTPActionsType.DELETE_HTTP_SUCCESS: {
      return configAdapter.removeOne(action.payload, state);
    }

    // case fromConfigActions.ConfigSyncActionsType
    //   .DELETE_SYNC_HTTP_SUCCESS: {
    //   returnconfigAdapter.removeOne(action.payload, state);
    // }
    case fromConfigActions.ConfigHTTPActionsType.ADD_UPDATE_HTTP_SUCCESS: {
  return configAdapter.addOne(action.payload, state)
}

    // default:
    //   return state;
  }
}
