import {Configs} from "../../configs";
// Use this function to get token from app-bride & include in API request to our server
import createApp from "@shopify/app-bridge";
import { getSessionToken } from "@shopify/app-bridge-utils";

export const AppConfig = {
    apiKey: Configs.API_KEY,
    host: host
}

export const appBridge = createApp(AppConfig);
