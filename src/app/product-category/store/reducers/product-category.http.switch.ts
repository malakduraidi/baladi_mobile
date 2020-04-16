import * as fromProductCategoryActions from "../actions";

export function httpSwitch(action, state,productCategoryAdapter, initialState) {

  switch (action.type) {
    // HTTP Actions

    // malak : used in case load product categories from odoo db 
    case fromProductCategoryActions.ProductCategoryHTTPActionsType.LOAD_HTTP: {
      return {...state,loading: true};
    }
    // malak : used in case success to load product categories from odoo db 
    case fromProductCategoryActions.ProductCategoryHTTPActionsType.LOAD_HTTP_SUCCESS: {
      return { ...productCategoryAdapter.upsertMany(action.payload, state), loading: false }
    }
    // malak : used in case fail to load product categories from odoo db 
    case fromProductCategoryActions.ProductCategoryHTTPActionsType.LOAD_HTTP_FAIL: {
      return {...state,loading: false};
    }

    // malak : used in case load products from odoo db in case refresh
    case fromProductCategoryActions.ProductCategoryHTTPActionsType.REFRESH_HTTP: {
      return {...state,loading: true};
    }
    // malak : used in case success to load products from odoo db in case refresh
    case fromProductCategoryActions.ProductCategoryHTTPActionsType.REFRESH_HTTP_SUCCESS: {
      return { ...productCategoryAdapter.addAll(action.payload, state), loading: false }
    }
    // malak : used in case fail to load products from odoo db in case refresh
    case fromProductCategoryActions.ProductCategoryHTTPActionsType.REFRESH_HTTP_FAIL: {
      return {...state,loading: false};
    }

    // malak : used in case load product categories from odoo db in case search
    case fromProductCategoryActions.ProductCategoryHTTPActionsType.SEARCH_HTTP: {
      return {...state,searching: true};
    }
    // malak : used in case success to load product categories from odoo db in case search
    case fromProductCategoryActions.ProductCategoryHTTPActionsType.SEARCH_HTTP_SUCCESS: {
      let search_data=state.search_data.slice()
      search_data=action.payload
      return {...state,search_data,searching:false}
    }
    // malak : used in case fail to load product categories from odoo db in case refresh
    case fromProductCategoryActions.ProductCategoryHTTPActionsType.SEARCH_HTTP_FAIL: {
      return {...state,searching: false};
    }
  
    // malak : used in case load product categories image from odoo db
    case fromProductCategoryActions.ProductCategoryHTTPActionsType.LOAD_IMAGE_HTTP: {
      return { ...state,loading_image:true}
    }
    // malak : used in case success to load product categories image from odoo db
    case fromProductCategoryActions.ProductCategoryHTTPActionsType.LOAD_IMAGE_HTTP_SUCCESS: {
      return {...productCategoryAdapter.upsertOne(action.payload,state), loading_image: false};
    }
    // malak : used in case fail to load product categories image from odoo db
    case fromProductCategoryActions.ProductCategoryHTTPActionsType.LOAD_IMAGE_HTTP_FAIL: {
      return { ...state,loading_image:false}
    }

    // malak: used to add new product category to odoo db
    case fromProductCategoryActions.ProductCategoryHTTPActionsType.ADD_HTTP: {
      return { ...state,loading:true}
    }
    // malak: used to update product category to odoo db
    case fromProductCategoryActions.ProductCategoryHTTPActionsType.UPDATE_HTTP: {
      return { ...state,loading:true}
    }
    // malak: used in case success to add new product category to odoo db
    case fromProductCategoryActions.ProductCategoryHTTPActionsType.ADD_UPDATE_HTTP_SUCCESS: {
      return { ...productCategoryAdapter.upsertOne(action.payload, state), loading: false}
    }
    // malak: used in case fail to add new product category to odoo db
    case fromProductCategoryActions.ProductCategoryHTTPActionsType.ADD_UPDATE_HTTP_FAIL: {
      return { ...state, loading: false}
    }

    // malak: used to delete product category from odoo db
    case fromProductCategoryActions.ProductCategoryHTTPActionsType.DELETE_HTTP: {
      return { ...state,loading:true}
    }
    // malak: used in case success to delete product category from odoo db
    case fromProductCategoryActions.ProductCategoryHTTPActionsType.DELETE_HTTP_SUCCESS: {
      return { ...productCategoryAdapter.removeOne(action.payload.id, state), loading: false}
    }
    // malak: used in case fail to delete product category from odoo db
    case fromProductCategoryActions.ProductCategoryHTTPActionsType.DELETE_HTTP_FAIL: {
      return { ...state,loading:false}
    }


    case fromProductCategoryActions.ProductCategoryActionsType.UPDATE_OFFSET: {
  return {
    ...state,
    offset: action.offset
  };
}

    case fromProductCategoryActions.ProductCategoryActionsType.UPDATE_LIMIT: {
  return {
    ...state,
    limit: action.limit
  };
}


    // case fromProductCategoryActions.ProductCategorySyncActionsType
    //   .DELETE_SYNC_HTTP_SUCCESS: {
    //   returnproductCategoryAdapter.removeOne(action.payload, state);
    // }
    

    // default:
    //   return state;
  }
}
