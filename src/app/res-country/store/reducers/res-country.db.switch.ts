import * as fromResCountryActions from "../actions";
export function dbSwitch(action, state,resCountryAdapter, initialState) {

  switch (action.type) {
    case fromResCountryActions.ResCountryDBActionsType.LOAD_DB_SUCCESS: {
      return resCountryAdapter.addMany(action.payload, state);
    }
    case fromResCountryActions.ResCountryDBActionsType.ADD_UPDATE_DB_SUCCESS: {
      return resCountryAdapter.upsertOne(
        { id: action.payload.id, changes: action.payload },
        state
      );
    }

    case fromResCountryActions.ResCountryDBActionsType.ADD_UPDATE_DB_FAIL: {
      return { ...state, syncing: false };
    }

    case fromResCountryActions.ResCountryDBActionsType.NEW_TABLE: {
      state = initialState;
      return state;
    }

    case fromResCountryActions.ResCountryDBActionsType.DELETE_DB_SUCCESS: {
      return resCountryAdapter.removeOne(action.payload.id, state);
    }

    case fromResCountryActions.ResCountryDBActionsType.DELETE_MANY_DB_SUCCESS: {
      return resCountryAdapter.removeMany(action.payload, state);
    }



    // default:
    //   return state;
  }
}
