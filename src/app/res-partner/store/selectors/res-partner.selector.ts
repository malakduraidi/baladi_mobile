import { createFeatureSelector, createSelector } from "@ngrx/store";
import { ResPartnerState,resPartnerAdapter } from "../state/res-partner.state";
import { ResPartner } from '../../models/res-partner';

export const selectResPartnerState = createFeatureSelector<ResPartnerState>("resPartner");

export const getResPartnerEntities = (state: ResPartnerState) => {
  state.entities;
};

export const getResPartnerLoading = (state: ResPartnerState) => state.loading;

export const getNotifications = (state: ResPartnerState) => state.notifications;

export const getResPartnerUploading = (state: ResPartnerState) => state.uploading;

export const getLoading = (state: ResPartnerState) => state.loading;
export const getPublicPartner = (state: ResPartnerState) => state.public_partner;

// malak: get logged user from store
export const getloggedUser = (state: ResPartnerState) => state.loggedUser;

const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal
} =resPartnerAdapter.getSelectors();

export const getSyncing = (state: ResPartnerState) => state.syncing;

export const selectAllIDS = createSelector(selectResPartnerState, selectIds);

export const selectTotalRecords = createSelector(selectResPartnerState, selectTotal);

export const selectAllData = createSelector(selectResPartnerState, selectAll);
export const selectPublicPartner = createSelector(selectResPartnerState, getPublicPartner);

export const selectAllEntities = createSelector(
  selectResPartnerState,
  selectEntities
);

export const selectTotalResPartner = createSelector(selectResPartnerState, selectTotal);

export const selectSyncing = createSelector(selectResPartnerState, getSyncing);

export const selectLoading = createSelector(selectResPartnerState, getLoading);

// malak: used to get logged user info from store
// which is partner has logged = true
export const selectLoggedUser = createSelector(selectResPartnerState, getloggedUser);

export const getById = id =>
  createSelector(selectAllEntities, customerEntities => customerEntities[id]);

export const getResPartnerById = id =>
  createSelector(selectAllEntities,resPartnerEntities =>resPartnerEntities[id]);

export const getResPartnerByName = name =>
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
  selectResPartnerState,
  getNotifications
);

export const selectById = id =>
  createSelector(
    selectAllData,
    data => {return data.filter((record: any) => record.id == id)}
  );

export const getResPartnerBySearchTerm = search_term =>
  createSelector(selectAllData,resPartners => {
    if (!(!!search_term)) {
      return resPartners;
    } else {
      var filtered_resPartner=resPartners.filter((resPartner: any) => {
        if (resPartner.name.includes(search_term)) {
          return true;
        } else return false;
      });
      return filtered_resPartner;
    }
  });

  // malak: used to get all shipping addresses for logged user from respartner sql
  // which is all partner has parent_id and parent_id = logged user id and logged user itself
  export const selectShippingAddress = parent_id =>{
    return createSelector( selectAllData,resPartners => {
        return resPartners.filter
        (resPartner=>(resPartner.parent_id !=null && resPartner.parent_id[0]==parent_id) || resPartner.id==parent_id)
        .map(resPartner=>{ return {"street":resPartner.street, "state":resPartner.state_id, "country":resPartner.country_id}})

    })
  }
