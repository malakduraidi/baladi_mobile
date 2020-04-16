import { IResCountry} from "../../models/res-country";

import { EntityState, createEntityAdapter } from "@ngrx/entity";
import { EntityAdapter } from "@ngrx/entity/src/models";

export interface ResCountryState extends EntityState < IResCountry> {
  loading: boolean;
  uploading: boolean;
  offset: number;
  limit: number;
  syncing: boolean;
  notifications: number;
}

export const resCountryAdapter: EntityAdapter <
  IResCountry
> = createEntityAdapter < IResCountry> ();


export const initialState:ResCountryState =resCountryAdapter.getInitialState(
  {
    uploading: false,
    offset: 0,
    limit: 10,
    loading: false,
    syncing: false,
    notifications: 0
  }
);
