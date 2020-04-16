import { IProductCategory} from "../../models/product-category";

import { EntityState, createEntityAdapter } from "@ngrx/entity";
import { EntityAdapter } from "@ngrx/entity/src/models";

export interface ProductCategoryState extends EntityState < IProductCategory> {
  loading: boolean;
  uploading: boolean;
  offset: number;
  limit: number;
  syncing: boolean;
  notifications: number;
}

export const productCategoryAdapter: EntityAdapter <
  IProductCategory
> = createEntityAdapter < IProductCategory> ();


export const initialState:ProductCategoryState =productCategoryAdapter.getInitialState(
  {
    uploading: false,
    offset: 0,
    limit: 10,
    loading: false,
    syncing: false,
    notifications: 0
  }
);
