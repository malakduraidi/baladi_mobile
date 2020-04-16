import * as fromProductTemplateActions from "../actions";
export function dbSwitch(action, state,productTemplateAdapter, initialState) {

  switch (action.type) {
    case fromProductTemplateActions.ProductTemplateDBActionsType.LOAD_DB_SUCCESS: {
      return productTemplateAdapter.addMany(action.payload, state);
    }
    case fromProductTemplateActions.ProductTemplateDBActionsType.ADD_UPDATE_DB_SUCCESS: {
      return productTemplateAdapter.upsertOne(
        { id: action.payload.id, changes: action.payload },
        state
      );
    }

    case fromProductTemplateActions.ProductTemplateDBActionsType.ADD_UPDATE_DB_FAIL: {
      return { ...state, syncing: false };
    }

    case fromProductTemplateActions.ProductTemplateDBActionsType.NEW_TABLE: {
      state = initialState;
      return state;
    }

    case fromProductTemplateActions.ProductTemplateDBActionsType.DELETE_DB_SUCCESS: {
      return productTemplateAdapter.removeOne(action.payload.id, state);
    }

    case fromProductTemplateActions.ProductTemplateDBActionsType.DELETE_MANY_DB_SUCCESS: {
      return productTemplateAdapter.removeMany(action.payload, state);
    }



    // default:
    //   return state;
  }
}
