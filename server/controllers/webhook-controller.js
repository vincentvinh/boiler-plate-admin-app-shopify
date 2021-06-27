import Express from "express";
let router = new Express.Router();
import Response from '../helpers/response';
import Shop from "../models/shop";

module.exports = () => {
    router.post('/uninstalled', async (req, res) => {
        const body = req.body;
        const shop = await Shop.getOneByShopifyShopId(body.id);
        if (shop) {
            // Remove shop information
            await Shop.deleteById(shop.get('id'));
        }

        return Response.Success(res, true);
    })

    return router;
}