import { IResCountryState} from "../../models/res-country-state";

import { EntityState, createEntityAdapter } from "@ngrx/entity";
import { EntityAdapter } from "@ngrx/entity/src/models";

export interface ResCountryStateState extends EntityState < IResCountryState> {
  loading: boolean;
  uploading: boolean;
  offset: number;
  limit: number;
  syncing: boolean;
  notifications: number;
}

export const resCountryStateAdapter: EntityAdapter <
  IResCountryState
> = createEntityAdapter < IResCountryState> ();


export const initialState:ResCountryStateState =resCountryStateAdapter.getInitialState(
  {
    uploading: false,
    offset: 0,
    limit: 10,
    loading: false,
    syncing: false,
    notifications: 0
  }
);
