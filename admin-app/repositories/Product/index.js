import APIRequest from "../../services/APIRequest";
import {APIs} from "../../configs";
const ProductRepo = {
    async getProductAnalytics() {
        const res = await APIRequest.send({
            method: "GET",
            url: APIs.PRODUCT_ANALYTIC
        });

        return res.data.data;
    }
}

export default ProductRepo;