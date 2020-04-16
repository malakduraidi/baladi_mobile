import {SaleOrderLineDBEffects } from "./sale-order-line.db.effects";
import {SaleOrderLineHTTPEffects } from "./sale-order-line.http.effects";
export const effects: any[] = [
 SaleOrderLineHTTPEffects,
 SaleOrderLineDBEffects,
];
