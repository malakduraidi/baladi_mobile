import { createFeatureSelector, createSelector } from "@ngrx/store";

import { SaleOrderState,saleOrderAdapter } from "../state/sale-order.state";

export const selectSaleOrderState = createFeatureSelector<SaleOrderState>("saleOrder");

export const getSaleOrderEntities = (state: SaleOrderState) => {
  state.entities;
};

export const getSaleOrderLoading = (state: SaleOrderState) => state.loading;

export const getNotifications = (state: SaleOrderState) => state.notifications;

export const getSaleOrderUploading = (state: SaleOrderState) => state.uploading;

const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal
} =saleOrderAdapter.getSelectors();

export const getSyncing = (state: SaleOrderState) => state.syncing;

export const selectAllIDS = createSelector(selectSaleOrderState, selectIds);
export const selectTotalRecords = createSelector(selectSaleOrderState, selectTotal);
export const selectAllData = createSelector(selectSaleOrderState, selectAll);
export const selectAllEntities = createSelector(
  selectSaleOrderState,
  selectEntities
);
export const selectTotalSaleOrder = createSelector(selectSaleOrderState, selectTotal);

export const selectSyncing = createSelector(selectSaleOrderState, getSyncing);

export const getById = id =>
  createSelector(selectAllEntities, customerEntities => customerEntities[id]);
export const getSaleOrderById = id =>
  createSelector(selectAllEntities,saleOrderEntities =>saleOrderEntities[id]);
export const getSaleOrderByName = name =>
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
    selectSaleOrderState,
    getNotifications
  );

  export const selectById = id =>
  createSelector(
    selectAllData,
    data => {return data.filter((record: any) => record.id == id)}
  );
export const getSaleOrderBySearchTerm = search_term =>
  createSelector(selectAllData,saleOrders => {
  if (!(!!search_term)) {
    return saleOrders;
  } else {
    var filtered_saleOrder=saleOrders.filter((saleOrder: any) => {
      if (saleOrder.name.includes(search_term)) {
        return true;
      } else return false;
    });
    return filtered_saleOrder;
  }
});