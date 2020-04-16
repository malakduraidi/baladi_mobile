import { createFeatureSelector, createSelector } from "@ngrx/store";

import { ResCountryState,resCountryAdapter } from "../state/res-country.state";

export const selectResCountryState = createFeatureSelector<ResCountryState>("resCountry");

export const getResCountryEntities = (state: ResCountryState) => {
  state.entities;
};

export const getResCountryLoading = (state: ResCountryState) => state.loading;

export const getNotifications = (state: ResCountryState) => state.notifications;

export const getResCountryUploading = (state: ResCountryState) => state.uploading;

const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal
} =resCountryAdapter.getSelectors();

export const getSyncing = (state: ResCountryState) => state.syncing;

export const selectAllIDS = createSelector(selectResCountryState, selectIds);
export const selectTotalRecords = createSelector(selectResCountryState, selectTotal);
export const selectAllData = createSelector(selectResCountryState, selectAll);
export const selectAllEntities = createSelector(
  selectResCountryState,
  selectEntities
);
export const selectTotalResCountry = createSelector(selectResCountryState, selectTotal);

export const selectSyncing = createSelector(selectResCountryState, getSyncing);

export const getById = id =>
  createSelector(selectAllEntities, customerEntities => customerEntities[id]);
export const getResCountryById = id =>
  createSelector(selectAllEntities,resCountryEntities =>resCountryEntities[id]);
export const getResCountryByName = name =>
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
    selectResCountryState,
    getNotifications
  );

  export const selectById = id =>
  createSelector(
    selectAllData,
    data => {return data.filter((record: any) => record.id == id)}
  );
export const getResCountryBySearchTerm = search_term =>
  createSelector(selectAllData,resCountrys => {
  if (!(!!search_term)) {
    return resCountrys;
  } else {
    var filtered_resCountry=resCountrys.filter((resCountry: any) => {
      if (resCountry.name.includes(search_term)) {
        return true;
      } else return false;
    });
    return filtered_resCountry;
  }
});