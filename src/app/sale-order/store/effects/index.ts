import {SaleOrderDBEffects } from "./sale-order.db.effects";
import {SaleOrderHTTPEffects } from "./sale-order.http.effects";
export const effects: any[] = [
 SaleOrderHTTPEffects,
 SaleOrderDBEffects,
];
