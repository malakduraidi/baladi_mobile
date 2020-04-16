import { createFeatureSelector, createSelector } from "@ngrx/store";

import { ProductMainSliderState,productMainSliderAdapter } from "../state/product-main-slider.state";

export const selectProductMainSliderState = createFeatureSelector<ProductMainSliderState>("productMainSlider");

export const getProductMainSliderEntities = (state: ProductMainSliderState) => {
  state.entities;
};

export const getProductMainSliderLoading = (state: ProductMainSliderState) => state.loading;

export const getNotifications = (state: ProductMainSliderState) => state.notifications;

export const getProductMainSliderUploading = (state: ProductMainSliderState) => state.uploading;

const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal
} =productMainSliderAdapter.getSelectors();

export const getSyncing = (state: ProductMainSliderState) => state.syncing;

export const selectAllIDS = createSelector(selectProductMainSliderState, selectIds);
export const selectTotalRecords = createSelector(selectProductMainSliderState, selectTotal);
export const selectAllData = createSelector(selectProductMainSliderState, selectAll);
export const selectAllEntities = createSelector(
  selectProductMainSliderState,
  selectEntities
);
export const selectTotalProductMainSlider = createSelector(selectProductMainSliderState, selectTotal);

export const selectSyncing = createSelector(selectProductMainSliderState, getSyncing);

export const getById = id =>
  createSelector(selectAllEntities, customerEntities => customerEntities[id]);
export const getProductMainSliderById = id =>
  createSelector(selectAllEntities,productMainSliderEntities =>productMainSliderEntities[id]);
export const getProductMainSliderByName = name =>
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
    selectProductMainSliderState,
    getNotifications
  );

  export const selectById = id =>
  createSelector(
    selectAllData,
    data => {return data.filter((record: any) => record.id == id)}
  );
export const getProductMainSliderBySearchTerm = search_term =>
  createSelector(selectAllData,productMainSliders => {
  if (!(!!search_term)) {
    return productMainSliders;
  } else {
    var filtered_productMainSlider=productMainSliders.filter((productMainSlider: any) => {
      if (productMainSlider.name.includes(search_term)) {
        return true;
      } else return false;
    });
    return filtered_productMainSlider;
  }
});