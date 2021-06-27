import React, { Component } from "react";
import { Page, Card } from '@shopify/polaris';
import SpinnerLoading from "../Common/SpinnerLoading";
import ProductRepo from "../../repositories/Product";

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            product: {},
            order: {}
        }
    }

    async componentDidMount() {
        try {
            const total = await ProductRepo.getProductAnalytics();
            let product = {...this.state.form}
            product.total = total;
            this.setState({product});
        } catch (e) {}

        this.setState({loading: false});
    }

    render() {
        return(
            <Page title="">
                <Card title="Product Analytics" sectioned>
                    {
                        this.state.loading ? <SpinnerLoading /> :
                        <p>
                            Total Products: { this.state.product.total }
                        </p>
                    }
                </Card>
                <Card title="Order Analytics" sectioned>
                    {
                        this.state.loading ? <SpinnerLoading /> :
                        <p>
                            Total Orders: { this.state.order.total }
                        </p>
                    }
                </Card>
            </Page>
        )
    }
}

export default Dashboard;