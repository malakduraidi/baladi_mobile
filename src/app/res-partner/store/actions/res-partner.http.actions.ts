import { Action } from "@ngrx/store";
import { IResPartner} from "../../models/res-partner";
import { AUTHENTICATE_HTTP, LoginFail } from 'src/stores/app-setting';
import { AuthOdooData, RegisterOdooData } from 'src/providers/odoo/models/ModelRemoteOdoo';

// HTTP CRUD

export enum ResPartnerHTTPActionsType {

  // HTTP CRUD
    ADD_HTTP = "[ResPartner] ADD_HTTP",
    UPDATE_HTTP = "[ResPartner] UPDATE_HTTP",
    ADD_UPDATE_HTTP_SUCCESS = "[ResPartner] ADD_UPDATE_HTTP_SUCCESS",
    ADD_UPDATE_HTTP_FAIL = "[ResPartner] ADD_UPDATE_HTTP_FAIL",

    DELETE_HTTP = "[ResPartner] DELETE_HTTP",
    DELETE_HTTP_SUCCESS = "[ResPartner] DELETE_HTTP_SUCCESS",
    DELETE_HTTP_FAIL = "[ResPartner] DELETE_HTTP_FAIL",

    LOAD_HTTP = "[ResPartner] LOAD_HTTP",
    LOAD_HTTP_SUCCESS = "[ResPartner] LOAD_HTTP_SUCCESS",
    LOAD_HTTP_FAIL = "[ResPartner] LOAD_HTTP_FAIL",

    REFRESH_HTTP = "[ResPartner] REFRESH_HTTP",
    REFRESH_HTTP_SUCCESS = "[ResPartner] REFRESH_HTTP_SUCCESS",
    REFRESH_HTTP_FAIL = "[ResPartner] REFRESH_HTTP_FAIL",

    AUTHENTICATE_HTTP = "[ResPartner] AUTHENTICATE_HTTP",
    AUTHENTICATE_HTTP_SUCCESS= "[ResPartner] AUTHENTICATE_HTTP_SUCCESS",
    AUTHENTICATE_HTTP_FAIL= "[ResPartner] AUTHENTICATE_HTTP_FAIL",

    REGISTER_HTTP = "[ResPartner] REGISTER_HTTP",
    REGISTER_HTTP_SUCCESS = "[ResPartner] REGISTER_HTTP_SUCCESS",
    REGISTER_HTTP_FAIL = "[ResPartner] REGISTER_HTTP_FAIL",

    LOGOUT = '[APP_SETTING] LOGOUT',
    LOGOUT_SUCCESS = '[APP_SETTING] LOGOUT_SUCCESS',
    LOGOUT_FAIL = '[APP_SETTING] LOGOUT_FAIL',

    LOAD_SHIPPING_ADDRESS_HTTP = '[ResPartner] LOAD_SHIPPING_ADDRESS_HTTP',
    LOAD_SHIPPING_ADDRESS_HTTP_SUCCESS = '[ResPartner] LOAD_SHIPPING_ADDRESS_HTTP_SUCCESS',
    LOAD_SHIPPING_ADDRESS_HTTP_FAIL = '[ResPartner] LOAD_SHIPPING_ADDRESS_HTTP_FAIL',

    ADD_PARTNER_HTTP = '[ResPartner] ADD_PARTNER_HTTP',
    ADD_PARTNER_HTTP_SUCCESS = '[ResPartner] ADD_PARTNER_HTTP_SUCCESS',
    ADD_PARTNER_HTTP_FAIL = '[ResPartner] ADD_PARTNER_HTTP_FAIL',

    UPDTAE_PARTNER_HTTP = '[ResPartner] UPDATE_PARTNER_HTTP',
    UPDTAE_PARTNER_HTTP_SUCCESS = '[ResPartner] UPDATE_PARTNER_HTTP_SUCCESS',
    UPDTAE_PARTNER_HTTP_FAIL = '[ResPartner] UPDATE_PARTNER_HTTP_FAIL'

}

