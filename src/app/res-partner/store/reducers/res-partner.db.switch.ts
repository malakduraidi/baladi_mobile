import * as fromResPartnerActions from "../actions";
export function dbSwitch(action, state,resPartnerAdapter, initialState) {

  switch (action.type) {
    case fromResPartnerActions.ResPartnerDBActionsType.LOAD_DB_SUCCESS: {
      return resPartnerAdapter.addMany(action.payload, state);
    }
    case fromResPartnerActions.ResPartnerDBActionsType.ADD_UPDATE_DB_SUCCESS: {
      return resPartnerAdapter.upsertOne(
        { id: action.payload.id, changes: action.payload },
        state
      );
    }

    case fromResPartnerActions.ResPartnerDBActionsType.ADD_MANY_DB_SUCCESS: {
      return {...resPartnerAdapter.upsertOne({id:action.payload.id,changes:action.payload},state),loggedUser : action.payload}
    }

    case fromResPartnerActions.ResPartnerDBActionsType.ADD_UPDATE_DB_FAIL: {
      return { ...state, syncing: false };
    }

    case fromResPartnerActions.ResPartnerDBActionsType.NEW_TABLE: {
      state = initialState;
      return state;
    }

    case fromResPartnerActions.ResPartnerDBActionsType.DELETE_DB_SUCCESS: {
      return resPartnerAdapter.removeOne(action.payload.id, state);
    }

    case fromResPartnerActions.ResPartnerDBActionsType.DELETE_MANY_DB_SUCCESS: {
      return resPartnerAdapter.removeMany(action.payload, state);
    }

    case fromResPartnerActions.ResPartnerDBActionsType.LOAD_LOGGED_USER_DB_SUCCESS: {
      return { ...state, loggedUser: action.payload };
    }


    // default:
    //   return state;
  }
}
