import Express from "express";
let router = new Express.Router();
import Response from '../helpers/response';

module.exports = () => {
    router.get('/', async (req, res) => {
        const { shop } = req;

        return Response.Success(res, {
            shop_domain: shop.get('shop_domain'),
            locale: shop.get('locale')
        });
    });

    return router;
}