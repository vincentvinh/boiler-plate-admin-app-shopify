import React, { Component } from "react";
import {NavLink} from "react-router-dom";
import "./navigation.scss";

class Navigation extends Component {
    render() {
        const activeClass = "active";

        return(
            <div className="main-navigation" id="main-navigation">
                <ul className="nav-list">
                    <li className="nav-item">
                        <NavLink
                            exact={true}
                            to="/"
                            activeClassName={activeClass}
                        >
                            Dashboard
                        </NavLink>
                    </li>
                </ul>
            </div>
        )
    }
}

export default Navigation