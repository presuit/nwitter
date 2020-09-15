import React from "react";
import { HashRouter, Route, Switch } from "react-router-dom";
import Home from "../Routes/Home";
import Auth from "../Routes/Auth";
import Profile from "../Routes/Profile";
import Navigation from "./Navigation";
import PropTypes from "prop-types";

const AppRouter = ({ isLoggedIn, userObj, refreshUser }) => {
    return (
        <HashRouter>
            {isLoggedIn && <Navigation userObj={userObj} />}
            <Switch>
                {isLoggedIn ? (
                    <>
                        <Route path="/" exact>
                            <Home userObj={userObj}></Home>
                        </Route>
                        <Route path="/profile">
                            <Profile userObj={userObj} refreshUser={refreshUser}></Profile>
                        </Route>
                    </>
                ) : (
                    <Route path="/" exact>
                        <Auth></Auth>
                    </Route>
                )}
            </Switch>
        </HashRouter>
    );
};

AppRouter.propTypes = {
    isLoggedIn: PropTypes.bool.isRequired,
    userObj: PropTypes.object.isRequired,
    refreshUser: PropTypes.func.isRequired,
};

export default AppRouter;
