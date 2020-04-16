import { createFeatureSelector, createSelector } from "@ngrx/store";

import { ProductTemplateState,productTemplateAdapter } from "../state/product-template.state";

export const selectProductTemplateState = createFeatureSelector<ProductTemplateState>("productTemplate");

export const getProductTemplateEntities = (state: ProductTemplateState) => {
  state.entities;
};

export const getLoading = (state: ProductTemplateState) => state.loading;
export const getFeature = (state: ProductTemplateState) => state.feature;

export const getNotifications = (state: ProductTemplateState) => state.notifications;

export const getUploading = (state: ProductTemplateState) => state.uploading;
export const getSearching = (state: ProductTemplateState) => state.searching;
export const getSearchData = (state: ProductTemplateState) => state.search_data;
export const getSearchValue = (state: ProductTemplateState) => state.search_value;

const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal
} =productTemplateAdapter.getSelectors();

export const getSyncing = (state: ProductTemplateState) => state.syncing;

export const selectAllIDS = createSelector(selectProductTemplateState, selectIds);
export const selectTotalRecords = createSelector(selectProductTemplateState, selectTotal);
export const selectAllData = createSelector(selectProductTemplateState, selectAll);
export const selectAllEntities = createSelector(
  selectProductTemplateState,
  selectEntities
);


export const selectTotalProductTemplate = createSelector(selectProductTemplateState, selectTotal);

export const selectSyncing = createSelector(selectProductTemplateState, getSyncing);
export const selectLoading = createSelector(selectProductTemplateState,getLoading );
export const selectFeature = createSelector(selectProductTemplateState, getFeature);
export const selectSearchData = createSelector(selectProductTemplateState, getSearchData);
export const selectSearching = createSelector(selectProductTemplateState, getSearching);
export const selectSearchValue = createSelector(selectProductTemplateState, getSearchValue);

export const getById = id =>
  createSelector(selectAllEntities, customerEntities => customerEntities[id]);
export const getProductTemplateById = id =>
  createSelector(selectAllEntities,productTemplateEntities =>productTemplateEntities[id]);
export const getProductTemplateByName = name =>
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
    selectProductTemplateState,
    getNotifications
  );

  export const selectById = id =>
  createSelector(
    selectAllData,
    data => {
      return data.filter((record: any) => record.id == id)[0]
    }
  );
export const getProductTemplateBySearchTerm = search_term =>
  createSelector(selectAllData,productTemplates => {
  if (!(!!search_term)) {
    return productTemplates;
  } else {
    var filtered_productTemplate=productTemplates.filter((productTemplate: any) => {
      if (productTemplate.name.includes(search_term)) {
        return true;
      } else return false;
    });
    return filtered_productTemplate;
  }
});


export const selectByFeature = (featureType: string) =>
  createSelector(
    selectFeature,
    data => 
    {
      if(data[featureType] && data[featureType].loading==false && data[featureType].data && data[featureType].data.length>0) return data[featureType].data
    }
  );

  // This select from main store or features store
 export const selectByIdFromAll = (id: number) =>
  createSelector(
    selectAllData,
    selectFeature,
    (allData,features)=> 
    {
      let product=allData.filter(prod=>prod.id==id)
      if(product && product.length > 0)
      {
      return product
      }
      // try to find it in the features
      else {
       let foundProduct=[]
       Object.entries(features).forEach(([key, value]) => 
        {
          if(features[key] && features[key].data && features[key].data.length>0)
          {
            let product=features[key].data.filter(prod=>prod.id==id)
            if(product && product.length>0)
            {
            foundProduct=product;
            }
          }
        })


        return foundProduct
      }
    }
  );
