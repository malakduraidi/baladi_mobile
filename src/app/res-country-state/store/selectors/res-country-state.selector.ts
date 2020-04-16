import { createFeatureSelector, createSelector } from "@ngrx/store";

import { ResCountryStateState,resCountryStateAdapter } from "../state/res-country-state.state";

export const selectResCountryStateState = createFeatureSelector<ResCountryStateState>("resCountryState");

export const getResCountryStateEntities = (state: ResCountryStateState) => {
  state.entities;
};

export const getLoading = (state: ResCountryStateState) => state.loading;

export const getNotifications = (state: ResCountryStateState) => state.notifications;

export const getResCountryStateUploading = (state: ResCountryStateState) => state.uploading;

const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal
} =resCountryStateAdapter.getSelectors();

export const getSyncing = (state: ResCountryStateState) => state.syncing;

export const selectAllIDS = createSelector(selectResCountryStateState, selectIds);
export const selectTotalRecords = createSelector(selectResCountryStateState, selectTotal);
export const selectAllData = createSelector(selectResCountryStateState, selectAll);
export const selectLoading = createSelector(selectResCountryStateState, getLoading);
export const selectAllEntities = createSelector(
  selectResCountryStateState,
  selectEntities
);
export const selectTotalResCountryState = createSelector(selectResCountryStateState, selectTotal);

export const selectSyncing = createSelector(selectResCountryStateState, getSyncing);

export const getById = id =>
  createSelector(selectAllEntities, customerEntities => customerEntities[id]);
export const getResCountryStateById = id =>
  createSelector(selectAllEntities,resCountryStateEntities =>resCountryStateEntities[id]);
export const getResCountryStateByName = name =>
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
    selectResCountryStateState,
    getNotifications
  );

  export const selectById = id =>
  createSelector(
    selectAllData,
    data => {return data.filter((record: any) => record.id == id)}
  );
export const getResCountryStateBySearchTerm = search_term =>
  createSelector(selectAllData,resCountryStates => {
  if (!(!!search_term)) {
    return resCountryStates;
  } else {
    var filtered_resCountryState=resCountryStates.filter((resCountryState: any) => {
      if (resCountryState.name.includes(search_term)) {
        return true;
      } else return false;
    });
    return filtered_resCountryState;
  }
});