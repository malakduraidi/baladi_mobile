import {ConfigDBEffects } from "./config.db.effects";
import {ConfigHTTPEffects } from "./config.http.effects";
export const effects: any[] = [
 ConfigHTTPEffects,
 ConfigDBEffects,
];
