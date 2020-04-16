import { createSelector, createFeatureSelector } from '@ngrx/store';

import * as fromSettings from './app-setting.reducer';

export const reducers = fromSettings.SettingReducer;

export const getSettingState = createFeatureSelector<fromSettings.SettingState>(
  'app-settings'
);

export const getSettings = createSelector(
  getSettingState,
  fromSettings.getSettingData
);
export const selectIsLogged = createSelector(
  getSettingState,
  fromSettings.getIsLogged
);
export const selectToken = createSelector(
  getSettingState,
  fromSettings.getToken
);
export const selectDBLoaded = createSelector(
  getSettingState,
  fromSettings.getDBLoaded
);

export const selectSpinnerOnOff = createSelector(
  getSettingState,
  fromSettings.getSpinnerOnOff
);

export const selectUserType = createSelector(
  getSettingState,
  fromSettings.getUserType
);
export const selectShowAdminPage = createSelector(
  getSettingState,
  fromSettings.getShowAdminPage
);
export const selectOneSignalDirtyBit = createSelector(
  getSettingState,
  fromSettings.getOneSignalDirtyBit
);

export const getConnectionTypeSettings = createSelector(
  getSettingState,
  fromSettings.getConnectionType
);

export const getConnectionStatusSettings = createSelector(
  getSettingState,
  fromSettings.getConnectionStatus
);
