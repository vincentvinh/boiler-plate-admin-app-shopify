import APIRequest from "../../services/APIRequest";
import { APIs} from "../../configs";

const ShopRepo = {
    async getShopInfo() {
        const res = await APIRequest.send({
            method: "GET",
            url: APIs.SHOP_INFO
        })

        return res.data.data;
    }
}

export default ShopRepo