import * as fromResPartnerActions from "../actions";

export function httpSwitch(action, state,resPartnerAdapter, initialState) {
  switch (action.type) {
    // HTTP Actions
    case fromResPartnerActions.ResPartnerHTTPActionsType.LOAD_HTTP: {
      return {
        ...state,
        loading: true
      };
    }

    case fromResPartnerActions.ResPartnerHTTPActionsType.LOAD_HTTP_SUCCESS: {
      // TODO need to be reviewed  
      return { ...resPartnerAdapter.upsertMany(action.payload, state), loading: false }
    }

    case fromResPartnerActions.ResPartnerHTTPActionsType.REFRESH_HTTP_SUCCESS: {
      // TODO need to be reviewed  
      return { ...resPartnerAdapter.addAll(action.payload, state), loading: false }
    }

    case fromResPartnerActions.ResPartnerHTTPActionsType.ADD_UPDATE_HTTP_SUCCESS: {
      return { ...resPartnerAdapter.upsertOne(action.payload.data, state), loading: false}

    }

    case fromResPartnerActions.ResPartnerHTTPActionsType.DELETE_HTTP_SUCCESS: {
      return { ...resPartnerAdapter.removeOne(action.payload.id, state), loading: false}
    }

    case fromResPartnerActions.ResPartnerHTTPActionsType.LOAD_HTTP_FAIL: {
      return {
        ...state,
        loading: false,
        syncing: false
      };
    }

    case fromResPartnerActions.ResPartnerActionsType.UPDATE_OFFSET: {
      return {
        ...state,
        offset: action.offset
      };
    }

    case fromResPartnerActions.ResPartnerActionsType.UPDATE_LIMIT: {
      return {
        ...state,
        limit: action.limit
      };
    }

    case fromResPartnerActions.ResPartnerHTTPActionsType.DELETE_HTTP_SUCCESS: {
      return resPartnerAdapter.removeOne(action.payload, state);
    }

    case fromResPartnerActions.ResPartnerHTTPActionsType.ADD_UPDATE_HTTP_SUCCESS: {
      return resPartnerAdapter.addOne(action.payload, state)
    }
    
    // malak: used when login user in odoo db
    case fromResPartnerActions.ResPartnerHTTPActionsType.AUTHENTICATE_HTTP: {
       return { ...state,loading:true}
    }
    // malak: used when success login user from odoo db
    case fromResPartnerActions.ResPartnerHTTPActionsType.AUTHENTICATE_HTTP_SUCCESS: {
      return { ...state,loading:false}
    }
    // malak: used when fail login user in odoo db
    case fromResPartnerActions.ResPartnerHTTPActionsType.AUTHENTICATE_HTTP_FAIL: {
      return { ...state,loading:false}
    }

    // malak: used to register new user in odoo db
    case fromResPartnerActions.ResPartnerHTTPActionsType.REGISTER_HTTP: {
      return { ...state,loading:true}
    }
    // malak: used when success register new user in odoo db so we need to add it in store
    case fromResPartnerActions.ResPartnerHTTPActionsType.REGISTER_HTTP_SUCCESS: {  ;
      return {...resPartnerAdapter.upsertOne({id:action.payload.id,changes:action.payload},state),loading:false}
    }
    // malak: used when fail register new user in odoo db
    case fromResPartnerActions.ResPartnerHTTPActionsType.REGISTER_HTTP_FAIL: {
      return { ...state,loading:false}
    }

    // malak: used to return logged user shipping addresses from odoo db
    case fromResPartnerActions.ResPartnerHTTPActionsType.LOAD_SHIPPING_ADDRESS_HTTP: {
      return { ...state,loading:true}
    }
    // malak: used in case success of return logged user shipping addresses from odoo db
    case fromResPartnerActions.ResPartnerHTTPActionsType.LOAD_SHIPPING_ADDRESS_HTTP_SUCCESS: { 
      return {...resPartnerAdapter.upsertMany(action.payload,state),loading:false}
    }
    // malak: used in case fail of return logged user shipping addresses from odoo db
    case fromResPartnerActions.ResPartnerHTTPActionsType.LOAD_SHIPPING_ADDRESS_HTTP_FAIL: {
      return { ...state,loading:false}
    }

    // malak: used to add user shipping addresses from odoo db
    case fromResPartnerActions.ResPartnerHTTPActionsType.ADD_PARTNER_HTTP: {
      return { ...state,loading:true}
    }
    // malak: used in case success to add logged user shipping addresses from odoo db
    case fromResPartnerActions.ResPartnerHTTPActionsType.ADD_PARTNER_HTTP_SUCCESS: { 
      return { ...resPartnerAdapter.upsertOne(action.payload, state), loading: false}
    }
    // malak: used in case fail of add logged user shipping addresses from odoo db
    case fromResPartnerActions.ResPartnerHTTPActionsType.ADD_PARTNER_HTTP_FAIL: {
      return { ...state,loading:false}
    }

    // malak: used to update logged user shipping addresses from odoo db
    case fromResPartnerActions.ResPartnerHTTPActionsType.UPDTAE_PARTNER_HTTP: {
      return { ...state,loading:true}
    }
    // malak: used in case success to update logged user shipping addresses from odoo db
    case fromResPartnerActions.ResPartnerHTTPActionsType.UPDTAE_PARTNER_HTTP_SUCCESS: { 
      return { ...resPartnerAdapter.upsertOne(action.payload,state),loading:false}
    }
    // malak: used in case fail to update logged user shipping addresses from odoo db
    case fromResPartnerActions.ResPartnerHTTPActionsType.UPDTAE_PARTNER_HTTP_FAIL: {
      return { ...state,loading:false}
    }
    
    // malak: used when logout success so we need to return state to its initial state
    case fromResPartnerActions.ResPartnerHTTPActionsType.LOGOUT_SUCCESS: {
      return initialState
    }
    
    // default:
    //   return state;
  
  }

}
