import { createFeatureSelector, createSelector } from "@ngrx/store";

import { ConfigState,configAdapter } from "../state/config.state";

export const selectConfigState = createFeatureSelector<ConfigState>("config");

export const getConfigEntities = (state: ConfigState) => {
  state.entities;
};

export const getConfigLoading = (state: ConfigState) => state.loading;

export const getNotifications = (state: ConfigState) => state.notifications;

export const getConfigUploading = (state: ConfigState) => state.uploading;

const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal
} =configAdapter.getSelectors();

export const getSyncing = (state: ConfigState) => state.syncing;

export const selectAllIDS = createSelector(selectConfigState, selectIds);
export const selectTotalRecords = createSelector(selectConfigState, selectTotal);
export const selectAllData = createSelector(selectConfigState, selectAll);
export const selectAllEntities = createSelector(
  selectConfigState,
  selectEntities
);
export const selectTotalConfig = createSelector(selectConfigState, selectTotal);

export const selectSyncing = createSelector(selectConfigState, getSyncing);

export const getById = id =>
  createSelector(selectAllEntities, customerEntities => customerEntities[id]);
export const getConfigById = id =>
  createSelector(selectAllEntities,configEntities =>configEntities[id]);
export const getConfigByName = name =>
  createSelector(selectAllData, entities =>
    entities.filter((entity: any) => {
      if (entity.name.includes(name)) return entity.id;
    })
  );

export const selectIDByServerID = server_id =>
  createSelector(
    selectAllData,
    data => data.filter((record: any) => record.server_id == server_id)[0].id
  );

export const selectByServerId = server_id =>
  createSelector(
    selectAllData,
    // customerEntities => customerEntities[id]
    data => data.filter((record: any) => record.server_id == server_id)
  );


  export const selectNotifications = createSelector(
    selectConfigState,
    getNotifications
  );

  export const selectById = id =>
  createSelector(
    selectAllData,
    data => {return data.filter((record: any) => record.id == id)}
  );
export const getConfigBySearchTerm = search_term =>
  createSelector(selectAllData,configs => {
  if (!(!!search_term)) {
    return configs;
  } else {
    var filtered_config=configs.filter((config: any) => {
      if (config.name.includes(search_term)) {
        return true;
      } else return false;
    });
    return filtered_config;
  }
});