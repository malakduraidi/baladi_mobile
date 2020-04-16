import { createFeatureSelector, createSelector } from "@ngrx/store";
// import {getMergedRoute} from '../router/router-state.selectors.ts'


import { ProductCategoryState,productCategoryAdapter } from "../state/product-category.state";
import { getMergedRoute } from 'src/app/store/reducers/router/router-state.selectors';

export const selectProductCategoryState = createFeatureSelector<ProductCategoryState>("productCategory");

export const getProductCategoryEntities = (state: ProductCategoryState) => {
  state.entities;
};

export const getLoading = (state: ProductCategoryState) => state.loading;

export const getProductCategoryLoading = (state: ProductCategoryState) => state.loading;

export const getNotifications = (state: ProductCategoryState) => state.notifications;

export const getProductCategoryUploading = (state: ProductCategoryState) => state.uploading;

const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal
} =productCategoryAdapter.getSelectors();

export const getSyncing = (state: ProductCategoryState) => state.syncing;

export const selectAllIDS = createSelector(selectProductCategoryState, selectIds);
export const selectTotalRecords = createSelector(selectProductCategoryState, selectTotal);
export const selectLoading = createSelector(selectProductCategoryState,getLoading );
export const selectAllData = createSelector(selectProductCategoryState, selectAll);
export const selectAllEntities = createSelector(
  selectProductCategoryState,
  selectEntities
);
export const selectTotalProductCategory = createSelector(selectProductCategoryState, selectTotal);

export const selectSyncing = createSelector(selectProductCategoryState, getSyncing);

export const getById = id =>
  createSelector(selectAllEntities, customerEntities => customerEntities[id]);
export const getProductCategoryById = id =>
  createSelector(selectAllEntities,productCategoryEntities =>productCategoryEntities[id]);
export const getProductCategoryByName = name =>
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
    selectProductCategoryState,
    getNotifications
  );

  // malak : used to select category by id 
  export const selectById = id =>
  createSelector(selectAllData,data => {return data.filter((record: any) => record.id == id)});

export const getProductCategoryBySearchTerm = search_term =>
  createSelector(selectAllData,productCategorys => {
  if (!(!!search_term)) {
    return productCategorys;
  } else {
    var filtered_productCategory=productCategorys.filter((productCategory: any) => {
      if (productCategory.name.includes(search_term)) {
        return true;
      } else return false;
    });
    return filtered_productCategory;
  }
});


export const getSelectedCategory = 
createSelector(selectAllData, getMergedRoute,(categories, mergedRoute) => 
{  
  
  if(mergedRoute.url.includes('categories') && mergedRoute.params.parent==undefined)
  return -1
  else {
    return mergedRoute.params.parent
  }
});


export const selectAllDataWithRoutes = 
createSelector(selectAllData, getMergedRoute,(categories, mergedRoute) => 
{  
  
  if(mergedRoute.url.includes('/categories') && mergedRoute.params.parent)
  {

  return categories.filter((cat:any)=>parseInt(cat.parent_id[0])==parseInt(mergedRoute.params.parent))
  }
  else if ( mergedRoute.url.includes('/categories') && mergedRoute.params.parent ===undefined)
  {
    return categories.filter((cat:any)=>cat.parent_id==false)
  }
  // TODO check below it is same as the second if statment
  else return categories.filter((cat:any)=>cat.parent_id==false)
});



export const selectLeafs = createSelector(
  selectAllData,
  data => {
    return data.filter((record: any) => !record.child_id || record.child_id.length ==0)
  }
);