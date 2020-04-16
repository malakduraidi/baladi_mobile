import * as fromSettingActions from '../actions/app-setting.actions';
import { ISetting, IUserType } from '../../app-setting/models/app-setting';

export interface SettingState {
  settings: ISetting[];
  writeDate: string;
  is_logged: boolean;
  db_loaded: boolean;
  userType: IUserType;
  spinnerOnOff: boolean;
  show_admin_page: boolean;
}

export const initialState: SettingState = {
  settings: [],
  writeDate: null,
  spinnerOnOff: false,
  is_logged: null,
  db_loaded: false,
  userType: null,
  show_admin_page: false
};

export function SettingReducer(
  state = initialState,
  action: fromSettingActions.SettingActions
): SettingState {
  switch (action.type) {
    case fromSettingActions.SET_IS_LOGGED: {
      const is_logged = action.isLogged;
      return { ...state, is_logged };
    }
    case fromSettingActions.LOGIN_SUCCESS: {
      return { ...state, is_logged: true };
    }
    case fromSettingActions.LOGOUT_SUCCESS: {
      const settings = state.settings.slice();
      let userType = state.userType;
      if (settings && settings[0]) {
        // remove token,usertype,username,password

        // TODO later maybe onesignal
        settings[0].token = '';
        settings[0].username = '';
        settings[0].password = '';
        userType = null;
      }

      const is_logged = false;
      return { ...state, settings, userType, is_logged };
    }

    case fromSettingActions.ADD_UPDATE_SETTING_SUCCESS: {
      const settings = state.settings.slice();

      settings.push(action.payload);
      return { ...state, settings };
    }

    case fromSettingActions.LOAD_SETTING_SUCCESS: {
      const settings = action.payload;

      const db_loaded = true;
      return { ...state, settings, db_loaded };
    }

    case fromSettingActions.LOAD_SETTING_FAIL: {
      const db_loaded = false;
      return { ...state, db_loaded };
    }
    case fromSettingActions.SPINNER_ON_OFF: {
      const spinnerOnOff = action.on;
      return { ...state, spinnerOnOff };
    }

    case fromSettingActions.GET_USER_TYPE_HTTP_SUCCESS: {
      const userType = action.userType;
      return { ...state, userType, is_logged: true };
    }
    case fromSettingActions.UPDATE_COMANY_INFO_SUCCESS: {
      // get setting first row from teh state
      // update the rep_id in that
      const company_name = action.payload.company_name;
      const company_number = action.payload.company_number;
      const logo = action.payload.logo;
      const settings = state.settings.slice();
      if (settings && settings[0]) {
        settings[0].company_name = company_name;
        settings[0].company_number = company_number;
        settings[0].logo = logo;
      }

      return { ...state, settings };
    }
    case fromSettingActions.UPDATE_LANGUAGE_SUCCESS: {
      // get setting first row from teh state
      // update the rep_id in that
      const language = action.payload.language;
      const settings = state.settings.slice();
      if (settings && settings[0]) {
        settings[0].language = language;
      }

      return { ...state, settings };
    } // UPDATE_LANGUAGE_SUCCESS
    case fromSettingActions.UPDATE_FIRST_ROW_SUCCESS: {
      state.settings.push(action.payload);
      return state;
    }

    case fromSettingActions.UPDATE_WRITE_DATE_SUCCESS: {
      const writeDate = action.payload;
      return { ...state, writeDate };
    }

    case fromSettingActions.UPDATE_ONE_SIGNAL_DB_SUCCESS: {
      const settings = state.settings.slice();
      const userId = action.payload.one_signal_user_id;

      settings[0].one_signal_user_id = userId;

      settings[0].one_signal_push_token = action.payload.one_signal_push_token;

      settings[0].one_signal_last_update =
        action.payload.one_signal_last_update;

      settings[0].one_signal_is_dirty = action.payload.one_signal_is_dirty;

      return { ...state, settings };
    }

    case fromSettingActions.ONE_SIGNAL_NEW_UPDATE_DB_SUCCESS: {
      const settings = state.settings.slice();

      settings[0].one_signal_is_dirty = action.payload.one_signal_is_dirty;

      return { ...state, settings };
    }
    case fromSettingActions.UPDATE_LAST_SYNC: {
      const settings = state.settings.slice();
      settings[0].last_sync = action.payload;

      return { ...state, settings };
    }

    case fromSettingActions.UPDATE_CREDENTIAL_SUCCESS: {
      const username = action.payload.username;
      const password = action.payload.password;
      const uid = action.payload.uid;

      const settings = state.settings.slice();
      if (settings && settings[0]) {
        settings[0].username = username;
        settings[0].password = password;
        settings[0].uid = Number(uid);
      }

      return { ...state, settings };
    }

    case fromSettingActions.UPDATE_CONNECTION_TYPE: {
      const connection_type = action.payload;
      const settings = state.settings.slice();
      // TODO sometime settings[0].last_weather_update is undefined
      if (settings && settings[0]) {
        settings[0].connection_type = connection_type;
      }

      return { ...state, settings };
    }

    case fromSettingActions.UPDATE_CONNECTION_STATUS: {
      const connection_status = action.payload;
      const settings = state.settings.slice();
      // TODO sometime settings[0].last_weather_update is undefined
      if (settings && settings[0]) {
        settings[0].connection_status = connection_status;
      }

      return { ...state, settings };
    }

    case fromSettingActions.UPDATE_TOKEN_SUCCESS: {
      const token = action.payload;
      const settings = state.settings.slice();
      // TODO sometime settings[0].last_weather_update is undefined


      if (settings && settings[0]) {
        settings[0].token = token;
      }

      return { ...state, settings };
    }

    case fromSettingActions.SHOW_ADMIN_PAGE: {
      const show_admin_page = true;
      return { ...state, show_admin_page };
    }

    case fromSettingActions.HIDE_ADMIN_PAGE: {
      const show_admin_page = false;
      return { ...state, show_admin_page };
    }

    default: {
      return state;
    }
  }
}

export const getSettingData = (state: SettingState) => state.settings;
export const getIsLogged = (state: SettingState) => state.is_logged;
export const getDBLoaded = (state: SettingState) => state.db_loaded;
export const getSpinnerOnOff = (state: SettingState) => state.spinnerOnOff;
export const getUserType = (state: SettingState) => state.userType;
export const getToken = (state: SettingState) => {
  if (state.settings && state.settings[0]) {
    return state.settings[0].token;
  }
};
export const getOneSignalDirtyBit = (state: SettingState) => {
  if (state.settings && state.settings[0]) {
    return state.settings[0].one_signal_is_dirty;
  }
};

export const getConnectionType = (state: SettingState) => {
  if (state.settings && state.settings[0]) {
    return state.settings[0].connection_type;
  }
};

export const getConnectionStatus = (state: SettingState) => {
  if (state.settings && state.settings[0]) {
    return state.settings[0].connection_status;
  }
};
export const getShowAdminPage = (state: SettingState) => state.show_admin_page;
