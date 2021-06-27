import crypto from 'crypto';
import Axios from 'axios';
import {Configs} from "../config";
const Shopify = require('shopify-api-node');

class ShopifyAuth {
    createAuthURL(params) {
        return `https://${params.shop}/admin/oauth/authorize?client_id=${Configs.Shopify.Key}&scope=${Configs.Shopify.Scopes}&redirect_uri=${Configs.Shopify.AppURL}/auth/token`;
    }

    async getToken(shop, code) {
        const params = {
            code,
            client_id: Configs.Shopify.Key,
            client_secret: Configs.Shopify.Secret
        };

        const res = await Axios.post(`https://${shop}/admin/oauth/access_token`, params, {
            headers: {
                'content-type': 'application/json',
                'accept': 'application/json'
            }
        });

        return res.data.access_token;
    }

    async getShopInfo(shopName, accessToken) {
        const shopifyClient = new Shopify({
            shopName,
            accessToken
        })

        return await shopifyClient.shop.get();
    }

    checkHMAC(params) {
        const hmac = params.hmac;
        delete params.hmac;
        let query = [];
        Object.keys(params).forEach(key => {
            query.push(`${key}=${params[key]}`);
        })

        query = query.join("&");
        const hmacByCrypto = crypto.createHmac("sha256", Configs.Shopify.Secret)
            .update(query)
            .digest("hex");

        return hmac === hmacByCrypto;
    }
}

module.exports = new ShopifyAuth();