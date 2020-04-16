import { createFeatureSelector, createSelector } from "@ngrx/store";

import { SaleOrderLineState,saleOrderLineAdapter } from "../state/sale-order-line.state";

export const selectSaleOrderLineState = createFeatureSelector<SaleOrderLineState>("saleOrderLine");

export const getSaleOrderLineEntities = (state: SaleOrderLineState) => {
  state.entities;
};

export const getSaleOrderLineLoading = (state: SaleOrderLineState) => state.loading;

export const getNotifications = (state: SaleOrderLineState) => state.notifications;

export const getSaleOrderLineUploading = (state: SaleOrderLineState) => state.uploading;
export const getCart = (state: SaleOrderLineState) => state.cart;

const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal
} =saleOrderLineAdapter.getSelectors();

export const getSyncing = (state: SaleOrderLineState) => state.syncing;

export const selectAllIDS = createSelector(selectSaleOrderLineState, selectIds);
export const selectTotalRecords = createSelector(selectSaleOrderLineState, selectTotal);
export const selectAllData = createSelector(selectSaleOrderLineState, selectAll);
export const selectAllEntities = createSelector(
  selectSaleOrderLineState,
  selectEntities
);
export const selectTotalSaleOrderLine = createSelector(selectSaleOrderLineState, selectTotal);

export const selectSyncing = createSelector(selectSaleOrderLineState, getSyncing);
export const selectAllDataCart = createSelector(selectSaleOrderLineState, getCart);

export const getById = id =>
  createSelector(selectAllEntities, customerEntities => customerEntities[id]);
export const getSaleOrderLineById = id =>
  createSelector(selectAllEntities,saleOrderLineEntities =>saleOrderLineEntities[id]);
export const getSaleOrderLineByName = name =>
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
    selectSaleOrderLineState,
    getNotifications
  );

  export const selectById = id =>
  createSelector(
    selectAllData,
    data => {return data.filter((record: any) => record.id == id)}
  );
export const getSaleOrderLineBySearchTerm = search_term =>
  createSelector(selectAllData,saleOrderLines => {
  if (!(!!search_term)) {
    return saleOrderLines;
  } else {
    var filtered_saleOrderLine=saleOrderLines.filter((saleOrderLine: any) => {
      if (saleOrderLine.name.includes(search_term)) {
        return true;
      } else return false;
    });
    return filtered_saleOrderLine;
  }
});


export const selectByProductIdOrderId = (product_id, order_id) =>
  createSelector(
    selectAllDataCart,
    data => { return data.filter((record: any) => record.product_id == product_id && record.order_id==order_id) }
  );