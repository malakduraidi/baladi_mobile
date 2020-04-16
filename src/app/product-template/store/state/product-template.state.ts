import { IProductTemplate} from "../../models/product-template";

import { EntityState, createEntityAdapter } from "@ngrx/entity";
import { EntityAdapter } from "@ngrx/entity/src/models";

export interface ProductTemplateState extends EntityState < IProductTemplate> {
  loading: boolean;
  uploading: boolean;
  offset: number;
  limit: number;
  syncing: boolean;
  notifications: number;
  flash_sale:any;
  feature:any,
  search_data:any;
  searching:boolean;
  search_value:string;
  loading_image: boolean;
}

export const productTemplateAdapter: EntityAdapter <
  IProductTemplate
> = createEntityAdapter < IProductTemplate> ();


export const initialState:ProductTemplateState =productTemplateAdapter.getInitialState(
  {
    uploading: false,
    offset: 0,
    limit: 10,
    loading: false,
    syncing: false,
    notifications: 0,
    most_liked:[],
    feature:{},
    flash_sale:null,
    search_data:[],
    searching:false,
    search_value:null,
    loading_image:false
  }
);
