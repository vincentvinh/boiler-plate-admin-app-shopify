import Shopify from "shopify-api-node";

class ShopifyProduct {
    constructor(shopName, accessToken) {
        this.shopifyClient = new Shopify({
            shopName,
            accessToken
        })
    }

    async getTotalProduct(cursor = null, total = 0) {
        const query = `query ($num: Int!, $cursor: String) {
            products(first: $num, after: $cursor) {
                pageInfo {
                    hasNextPage,
                    hasPreviousPage
                },
                edges {
                    cursor
                    node {
                        id
                    }
                }
            }
        }`;

        const res = await this.shopifyClient.graphql(query, {num: 10, cursor});
        const products = res.products;
        total += products.edges.length;
        if (products.pageInfo && products.pageInfo.hasNextPage) {
            const last = products.edges[products.edges.length - 1];
            return await this.getTotalProduct(last.cursor, total);
        } else {
            return total;
        }
    }
}

module.exports = ShopifyProduct;