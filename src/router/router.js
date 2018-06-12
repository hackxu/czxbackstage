import React, {Component} from 'react';
import createHistory from 'history/createBrowserHistory';
import {Router, Route, Redirect, Switch} from 'react-router-dom';
import store from "../store/index"
import {toJS} from 'mobx'

import loginPage from "../pages/login";
// import todoListPage from "../pages/todoList";
import HomePage from "../pages/HomeLayout";
import BannerManagePage from "../pages/BannerManage"
import HomeManagePage from "../pages/HomeManage"

import InfoManagePage from "../pages/InfoManage"
import EncyclopediaManagePage from "../pages/EncyclopediaManage"
import EventInfoPage from "../pages/EventInfo"
import TibetanInfoPage from "../pages/TibetanInfo"
import HotSearchInfoPage from "../pages/HotSearchInfo"
import FleetManagePage from "../pages/FleetManage"

import TibetAreaPage from "../pages/TibetArea"
import AttractionsPage from "../pages/Attractions"
import AttractionsDistancePage from "../pages/AttractionsDistance"
import TimeAreaPage from "../pages/TimeArea"

import RecommendedRaidersPage from "../pages/RecommendedRaiders"
import RecommendedTravelPage from "../pages/RecommendedTravel"

import SystemSettingPage from "../pages/SystemSetting"
import WelcomeScreenPage from "../pages/WelcomeScreen"
import AppVersionPage from "../pages/AppVersion"
import FeedbackPage from "../pages/Feedback"

import CustomerJourneyPage from "../pages/CustomerJourney"
import AssignedFleetPage from "../pages/AssignedFleet"
import CustomerManagePage from "../pages/CustomerManage"

import CommentFormPage from "../pages/CommentForm"
import CustomerListPage from "../pages/CustomerList"

// import { Layout } from 'antd';
// import { observer } from 'mobx-react'

var browserHistory = createHistory();


class Routerdiv extends Component {

    render() {
        // const { children } = this.props
        return (
            <Router history={browserHistory}>
                <Switch>
                    <Route path="/login" component={loginPage}></Route>
                    <Route exact path="/" component={() => <Redirect to="/h/bannerManage"/>}></Route>
                    <Route path="/h" component={HomePageRouter}></Route>
                    <PrivateRoute component={NoMatch}></PrivateRoute>
                </Switch>
            </Router>
        )
    }
}

const HomePageRouter = ({match, history}) => (
    <HomePage key="homepage" history={history}>
        <Switch>

            <PrivateRoute exact path={match.url} component={() => <Redirect to="/h/bannerManage"/>}></PrivateRoute>
            {/*{store.RouterList.map((item, index) => <PrivateRoute path={item.routepath} component={item.component}></PrivateRoute>)}*/}

            <PrivateRoute path={`${match.url}/BannerManage`} component={BannerManagePage}></PrivateRoute>
            <PrivateRoute path={`${match.url}/HomeManage`} component={HomeManagePage}></PrivateRoute>
            <PrivateRoute path={`${match.url}/InfoManage`} component={InfoManagePage}></PrivateRoute>
            <PrivateRoute path={`${match.url}/EncyclopediaManage`} component={EncyclopediaManagePage}></PrivateRoute>
            <PrivateRoute path={`${match.url}/EventInfo`} component={EventInfoPage}></PrivateRoute>
            <PrivateRoute path={`${match.url}/TibetanInfo`} component={TibetanInfoPage}></PrivateRoute>
            <PrivateRoute path={`${match.url}/HotSearchInfo`} component={HotSearchInfoPage}></PrivateRoute>
            <PrivateRoute path={`${match.url}/FleetManage`} component={FleetManagePage}></PrivateRoute>
            <PrivateRoute path={`${match.url}/TibetArea`} component={TibetAreaPage}></PrivateRoute>
            <PrivateRoute path={`${match.url}/Attractions`} component={AttractionsPage}></PrivateRoute>
            <PrivateRoute path={`${match.url}/AttractionsDistance`} component={AttractionsDistancePage}></PrivateRoute>
            <PrivateRoute path={`${match.url}/TimeAreaPage`} component={TimeAreaPage}></PrivateRoute>
            <PrivateRoute path={`${match.url}/RecommendedRaiders`} component={RecommendedRaidersPage}></PrivateRoute>
            <PrivateRoute path={`${match.url}/RecommendedTravel`} component={RecommendedTravelPage}></PrivateRoute>
            <PrivateRoute path={`${match.url}/SystemSetting`} component={SystemSettingPage}></PrivateRoute>
            <PrivateRoute path={`${match.url}/WelcomeScreen`} component={WelcomeScreenPage}></PrivateRoute>
            <PrivateRoute path={`${match.url}/AppVersion`} component={AppVersionPage}></PrivateRoute>
            <PrivateRoute path={`${match.url}/Feedback`} component={FeedbackPage}></PrivateRoute>
            <PrivateRoute path={`${match.url}/CustomerJourney`} component={CustomerJourneyPage}></PrivateRoute>
            <PrivateRoute path={`${match.url}/AssignedFleetPage`} component={AssignedFleetPage}></PrivateRoute>
            <PrivateRoute path={`${match.url}/CustomerManage`} component={CustomerManagePage}></PrivateRoute>
            <PrivateRoute path={`${match.url}/CommentForm`} component={CommentFormPage}></PrivateRoute>
            <PrivateRoute path={`${match.url}/CustomerList`} component={CustomerListPage}></PrivateRoute>
            {/*<PrivateRoute path={`${match.url}/todo`} component={todoListPage}></PrivateRoute>*/}
            <PrivateRoute component={NoMatch}></PrivateRoute>
        </Switch>
    </HomePage>

)

// const RouteWithSubRoutes = (route) => (
//     <PrivateRoute path={route.path} component={route.component}/>
// )
const NoMatch = ({location}) => (
    <div>
        <h3>404</h3>
    </div>
)
const PrivateRoute = ({component: Component, ...rest}) => (

    <Route {...rest} render={props => {
        // console.log("!")
        return store.isLogin ? (
            <Component {...props} />
        ) : (
            <Redirect to={{
                pathname: '/login'
            }}/>
        )
    }}/>
)
export default Routerdiv