export class AddHTTP implements Action {
    readonly type =ResPartnerHTTPActionsType.ADD_HTTP;
    constructor(public payload: {data:IResPartner}) { }
}

export class UpdateHTTP implements Action {
    readonly type =ResPartnerHTTPActionsType.UPDATE_HTTP;
    constructor(public payload: { id: number, data: any }) { }
}

export class AddUpdateHTTPSuccess implements Action {
    readonly type =ResPartnerHTTPActionsType.ADD_UPDATE_HTTP_SUCCESS;
    constructor(public payload: {data:IResPartner}) { }
}

export class AddUpdateHTTPFail implements Action {
    readonly type =ResPartnerHTTPActionsType.ADD_UPDATE_HTTP_FAIL;
    constructor(public payload: any) { }
}

export class DeleteHTTP implements Action {
    readonly type =ResPartnerHTTPActionsType.DELETE_HTTP;
    constructor(public payload: { id: number }) { }
}

export class DeleteHTTPSuccess implements Action {
    readonly type =ResPartnerHTTPActionsType.DELETE_HTTP_SUCCESS;
    constructor(public payload: number) { }
}

export class DeleteHTTPFail implements Action {
    readonly type =ResPartnerHTTPActionsType.DELETE_HTTP_FAIL;
    constructor(public payload: any) { }
}

export class LoadHTTP implements Action {
    readonly type =ResPartnerHTTPActionsType.LOAD_HTTP;
    constructor(public payload: { domain: any, limit: number, offset: number, fields?: any }) { }
}

export class LoadHTTPSuccess implements Action {
    readonly type =ResPartnerHTTPActionsType.LOAD_HTTP_SUCCESS;
    constructor(public payload: IResPartner[]) { }
}

export class LoadHTTPFail implements Action {
    readonly type =ResPartnerHTTPActionsType.LOAD_HTTP_FAIL;
    constructor(public payload: any) { }
}

export class RefreshHTTP implements Action {
    readonly type =ResPartnerHTTPActionsType.REFRESH_HTTP;
    constructor(public payload: { domain: any, limit: number, offset: number, fields?: any }) { }
}

export class RefreshHTTPSuccess implements Action {
    readonly type =ResPartnerHTTPActionsType.REFRESH_HTTP_SUCCESS;
    constructor(public payload: IResPartner[]) { }
}

export class RefreshHTTPFail implements Action {
    readonly type =ResPartnerHTTPActionsType.REFRESH_HTTP_FAIL;
    constructor(public payload: any) { }
}

// malak: in case login user http from odoo db
export class AuthenticateHttp implements Action {
    readonly type =ResPartnerHTTPActionsType.AUTHENTICATE_HTTP;
    constructor(public payload: AuthOdooData) { }
}
// malak: in case success login user http from odoo db
export class AuthenticateHttpSuccess implements Action {
    readonly type =ResPartnerHTTPActionsType.AUTHENTICATE_HTTP_SUCCESS;
    constructor(public payload: IResPartner) { }
}
// malak: in case fail login user http from odoo db
export class AuthenticateHttpFail implements Action {
    readonly type =ResPartnerHTTPActionsType.AUTHENTICATE_HTTP_FAIL;
    constructor(public payload: {error:any}) { }
}

// malak: in case register new user http
export class RegisterHttp implements Action {
    readonly type =ResPartnerHTTPActionsType.REGISTER_HTTP;
    constructor(public payload: RegisterOdooData) { }
}
// malak: in case success to register new user http will return all partner data from odoo
export class RegisterHttpSuccess implements Action {
    readonly type =ResPartnerHTTPActionsType.REGISTER_HTTP_SUCCESS;
    constructor(public payload: IResPartner) { }
}
// malak: in case fail to register new user http
export class RegisterHttpFail implements Action {
    readonly type =ResPartnerHTTPActionsType.REGISTER_HTTP_FAIL;
    constructor(public payload: {error:any}) { }
}

