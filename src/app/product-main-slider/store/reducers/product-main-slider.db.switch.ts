import * as fromProductMainSliderActions from "../actions";
export function dbSwitch(action, state,productMainSliderAdapter, initialState) {

  switch (action.type) {
    case fromProductMainSliderActions.ProductMainSliderDBActionsType.LOAD_DB_SUCCESS: {
      return productMainSliderAdapter.addMany(action.payload, state);
    }
    case fromProductMainSliderActions.ProductMainSliderDBActionsType.ADD_UPDATE_DB_SUCCESS: {
      return productMainSliderAdapter.upsertOne(
        { id: action.payload.id, changes: action.payload },
        state
      );
    }

    case fromProductMainSliderActions.ProductMainSliderDBActionsType.ADD_UPDATE_DB_FAIL: {
      return { ...state, syncing: false };
    }

    case fromProductMainSliderActions.ProductMainSliderDBActionsType.NEW_TABLE: {
      state = initialState;
      return state;
    }

    case fromProductMainSliderActions.ProductMainSliderDBActionsType.DELETE_DB_SUCCESS: {
      return productMainSliderAdapter.removeOne(action.payload.id, state);
    }

    case fromProductMainSliderActions.ProductMainSliderDBActionsType.DELETE_MANY_DB_SUCCESS: {
      return productMainSliderAdapter.removeMany(action.payload, state);
    }



    // default:
    //   return state;
  }
}
