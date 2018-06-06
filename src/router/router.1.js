import React, { Component } from 'react';
import createHistory from 'history/createBrowserHistory';
import { Router, Route } from 'react-router-dom';


import LoginPage from "../pages/login";
import todoListPage from "../pages/todoList";
import homePage from "../pages/homeLayout";
import BannerManagePage from "../pages/BannerManage"
// import { Layout } from 'antd';
// import { observer } from 'mobx-react'

var browserHistory = createHistory();


class Routerdiv extends Component {

    render() {
        // const { children } = this.props
        return (
            <Router history={browserHistory}>
                <div>
                    {
                        routes.map((route, i) => (
                            <RouteWithSubRoutes key={i} {...route} />
                        ))
                    }
                </div>
            </Router>
        )
    }
}
const RouteWithSubRoutes = (route) => (
    <Route path={route.path} render={props => (
        // pass the sub-routes down to keep nesting
        <Route {...props} routes={route.routes} />
    )} />
)
const routes = [
    {
        path: '/login',
        component: LoginPage
    },
    {
        path: '/todo',
        component: todoListPage
    },
    {
        path: '/h',
        componet: homePage,
        routes: [
            {
                path: '/h/bannerManage',
                component: BannerManagePage
            },
        ]
    }
]

export default Routerdiv
