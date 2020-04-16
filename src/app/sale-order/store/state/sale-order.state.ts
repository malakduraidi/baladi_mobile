import { ISaleOrder} from "../../models/sale-order";

import { EntityState, createEntityAdapter } from "@ngrx/entity";
import { EntityAdapter } from "@ngrx/entity/src/models";

export interface SaleOrderState extends EntityState < ISaleOrder> {
  loading: boolean;
  uploading: boolean;
  offset: number;
  limit: number;
  syncing: boolean;
  notifications: number;
}

export const saleOrderAdapter: EntityAdapter <
  ISaleOrder
> = createEntityAdapter < ISaleOrder> ();


export const initialState:SaleOrderState =saleOrderAdapter.getInitialState(
  {
    uploading: false,
    offset: 0,
    limit: 10,
    loading: false,
    syncing: false,
    notifications: 0
  }
);
