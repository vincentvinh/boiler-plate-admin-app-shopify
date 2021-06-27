import Express from "express";
let router = new Express.Router();
import Middleware from './middlware';
import InstallController from './install-controller';
import WebhookController from './webhook-controller';
import ShopController from './shop-controller';
import ProductController from './product-controller';
module.exports = () => {

    router.use('/', InstallController());
    router.use('/webhook', WebhookController());

    /* API */
    router.use('/api/shop', Middleware.apiValidation, ShopController())
    router.use('/api/product', Middleware.apiValidation, ProductController())

    return router;
};
