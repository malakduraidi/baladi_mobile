import * as fromProductCategoryActions from "../actions";
export function dbSwitch(action, state,productCategoryAdapter, initialState) {

  switch (action.type) {
    case fromProductCategoryActions.ProductCategoryDBActionsType.LOAD_DB_SUCCESS: {
      return productCategoryAdapter.addMany(action.payload, state);
    }
    case fromProductCategoryActions.ProductCategoryDBActionsType.ADD_UPDATE_DB_SUCCESS: {
      return productCategoryAdapter.upsertOne(
        { id: action.payload.id, changes: action.payload },
        state
      );
    }

    case fromProductCategoryActions.ProductCategoryDBActionsType.ADD_UPDATE_DB_FAIL: {
      return { ...state, syncing: false };
    }

    case fromProductCategoryActions.ProductCategoryDBActionsType.NEW_TABLE: {
      state = initialState;
      return state;
    }

    case fromProductCategoryActions.ProductCategoryDBActionsType.DELETE_DB_SUCCESS: {
      return productCategoryAdapter.removeOne(action.payload.id, state);
    }

    case fromProductCategoryActions.ProductCategoryDBActionsType.DELETE_MANY_DB_SUCCESS: {
      return productCategoryAdapter.removeMany(action.payload, state);
    }



    // default:
    //   return state;
  }
}
