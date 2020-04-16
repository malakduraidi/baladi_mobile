/*errortype
1 Get user type http fail
2 Authenticattion failur
3 Logout Fail
4 Unknown ( not catched error)
5 Registerd not success
6 load area error
7 update workflow status in order error
8  error adding order
9 error adding message
*/
import * as fromErrorActions from '../actions';

import { ErrorState, initialState, errorAdapter } from '../state/error.state';
import { IError } from '../../model';

export function ErrorReducer(state = initialState, action: any): ErrorState {
  switch (action.type) {

    case '[Chat] Send Message Http Fail': {
      const entity = state.entities[9];
      let repeated = 0;
      if (entity) {
        repeated = entity.repeated;
      }

      const error: IError = {
        id: '9',
        message: 'SEND_MESSAGE_ERROR',
        payload: action.error,
        model: 'chat',
        type: 'update_status',
        repeated: ++repeated
      };
      return errorAdapter.upsertOne(error, state);
    }



    case '[Order] Update Workflow Status Http Fail': {
      const entity = state.entities[7];
      let repeated = 0;
      if (entity) {
        repeated = entity.repeated;
      }

      const error: IError = {
        id: '7',
        message: 'UPDATE_ORDER_STATUS_FAILED',
        payload: action.error,
        model: 'order',
        type: 'update_status',
        repeated: ++repeated
      };
      return errorAdapter.upsertOne(error, state);
    }

    case '[APP_SETTING] Register Http Fail': {
      const entity = state.entities[7];
      let repeated = 0;
      if (entity) {
        repeated = entity.repeated;
      }
      const error: IError = {
        id: '5',
        message: 'REGISTRATION_WAS_NOT_SUCCESSFULL',
        payload: JSON.stringify(action.payload),
        model: 'app_setting',
        type: 'register',
        repeated: ++repeated
      };
      return errorAdapter.addOne(error, state);
    }
    case fromErrorActions.ErrorActionsType.ADD: {
      const entity = state.entities[7];
      let repeated = 0;
      if (entity) {
        repeated = entity.repeated;
      }
      const error: IError = {
        id: '4',
        message: 'Unknown Error - Contact Us',
        payload: JSON.stringify(action.payload),
        model: 'unknown',
        type: 'unknown',
        repeated: ++repeated
      };
      return errorAdapter.addOne(error, state);
    }
    case '[APP_SETTING] Authenticate Http Fail': {
      const entity = state.entities[2];
      let repeated = 0;
      if (entity) {
        repeated = entity.repeated;
      }
      const error: IError = {
        id: '2',
        message: 'Authenticate failur',
        payload: JSON.stringify(action.payload),
        model: 'app_setting',
        type: 'app_setting',
        repeated: ++repeated
      };
      return errorAdapter.upsertOne(error, state);
    }

    case '[APP_SETTING] Get User Type Http Fail': {
      const entity = state.entities[7];
      let repeated = 0;
      if (entity) {
        repeated = entity.repeated;
      }
      const error: IError = {
        id: '1',
        message: 'Getting User Type Error',
        payload: JSON.stringify(action.payload),
        model: 'app_setting',
        type: 'user_type',
        repeated: ++repeated
      };
      return errorAdapter.addOne(error, state);
    }

    case '[APP_SETTING] Logout Fail': {
      const entity = state.entities[7];
      let repeated = 0;
      if (entity) {
        repeated = entity.repeated;
      }

      const error: IError = {
        id: '3',
        message: 'Error logout',
        payload: JSON.stringify(action.payload),
        model: 'app_setting',
        type: 'logout',
        repeated: ++repeated
      };
      return errorAdapter.addOne(error, state);
    }
    case '[Area] Load Http Fail': {
      const entity = state.entities[7];
      let repeated = 0;
      if (entity) {
        repeated = entity.repeated;
      }

      const error: IError = {
        id: '6',
        message: 'Load Area Error',
        payload: JSON.stringify(action.payload),
        model: 'area',
        type: 'load_http',
        repeated: ++repeated
      };
      return errorAdapter.addOne(error, state);
    }
    case '[Area] Load Public Http Fail': {
      const entity = state.entities[7];
      let repeated = 0;
      if (entity) {
        repeated = entity.repeated;
      }

      const error: IError = {
        id: '6',
        message: 'Load Public Area Error',
        payload: JSON.stringify(action.payload),
        model: 'area',
        type: 'load_http',
        repeated: ++repeated
      };
      return errorAdapter.addOne(error, state);
    }

    case '[Order] Add Update Http Fail': {
      const entity = state.entities[8];
      let repeated = 0;
      if (entity) {
        repeated = entity.repeated;
      }

      const error: IError = {
        id: '8',
        message: 'ADD_ORDER_FAIL',
        payload: JSON.stringify(action.payload),
        model: 'order',
        type: 'add_http',
        repeated: ++repeated
      };
      return errorAdapter.addOne(error, state);
    }

    case '[APP_SETTING] Get User Type Http Success': {
      // should clear the state
      return errorAdapter.removeOne(1, state);
    }
    case '[Error] Clear User Type Error': {
      // should clear the state
      return errorAdapter.removeOne(1, state);
    }
  }
  return state;
}
