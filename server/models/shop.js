import BaseModel from "./base";
import { dbConnection, dbKnex } from "./database";

class Shop extends BaseModel {
    constructor(data) {
        super(data);
    }

    get tableName() {
        return 'shops'
    }

    static getOneByShopDomain(domain) {
        return this.query({where: {shop_domain: domain}})
                .fetch({
                    require: false
                });
    }

    static getOneByShopifyShopId(shopifyShopId)
    {
        return this.query({where: {shopify_shop_id: shopifyShopId}})
            .fetch({
                require: false
            });
    }
}

export default dbConnection.model('Shop', Shop);