import React, { Component } from 'react';
import createHistory from 'history/createBrowserHistory';
import { Router, Route, Redirect, Switch } from 'react-router-dom';
import store from "../store/index"

import LoginPage from "../pages/login";
import todoListPage from "../pages/todoList";
import HomePage from "../pages/HomeLayout";
import BannerManagePage from "../pages/BannerManage"
import HomeManagePage from "../pages/HomeManage"

// import { Layout } from 'antd';
// import { observer } from 'mobx-react'

var browserHistory = createHistory();


class Routerdiv extends Component {

    render() {
        // const { children } = this.props
        return (
            <Router history={browserHistory}>
                <Switch>
                    <Route path="/login" component={LoginPage}></Route>
                    <Route exact path="/" component={() => <Redirect to="/h/bannerManage" />}></Route>
                    <Route path="/h" component={HomePageRouter}></Route>
                    <PrivateRoute component={NoMatch}></PrivateRoute>
                </Switch>
            </Router>
        )
    }
}

const HomePageRouter = ({ match, history }) => (
    <HomePage history={history} >
        <Switch>
            <PrivateRoute exact path={match.url} component={() => <Redirect to="/h/bannerManage" />}></PrivateRoute>
            <PrivateRoute path={`${match.url}/bannerManage`} component={BannerManagePage}></PrivateRoute>
            <PrivateRoute path={`${match.url}/homeManage`} component={HomeManagePage}></PrivateRoute>
            <PrivateRoute path={`${match.url}/todo`} component={todoListPage}></PrivateRoute>
            <PrivateRoute component={NoMatch}></PrivateRoute>
        </Switch>
    </HomePage >

)
const NoMatch = ({ location }) => (
    <div>
        <h3>404</h3>
    </div>
)
const PrivateRoute = ({ component: Component, ...rest }) => (

    <Route {...rest} render={props => {
        // console.log("!")
        return store.isLogin ? (
            <Component {...props} />
        ) : (
                <Redirect to={{
                    pathname: '/login'
                }} />
            )
    }} />
)
export default Routerdiv
