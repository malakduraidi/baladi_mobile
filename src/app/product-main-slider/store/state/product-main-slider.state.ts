import { IProductMainSlider} from "../../models/product-main-slider";

import { EntityState, createEntityAdapter } from "@ngrx/entity";
import { EntityAdapter } from "@ngrx/entity/src/models";

export interface ProductMainSliderState extends EntityState < IProductMainSlider> {
  loading: boolean;
  uploading: boolean;
  offset: number;
  limit: number;
  syncing: boolean;
  notifications: number;
}

export const productMainSliderAdapter: EntityAdapter <
  IProductMainSlider
> = createEntityAdapter < IProductMainSlider> ();


export const initialState:ProductMainSliderState =productMainSliderAdapter.getInitialState(
  {
    uploading: false,
    offset: 0,
    limit: 10,
    loading: false,
    syncing: false,
    notifications: 0
  }
);
