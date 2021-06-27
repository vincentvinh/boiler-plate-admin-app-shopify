import Express from "express";
let router = new Express.Router();
import Response from '../helpers/response';
import ShopifyProduct from "../services/shopify_product";
module.exports = () => {
    router.get('/analytic', async (req, res) => {
        const {shop} = req;
        try {
            const shopifyProduct = new ShopifyProduct(shop.get('shop_domain'), shop.get('token'));
            const products = await shopifyProduct.getTotalProduct();

            return Response.Success(res, products);
        } catch (e) {
            return Response.Abort(res, 500, e.message);
        }
    })

    return router;
}