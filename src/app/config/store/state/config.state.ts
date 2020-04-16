import { IConfig} from "../../models/config";

import { EntityState, createEntityAdapter } from "@ngrx/entity";
import { EntityAdapter } from "@ngrx/entity/src/models";

export interface ConfigState extends EntityState < IConfig> {
  loading: boolean;
  uploading: boolean;
  offset: number;
  limit: number;
  syncing: boolean;
  notifications: number;
}

export const configAdapter: EntityAdapter <
  IConfig
> = createEntityAdapter < IConfig> ();


export const initialState:ConfigState =configAdapter.getInitialState(
  {
    uploading: false,
    offset: 0,
    limit: 10,
    loading: false,
    syncing: false,
    notifications: 0
  }
);
