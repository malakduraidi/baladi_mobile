import { IResPartner, ResPartner} from "../../models/res-partner";
import { EntityState, createEntityAdapter } from "@ngrx/entity";
import { EntityAdapter } from "@ngrx/entity/src/models";

export interface ResPartnerState extends EntityState < IResPartner> {
  loading: boolean;
  uploading: boolean;
  offset: number;
  limit: number;
  syncing: boolean;
  notifications: number;
  loggedUser:IResPartner;
  public_partner:IResPartner;
}

export const resPartnerAdapter: EntityAdapter <IResPartner> = createEntityAdapter < IResPartner> ();

export const initialState:ResPartnerState =resPartnerAdapter.getInitialState(
  {
    uploading: false,
    offset: 0,
    limit: 10,
    loading: false,
    syncing: false,
    notifications: 0,
    loggedUser:new ResPartner(),
    public_partner:new ResPartner()
  }
);
