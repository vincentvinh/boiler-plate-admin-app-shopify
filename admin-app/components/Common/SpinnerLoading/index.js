import {Spinner} from "@shopify/polaris";
import React from "react";
import './spinnerLoading.css';

const SpinnerLoading = () => {
    return(<div className="text-center"><Spinner size="large" /></div>);
}

export default SpinnerLoading;