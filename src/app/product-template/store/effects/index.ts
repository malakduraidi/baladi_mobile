import {ProductTemplateDBEffects } from "./product-template.db.effects";
import {ProductTemplateHTTPEffects } from "./product-template.http.effects";
export const effects: any[] = [
 ProductTemplateHTTPEffects,
 ProductTemplateDBEffects,
];
