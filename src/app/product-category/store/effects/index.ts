import {ProductCategoryDBEffects } from "./product-category.db.effects";
import {ProductCategoryHTTPEffects } from "./product-category.http.effects";
export const effects: any[] = [
 ProductCategoryHTTPEffects,
 ProductCategoryDBEffects,
];
