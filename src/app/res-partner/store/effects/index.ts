import {ResPartnerDBEffects } from "./res-partner.db.effects";
import {ResPartnerHTTPEffects } from "./res-partner.http.effects";
export const effects: any[] = [
 ResPartnerHTTPEffects,
 ResPartnerDBEffects,
];
