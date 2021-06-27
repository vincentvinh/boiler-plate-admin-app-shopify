import Express from "express";
let router = new Express.Router();
import Response from '../helpers/response';
import Shop from "../models/shop";
import ShopifyAuth from '../services/shopify_auth';
import ShopifyWebhook from '../services/shopify_webhook';
import {Message} from "../helpers/message";
import {Configs} from "../config";

module.exports = () => {
    router.get('/', async (req, res) => {
        const params = req.query;
        if (!ShopifyAuth.checkHMAC(params)) {
            return Response.Abort(res, 400, Message.Shopify.Forbidden)
        }

        const shop = await Shop.getOneByShopDomain(params.shop);
        if (shop && shop.get('token')) {
            return Response.RenderHTML(res, Configs.AdminHTMLPath, {
                host: shop.get('host')
            });
        }

        // Create authentication URL
        const authURL = ShopifyAuth.createAuthURL(params);

        return Response.Redirect(res, authURL);
    });

    router.get('/auth/token', async (req, res) => {
        const params = req.query;

        try {
            const accessToken = await ShopifyAuth.getToken(params.shop, params.code);
            if (!accessToken) {
                return Response.Abort(res, 400);
            }

            const shopInfo = await ShopifyAuth.getShopInfo(params.shop, accessToken);
            const shopData = {
                shopify_shop_id: shopInfo.id,
                shop_domain: shopInfo.domain,
                shop_name: shopInfo.name,
                host: params.host,
                locale: shopInfo.primary_locale,
                token: accessToken,
            }

            /* Create shop record */
            const shop = await Shop.create(shopData);

            /* Init webhook */
            const shopifyWebhook = new ShopifyWebhook(shop.get('shop_domain'), shop.get('token'));
            await shopifyWebhook.appUninstalled();

            const appURL = `https://${shopInfo.domain}/admin/apps`;
            return Response.Redirect(res, appURL);
        } catch (e) {
            return Response.Abort(res, 400, e.message);
        }
    })

    return router;
}