// malak: in case load address shipping http
export class LoadShippingAddressHttp implements Action {
    readonly type =ResPartnerHTTPActionsType.LOAD_SHIPPING_ADDRESS_HTTP;
    constructor(public payload: { domain: any, limit: number, offset: number, fields?: any }) { }
}
// malak: in case success to load address shipping http
export class LoadShippingAddressHttpSuccess implements Action {
    readonly type =ResPartnerHTTPActionsType.LOAD_SHIPPING_ADDRESS_HTTP_SUCCESS;
    constructor(public payload: IResPartner[]) { }
}
// malak: in case fail to load address shipping http
export class LoadShippingAddressHttpFail implements Action {
    readonly type =ResPartnerHTTPActionsType.LOAD_SHIPPING_ADDRESS_HTTP_FAIL;
    constructor(public payload: {error:any}) { }
}

// malak: in case update shipping address http
export class UpdateShippingAddressHttp implements Action {
    readonly type =ResPartnerHTTPActionsType.UPDTAE_PARTNER_HTTP;
    constructor(public payload: {data:IResPartner}) { }
}
// malak: in case success update shipping address http
export class UpdateShippingAddressHttpSuccess implements Action {
    readonly type =ResPartnerHTTPActionsType.UPDTAE_PARTNER_HTTP_SUCCESS;
    constructor(public payload: {data:IResPartner}) { }
}
// malak: in case fail update shipping address http
export class UpdateShippingAddressHttpFail implements Action {
    readonly type =ResPartnerHTTPActionsType.UPDTAE_PARTNER_HTTP_FAIL;
    constructor(public payload: {error:any}) { }
}

// malak: in case add new shipping address http
export class AddNewShippingAddressHttp implements Action {
    readonly type =ResPartnerHTTPActionsType.ADD_PARTNER_HTTP;
    constructor(public payload: {data:IResPartner}) { }
}
// malak: in case success to add new shipping address http
export class AddNewShippingAddressHttpSuccess implements Action {
    readonly type =ResPartnerHTTPActionsType.ADD_PARTNER_HTTP_SUCCESS;
    constructor(public payload: {data:any}) { }
}
// malak: in case fail to add new shipping address http
export class AddNewShippingAddressHttpFail implements Action {
    readonly type =ResPartnerHTTPActionsType.ADD_PARTNER_HTTP_FAIL;
    constructor(public payload: {error:any}) { }
}

// malak: in case logout
export class Logout implements Action {
    readonly type =ResPartnerHTTPActionsType.LOGOUT;
    constructor() { }
}
// malak: in case success to logout
export class LogoutSuccess implements Action {
    readonly type =ResPartnerHTTPActionsType.LOGOUT_SUCCESS;
    constructor() { }
} 
// malak: in case fail to logout
export class LogoutFail implements Action {
    readonly type =ResPartnerHTTPActionsType.LOGOUT_FAIL;
    constructor(public payload: {error:any}) { }
}

export type ResPartnerHTTPActions =
  | AddHTTP
  | UpdateHTTP
  | AddUpdateHTTPSuccess
  | AddUpdateHTTPFail
  | DeleteHTTP
  | DeleteHTTPSuccess
  | DeleteHTTPFail
  | LoadHTTP
  | LoadHTTPSuccess
  | LoadHTTPFail
  | RefreshHTTP
  | RefreshHTTPSuccess
  | RefreshHTTPFail
  | AuthenticateHttp
  | AuthenticateHttpSuccess
  | AuthenticateHttpFail
  | RegisterHttp
  | RegisterHttpSuccess
  | RegisterHttpFail
  | LoadShippingAddressHttp
  | LoadShippingAddressHttpSuccess
  | LoadShippingAddressHttpFail
  | AddNewShippingAddressHttp
  | AddNewShippingAddressHttpSuccess
  | AddNewShippingAddressHttpFail
  | UpdateShippingAddressHttp
  | UpdateShippingAddressHttpSuccess
  | UpdateShippingAddressHttpFail
  | Logout
  | LogoutSuccess
  | LogoutFail;