import * as fromProductTemplateActions from "../actions";

export function httpSwitch(action, state, productTemplateAdapter, initialState) {
  switch (action.type) {
    // HTTP Actions

    // malak : used in case load products from odoo db 
    case fromProductTemplateActions.ProductTemplateHTTPActionsType.LOAD_HTTP: {
      return {...state,loading: true};
    }
    // malak : used in case success to load products from odoo db 
    case fromProductTemplateActions.ProductTemplateHTTPActionsType.LOAD_HTTP_SUCCESS: {
      return { ...productTemplateAdapter.upsertMany(action.payload, state), loading: false }
    }
    // malak : used in case fail to load products from odoo db 
    case fromProductTemplateActions.ProductTemplateHTTPActionsType.LOAD_HTTP_FAIL: {
      return {...state,loading: false};
    }
    
    // malak : used in case load products from odoo db in case refresh
    case fromProductTemplateActions.ProductTemplateHTTPActionsType.REFRESH_HTTP: {
      return {...state,loading: true};
    }
    // malak : used in case success to load products from odoo db in case refresh
    case fromProductTemplateActions.ProductTemplateHTTPActionsType.REFRESH_HTTP_SUCCESS: {
      return { ...productTemplateAdapter.addAll(action.payload, state), loading: false }
    }
    // malak : used in case fail to load products from odoo db in case refresh
    case fromProductTemplateActions.ProductTemplateHTTPActionsType.REFRESH_HTTP_FAIL: {
      return {...state,loading: false};
    }

    // malak: used to update product to odoo db
    case fromProductTemplateActions.ProductTemplateHTTPActionsType.UPDATE_HTTP: {
      return { ...state,loading:true}
    }
    // malak: used to add new product to odoo db
    case fromProductTemplateActions.ProductTemplateHTTPActionsType.ADD_HTTP: {
      return { ...state,loading:true}
    }
    // malak: used in case success to add new product to odoo db
    case fromProductTemplateActions.ProductTemplateHTTPActionsType.ADD_UPDATE_HTTP_SUCCESS: {
      return { ...productTemplateAdapter.upsertOne(action.payload, state), loading: false}
    }
    // malak: used in case fail to add new product to odoo db
    case fromProductTemplateActions.ProductTemplateHTTPActionsType.ADD_UPDATE_HTTP_FAIL: {
      return { ...state, loading: false}
    }
  
    // malak: used to delete product from odoo db
    case fromProductTemplateActions.ProductTemplateHTTPActionsType.DELETE_HTTP: {
      return { ...state,loading:true}
    }
    // malak: used in case success to delete product from odoo db
    case fromProductTemplateActions.ProductTemplateHTTPActionsType.DELETE_HTTP_SUCCESS: {
      return { ...productTemplateAdapter.removeOne(action.payload.id, state), loading: false}
    }
    // malak: used in case fail to delete product from odoo db
    case fromProductTemplateActions.ProductTemplateHTTPActionsType.DELETE_HTTP_FAIL: {
      return { ...state,loading:false}
    }

    // malak : used in case load products from odoo db in case search
    case fromProductTemplateActions.ProductTemplateHTTPActionsType.SEARCH_HTTP: {
      return {...state,searching: true};
    }
    // malak : used in case success to load products from odoo db in case search
    case fromProductTemplateActions.ProductTemplateHTTPActionsType.SEARCH_HTTP_SUCCESS: {
      let search_data=state.search_data.slice()
      search_data=action.payload
      return {...state,search_data,searching:false}
    }
    // malak : used in case fail to load products from odoo db in case refresh
    case fromProductTemplateActions.ProductTemplateHTTPActionsType.SEARCH_HTTP_FAIL: {
      return {...state,searching: false};
    }
  
    // malak : used in case load products image from odoo db
    case fromProductTemplateActions.ProductTemplateHTTPActionsType.LOAD_IMAGE_HTTP: {
      return { ...state,loading_image:true}
    }
    // malak : used in case success to load products image from odoo db
    case fromProductTemplateActions.ProductTemplateHTTPActionsType.LOAD_IMAGE_HTTP_SUCCESS: {
      return {...productTemplateAdapter.upsertOne(action.payload,state), loading_image: false};
    }
    // malak : used in case fail to load products image from odoo db
    case fromProductTemplateActions.ProductTemplateHTTPActionsType.LOAD_IMAGE_HTTP_FAIL: {
      return { ...state,loading_image:false}
    }
  

    case fromProductTemplateActions.ProductTemplateHTTPActionsType.LOAD_HTTP_SUCCESS: {
      // TODO need to be reviewed  
      return { ...productTemplateAdapter.upsertMany(action.payload, state), loading: false }
    }

    case fromProductTemplateActions.ProductTemplateHTTPActionsType.REFRESH_HTTP_SUCCESS: {
      // TODO need to be reviewed  
      return { ...productTemplateAdapter.addAll(action.payload, state), loading: false }
    }

    case fromProductTemplateActions.ProductTemplateHTTPActionsType.REFRESH_HTTP_FAIL: {
      // TODO need to be reviewed  
      return {
        ...state,
        loading: false
      };
    }
    case fromProductTemplateActions.ProductTemplateHTTPActionsType.LOAD_FEATURE_HTTP_SUCCESS: {
      if (!state.feature[action.payload.type]) {
        let feature = Object.assign({}, state.feature)
        feature[action.payload.type] = Object.assign({}, { loading: false, data: action.payload.data })
        return { ...state, feature }
      }
      else if (
        state.feature[action.payload.type] &&
        state.feature[action.payload.type].data &&
        state.feature[action.payload.type].data.length > 0
      ) {
        let feature = Object.assign({}, state.feature)
        if (JSON.stringify(action.payload.data) != JSON.stringify(feature[action.payload.type].data)) {
          feature[action.payload.type] = Object.assign({}, { loading: false, data: action.payload.data })
          return { ...state, feature }
        }
        else return state
      }
      else return state

    }
    case fromProductTemplateActions.ProductTemplateHTTPActionsType.ADD_UPDATE_HTTP_SUCCESS: {
      return {
        ...productTemplateAdapter.upsertOne(action.payload.data, state), loading: false
      }
    }


    case fromProductTemplateActions.ProductTemplateHTTPActionsType.DELETE_HTTP_SUCCESS: {
      return {
        ...productTemplateAdapter.removeOne(action.payload.id, state), loading: false
      }
    }


    case fromProductTemplateActions.ProductTemplateHTTPActionsType.LOAD_HTTP_FAIL: {
      return {
        ...state,
        loading: false,
        syncing: false
      };
    }


    case fromProductTemplateActions.ProductTemplateActionsType.UPDATE_OFFSET: {
      return {
        ...state,
        offset: action.offset
      };
    }

    case fromProductTemplateActions.ProductTemplateActionsType.UPDATE_LIMIT: {
      return {
        ...state,
        limit: action.limit
      };
    }



    case fromProductTemplateActions.ProductTemplateHTTPActionsType.DELETE_HTTP_SUCCESS: {
      return productTemplateAdapter.removeOne(action.payload, state);
    }

    // case fromProductTemplateActions.ProductTemplateSyncActionsType
    //   .DELETE_SYNC_HTTP_SUCCESS: {
    //   returnproductTemplateAdapter.removeOne(action.payload, state);
    // }
    case fromProductTemplateActions.ProductTemplateHTTPActionsType.ADD_UPDATE_HTTP_SUCCESS: {
      return productTemplateAdapter.addOne(action.payload, state)
    }
    case fromProductTemplateActions.ProductTemplateHTTPActionsType.LOAD_IMAGE_HTTP_SUCCESS: {

      return productTemplateAdapter.upsertOne(action.payload, state);
    }

    case fromProductTemplateActions.ProductTemplateHTTPActionsType.LOAD_FEATURE_IMAGE_HTTP_SUCCESS: 
    {

        let feature = Object.assign({}, state.feature)
        Object.keys(feature).forEach((key,index)=>{
          feature[key].data.map(prod=>{
            let product=Object.assign({},prod)
            if(action.payload.id==product.id)
            {
            debugger;
            product[action.payload.image_field_name]=action.payload.image_data.image
            }
            return product
          })

        })
        debugger;
        // feature[action.payload.type] = Object.assign({}, { loading: false, data: action.payload.data })
        return { ...state, feature }

      return productTemplateAdapter.upsertOne(action.payload, state);
    }

    // default:
    //   return state;
  }
}
