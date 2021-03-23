import React, { Component } from "react";
import { connect } from "react-redux";

import cssClass from "./Dashboard.css";
import { Redirect, Link } from "react-router-dom";
import Aux from "../../hoc/Auxs/Auxs";
import * as actions from "../../store/actions/index";
import AxiosInstance from "../../AxiosInstance";

class Dashboard extends Component {

    state = {
        AdminShow:false
    }


    componentDidMount() {
        const config = {
            headers: {
                "Content-Type": "application/json",
                AUTHORIZATION: "JWT " + this.props.token
            }
        };
        AxiosInstance.get("/dashboard/user-status/", config)
            .then(response => {
                if (response.data.is_superuser) {
                    const {AdminShow} = this.state;
                    this.setState({ AdminShow : !AdminShow });
                }
            })
            .catch(error => console.log(error.response.data));
    }



    onLogoutClickHandler = () => {
        this.props.onClickLogout();
        this.props.history.go("/");
    };

    render() {
        const AdminLink = (
            <Link
                            style={{ textDecoration: "none" }}
                            to="/admin-panel"
                        >
                            {" "}
                            <div className={cssClass.Container}>
                                Admin Panel
                            </div>
                        </Link>
        )
        return (
            <Aux>
                {!this.props.isAuth ? <Redirect to="/" /> : null}
                <div className={cssClass.Title}>
                    <p>Welcome {this.props.username}</p>
                </div>
                <div className={cssClass.OuterWrapper}>
                    {" "}
                    <div className={cssClass.InnerWrapper}>
                        <Link to="/dashboard/profile">
                            <div className={cssClass.Container}>
                                View Your Profile
                            </div>
                        </Link>
                    </div>
                    <div className={cssClass.InnerWrapper}>
                        <Link to="/dashboard/create-new-post">
                            <div className={cssClass.Container}>
                                Create New Post
                            </div>
                        </Link>
                        <Link to="/dashboard/post-list">
                            <div className={cssClass.Container}>Your Posts</div>
                        </Link>
                    </div>
                    <div className={cssClass.InnerWrapper}>
                        { this.state.AdminShow ? AdminLink : "" }
                        <div
                            className={cssClass.Container}
                            onClick={this.onLogoutClickHandler}
                        >
                            Logout
                        </div>
                    </div>
                </div>
            </Aux>
        );
    }
}

const mapStateToProps = state => {
    return {
        isAuth: state.auth.token !== null,
        token: state.auth.token,
        username: state.auth.username
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onClickLogout: () => dispatch(actions.logout())
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Dashboard);
