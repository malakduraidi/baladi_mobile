import { ISaleOrderLine} from "../../models/sale-order-line";

import { EntityState, createEntityAdapter } from "@ngrx/entity";
import { EntityAdapter } from "@ngrx/entity/src/models";

export interface SaleOrderLineState extends EntityState < ISaleOrderLine> {
  loading: boolean;
  uploading: boolean;
  offset: number;
  limit: number;
  syncing: boolean;
  notifications: number;
  cart: ISaleOrderLine[];
}

export const saleOrderLineAdapter: EntityAdapter <
  ISaleOrderLine
> = createEntityAdapter < ISaleOrderLine> ();


export const initialState:SaleOrderLineState =saleOrderLineAdapter.getInitialState(
  {
    uploading: false,
    offset: 0,
    limit: 10,
    loading: false,
    syncing: false,
    notifications: 0,
    cart: []
  }
);
