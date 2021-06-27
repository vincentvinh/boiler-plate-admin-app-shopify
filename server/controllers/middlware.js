import Response from '../helpers/response';
import {Configs} from "../config";
import JWT from 'jsonwebtoken';
import Shop from "../models/shop";

module.exports = {
    apiValidation: async (req, res, next) => {
        const headers = req.headers;
        let token = headers.authorization;

        if (typeof token == "undefined" || token === '') {
            return Response.Unauthorized(res, "This is not a valid Shopify Request");
        } else {
            token = token.replace("Bearer ", "");
            try {
                const decoded = JWT.verify(token, Configs.Shopify.Secret);
                const shopDomain = new URL(decoded.dest).host;
                const apiKey = decoded.aud;

                if (apiKey !== Configs.Shopify.Key) {
                    return Response.Unauthorized(res, "This is not a valid Shopify Request");
                }

                const shop = await Shop.getOneByShopDomain(shopDomain);
                if (!shop) {
                    return Response.Unauthorized(res, "This is not a valid Shopify Request");
                }

                req.shop = shop;
                next();
            } catch (e) {
                return Response.Unauthorized(res, e.message);
            }
        }
    }
}

