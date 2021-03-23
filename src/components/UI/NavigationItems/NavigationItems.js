import React from "react";
import { NavLink } from "react-router-dom";

import NavigationItem from "./NavigationItem/NavigationItem";
import cssClass from "./NavigationItems.css";
import Aux from "../../../hoc/Auxs/Auxs";

const navigationItems = props => {
    return (
        <div className={cssClass.NavigationItems}>
            <ul className={cssClass.UnorderList}>
                <span className={cssClass.NavigationItems}>
                    <NavLink style={{ textDecoration: "none" }} to="/">
                        <NavigationItem>Home</NavigationItem>
                    </NavLink>
                    {props.isAuth ? (
                        <NavLink
                            style={{ textDecoration: "none" }}
                            to="/dashboard"
                        >
                            <NavigationItem>Dashboard</NavigationItem>
                        </NavLink>
                    ) : (
                        <Aux>
                            <NavLink
                                style={{ textDecoration: "none" }}
                                to="/login"
                            >
                                <NavigationItem>Login</NavigationItem>
                            </NavLink>
                            <NavLink
                                style={{ textDecoration: "none" }}
                                to="/register"
                            >
                                <NavigationItem>Register</NavigationItem>
                            </NavLink>
                        </Aux>
                    )}
                </span>
            </ul>
        </div>
    );
};

export default navigationItems;
