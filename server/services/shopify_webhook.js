import Shopify from 'shopify-api-node';
import {Configs} from "../config";

class ShopifyWebhook {
    constructor(shopName, accessToken) {
        this.shopifyClient = new Shopify({
            shopName,
            accessToken
        })
    }

    // Inject webhook for app uninstalled event
    appUninstalled() {
        return this.shopifyClient.webhook.create({
            "topic": "app/uninstalled",
            "address": Configs.Shopify.AppURL + "/webhook/app/uninstalled",
            "format": "json"
        });
    }
}

module.exports = ShopifyWebhook;