import * as fromResCountryStateActions from "../actions";
export function dbSwitch(action, state,resCountryStateAdapter, initialState) {

  switch (action.type) {
    case fromResCountryStateActions.ResCountryStateDBActionsType.LOAD_DB_SUCCESS: {
      return resCountryStateAdapter.addMany(action.payload, state);
    }
    case fromResCountryStateActions.ResCountryStateDBActionsType.ADD_UPDATE_DB_SUCCESS: {
      return resCountryStateAdapter.upsertOne(
        { id: action.payload.id, changes: action.payload },
        state
      );
    }

    case fromResCountryStateActions.ResCountryStateDBActionsType.ADD_UPDATE_DB_FAIL: {
      return { ...state, syncing: false };
    }

    case fromResCountryStateActions.ResCountryStateDBActionsType.NEW_TABLE: {
      state = initialState;
      return state;
    }

    case fromResCountryStateActions.ResCountryStateDBActionsType.DELETE_DB_SUCCESS: {
      return resCountryStateAdapter.removeOne(action.payload.id, state);
    }

    case fromResCountryStateActions.ResCountryStateDBActionsType.DELETE_MANY_DB_SUCCESS: {
      return resCountryStateAdapter.removeMany(action.payload, state);
    }



    // default:
    //   return state;
  }
}
