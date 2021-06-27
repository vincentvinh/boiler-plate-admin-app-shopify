import React, { Component } from 'react';
import { Provider } from "@shopify/app-bridge-react";
import { Frame, Loading, AppProvider, Navigation } from '@shopify/polaris'
import {BrowserRouter} from 'react-router-dom';
import {AppConfig} from "../../services/AppBridge";
import translations from '@shopify/polaris/locales/en.json';
import Styles from '@shopify/polaris/dist/styles.css';
import '../../assets/css/responsive.scss';
import Sidebar from '../../components/Navigation';
import Router from '../../components/Router';
import ShopRepo from '../../repositories/Shop';
import SpinnerLoading from "../../components/Common/SpinnerLoading";

class Admin extends Component {
    constructor() {
        super();
        this.state = {
            loading: true
        }
    }
    async componentDidMount() {
        const shop = await ShopRepo.getShopInfo();
        this.setState({loading: false});
    }

    render() {
        return(
            <BrowserRouter>
                <Provider config={AppConfig}>
                    <AppProvider i18n={translations}>
                        {
                            this.state.loading ? <SpinnerLoading /> :
                            <>
                                <Sidebar/>
                                <Router/>
                            </>
                        }
                    </AppProvider>
                </Provider>
            </BrowserRouter>
        )
    }
}

export default Admin;