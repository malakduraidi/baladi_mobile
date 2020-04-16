import * as fromResPartnerActions from "../actions";
export function stateSwitch(action, state,resPartnerAdapter, initialState) {

  switch (action.type) {
    case fromResPartnerActions.ResPartnerActionsType.DELETE: {
      return resPartnerAdapter.removeOne(action.payload, state);
    }

 
    case fromResPartnerActions.ResPartnerActionsType.UPDATE_NOTIFICATIONS: {
      const notifications = state.notifications
      return { ...state, notifications };
    }

    case fromResPartnerActions.ResPartnerActionsType.INCREMENT_NOTIFICATIONS: {
      let notifications = state.notifications
      notifications++;
      return { ...state, notifications };
    }
    case fromResPartnerActions.ResPartnerActionsType.DECREMENT_NOTIFICATIONS: {
      let notifications = state.notifications
      notifications--;
      return { ...state, notifications };
    }
    case fromResPartnerActions.ResPartnerActionsType.CLEAR_NOTIFICATIONS: {
      const notifications = 0
      return { ...state, notifications };
    }
    
    case fromResPartnerActions.ResPartnerActionsType.UPDATE_PUBLIC_PARTNER: {
      return { ...state, public_partner: action.payload };
    }
    // default:
    //   return state;
  }
}
