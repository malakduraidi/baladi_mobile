import * as fromConfigActions from "../actions";
export function dbSwitch(action, state,configAdapter, initialState) {

  switch (action.type) {

    case fromConfigActions.ConfigDBActionsType.LOAD_DB_SUCCESS: {
      return configAdapter.addMany(action.payload, state);
    }
    
    case fromConfigActions.ConfigDBActionsType.ADD_UPDATE_DB_SUCCESS: {
      return configAdapter.upsertOne(
        { id: action.payload.id, changes: action.payload },
        state
      );
    }

    case fromConfigActions.ConfigDBActionsType.ADD_UPDATE_DB_FAIL: {
      return { ...state, syncing: false };
    }

    case fromConfigActions.ConfigDBActionsType.NEW_TABLE: {
      state = initialState;
      return state;
    }

    case fromConfigActions.ConfigDBActionsType.DELETE_DB_SUCCESS: {
      return configAdapter.removeOne(action.payload.id, state);
    }

    case fromConfigActions.ConfigDBActionsType.DELETE_MANY_DB_SUCCESS: {
      return configAdapter.removeMany(action.payload, state);
    }
    
    // malak: used to store data in store in case of success store it in sql
    case fromConfigActions.ConfigDBActionsType.ADD_MANY_DB_SUCCESS: {
      return {...configAdapter.upsertOne({id:action.payload.id,changes:action.payload},state)}
    }

    // malak: used in case fail store data in sql
    case fromConfigActions.ConfigDBActionsType.ADD_MANY_DB_FAIL: {
      return {
        ...state}
    }

    // default:
    //   return state;
  }

}
