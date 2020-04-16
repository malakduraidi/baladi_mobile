import { createFeatureSelector, createSelector } from '@ngrx/store';

import { ErrorState, errorAdapter } from '../state/error.state';

export const selectErrorState = createFeatureSelector<ErrorState>('error');

export const getErrorEntities = (state: ErrorState) => {
  // tslint:disable-next-line:no-unused-expression
  state.entities;
};

export const getErrorLoading = (state: ErrorState) => state.loading;

export const getErrorUploading = (state: ErrorState) => state.uploading;
export const getOffset = (state: ErrorState) => state.offset;
export const getLimit = (state: ErrorState) => state.limit;
export const getDataLength = (state: ErrorState) => state.dataLength;

const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal
} = errorAdapter.getSelectors();

export const selectAllIDS = createSelector(
  selectErrorState,
  selectIds
);

export const selectAllData = createSelector(
  selectErrorState,
  selectAll
);

export const selectAllEntities = createSelector(
  selectErrorState,
  selectEntities
);

export const selectOffset = createSelector(
  selectErrorState,
  getOffset
);
export const selectDataLength = createSelector(
  selectErrorState,
  getDataLength
);

export const selectLimit = createSelector(
  selectErrorState,
  getLimit
);

export const selectDataErroredById = createSelector(
  selectAllData,
  (data: any) => {
    data.sort((a, b) => b.id - a.id);
    return data;
  }
);
