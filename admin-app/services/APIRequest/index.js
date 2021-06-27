import axios from 'axios';
import {Configs} from "../../configs";
import { appBridge } from "../AppBridge";
import { getSessionToken } from "@shopify/app-bridge-utils";

const cancelListener = {};
let requestClient = axios.create({
    baseURL: Configs.APP_URL,
});

requestClient.interceptors.request.use((config) => {
    return getSessionToken(appBridge) // requires an App Bridge instance
        .then((token) => {
            config.headers = {
                'Authorization': `Bearer ${token}`
            };

            return config;
        });
}, (error) => {
    return Promise.reject(error);
});

class APIRequest {
    static send(request, data = {}, headers = {}) {
        cancelListener[request.url] = cancelListener[request.url] || {};
        // Cancel request before if we have
        if (request.takeLatest && cancelListener[request.url].source) {
            cancelListener[request.url].source.cancel();
        }
        // Update request source
        cancelListener[request.url].source = axios.CancelToken.source();
        let config = {
            ...request,
            cancelToken: cancelListener[request.url].source.token
        };
        // Use params if it's get method
        if (request.method.toLowerCase() === 'get') {
            config.params = data;
        } else {
            config.data = data;
        }

        // Modify headers
        config.headers = headers;
        return requestClient(config);
    }
}

export default APIRequest;