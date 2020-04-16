import * as fromSaleOrderLineActions from "../actions";
export function dbSwitch(action, state,saleOrderLineAdapter, initialState) {

  switch (action.type) {
    case fromSaleOrderLineActions.SaleOrderLineDBActionsType.LOAD_DB_SUCCESS: {
      return saleOrderLineAdapter.addMany(action.payload, state);
    }
    case fromSaleOrderLineActions.SaleOrderLineDBActionsType.ADD_UPDATE_DB_SUCCESS: {
      return saleOrderLineAdapter.upsertOne(
        { id: action.payload.id, changes: action.payload },
        state
      );
    }

    case fromSaleOrderLineActions.SaleOrderLineDBActionsType.ADD_UPDATE_DB_FAIL: {
      return { ...state, syncing: false };
    }

    case fromSaleOrderLineActions.SaleOrderLineDBActionsType.NEW_TABLE: {
      state = initialState;
      return state;
    }

    case fromSaleOrderLineActions.SaleOrderLineDBActionsType.DELETE_DB_SUCCESS: {
      return saleOrderLineAdapter.removeOne(action.payload.id, state);
    }

    case fromSaleOrderLineActions.SaleOrderLineDBActionsType.DELETE_MANY_DB_SUCCESS: {
      return saleOrderLineAdapter.removeMany(action.payload, state);
    }
    case fromSaleOrderLineActions.SaleOrderLineDBActionsType.ADD_TO_CART_DB_SUCCESS: {
      let cart=state.cart.slice()
      cart.push(action.payload)
      return {...state,cart}

    }
    case fromSaleOrderLineActions.SaleOrderLineDBActionsType.UPDATE_TO_CART_DB_SUCCESS: {
      let cart=state.cart.slice()
      const newCart=cart.map(rec=>(rec.product_id==action.payload.product_id)?action.payload:rec )
      return {...state,cart:newCart}
    }
    case fromSaleOrderLineActions.SaleOrderLineDBActionsType.REMOVE_FROM_CART_DB_SUCCESS: {
      let cart=state.cart.slice()
      const filteredCart=cart.filter(rec=>rec['product_id']!=action.payload.product_id)
      return {...state,cart:filteredCart}
    }

    case fromSaleOrderLineActions.SaleOrderLineDBActionsType.LOAD_CART_DB_SUCCESS: {
      return {...state,cart:action.payload.slice()}
    }



    // default:
    //   return state;
  }
}
