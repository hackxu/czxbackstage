import {observable, action, autorun, computed} from 'mobx';

class AppData {
    @observable isLogin = false
    @observable customLoginout = false;
    @observable token = "";
    @observable NavList = [
        {
            routepath: "",
            icon: "home",
            pathname: "首页管理",
            key: "",
            children: [
                {
                    routepath: "/h/BannerManage",
                    icon: "",
                    pathname: "Banner管理",
                    key: "/h/BannerManage",
                    component: "BannerMangePage"
                },
                {
                    routepath: "/h/HomeManage",
                    icon: "",
                    pathname: "首页管理",
                    key: "/h/HomeManage",
                    component: "HomeManagePage"
                },
            ]
        },
        {
            routepath: "",
            icon: "info-circle-o",
            pathname: "基础信息",
            key: "",
            children: [
                {
                    routepath: "/h/InfoManage",
                    icon: "",
                    pathname: "资讯管理",
                    key: "/h/InfoManage",
                    component: "InfoManagePage"
                },
                {
                    routepath: "/h/EncyclopediaManage",
                    icon: "",
                    pathname: "百科管理",
                    key: "/h/EncyclopediaManage",
                    component: "EncyclopediaManagePage"
                },
                {
                    routepath: "/h/EventInfo",
                    icon: "",
                    pathname: "活动管理",
                    key: "/h/EventInfo",
                    component: "EventInfoPage"
                },
                {
                    routepath: "/h/TibetanInfo",
                    icon: "",
                    pathname: "藏历管理",
                    key: "/h/TibetanInfo",
                    component: "TibetanInfoPage"
                },
                {
                    routepath: "/h/HotSearchInfo",
                    icon: "",
                    pathname: "热搜管理",
                    key: "/h/HotSearchInfo",
                    component: "HotSearchInfoPage"
                },
                {
                    routepath: "/h/FleetManage",
                    icon: "",
                    pathname: "车队管理",
                    key: "/h/FleetManage",
                    component: "FleetManagePage"
                },
            ]
        },
        {
            routepath: "",
            icon: "pushpin",
            pathname: "景点信息管理",
            key: "",
            children: [
                {
                    routepath: "/h/TibetArea",
                    icon: "",
                    pathname: "西藏区域",
                    key: "/h/TibetArea",
                    component: "TibetAreaPage"
                },
                {
                    routepath: "/h/Attractions",
                    icon: "",
                    pathname: "景点",
                    key: "/h/Attractions",
                    component: "AttractionsPage"
                },
                {
                    routepath: "/h/AttractionsDistance",
                    icon: "",
                    pathname: "景点距离",
                    key: "/h/AttractionsDistance",
                    component: "AttractionsDistancePage"
                },
                {
                    routepath: "/h/TimeArea",
                    icon: "",
                    pathname: "区域耗时",
                    key: "/h/TimeArea",
                    component: "TimeAreaPage"
                }
            ]
        },
        {
            routepath: "",
            icon: "like",
            pathname: "官方推荐",
            key: "",
            children: [
                {
                    routepath: "/h/RecommendedRaiders",
                    icon: "",
                    pathname: "推荐攻略",
                    key: "/h/RecommendedRaiders",
                    component: "RecommendedRaidersPage"
                },
                {
                    routepath: "/h/RecommendedTravel",
                    icon: "",
                    pathname: "推荐游记",
                    key: "/h/RecommendedTravel",
                    component: "RecommendedTravelPage"
                },
            ]
        },
        {
            routepath: "",
            icon: "bars",
            pathname: "系统信息管理",
            key: "",
            children: [
                {
                    routepath: "/h/SystemSetting",
                    icon: "",
                    pathname: "系统配置",
                    key: "/h/SystemSetting",
                    component: "SystemSettingPage"
                },
                {
                    routepath: "/h/WelcomeScreen",
                    icon: "",
                    pathname: "欢迎界面",
                    key: "/h/WelcomeScreen",
                    component: "WelcomeScreenPage"
                },
                {
                    routepath: "/h/AppVersion",
                    icon: "",
                    pathname: "APP版本",
                    key: "/h/AppVersion",
                    component: "AppVersionPage"
                },
                {
                    routepath: "/h/Feedback",
                    icon: "",
                    pathname: "用户反馈",
                    key: "/h/Feedback",
                    component: "FeedbackPage"
                },
            ]
        }, {
            routepath: "",
            icon: "user",
            pathname: "客户信息浏览",
            key: "",
            children: [
                {
                    routepath: "/h/CustomerJourney",
                    icon: "",
                    pathname: "客户行程",
                    key: "/h/CustomerJourney",
                    component: "CustomerJourneyPage"
                },
                {
                    routepath: "/h/AssignedFleet",
                    icon: "",
                    pathname: "分配车队",
                    key: "/h/AssignedFleet",
                    component: "AssignedFleetPage"
                },
                {
                    routepath: "/h/CustomerManage",
                    icon: "",
                    pathname: "客户管理",
                    key: "/h/CustomerManage",
                    component: "CustomerManagePage"
                }
            ]
        },
        {
            routepath: "",
            icon: "bar-chart",
            pathname: "客户其他信息",
            key: "",
            children: [
                {
                    routepath: "/h/CommentForm",
                    icon: "",
                    pathname: "评论表",
                    key: "/h/CommentForm",
                    component: "CommentFormPage"
                },
                {
                    routepath: "/h/CustomerList",
                    icon: "",
                    pathname: "客户收藏表",
                    key: "/h/CustomerList",
                    component: "CustomerListPage"
                }
            ]
        },
    ]

    @computed get RouterList() {
        const RouterListArr = []
        this.NavList.map((item, index) => RouterListArr.push(...item.children))
        // console.log(RouterListArr)
        return RouterListArr
    }

    @computed get RouterChildList() {
        const RouterListArr = []
        this.NavList.map((item, index) => RouterListArr.push(item.children))
        // console.log(RouterListArr)
        return RouterListArr
    }

    // @observable todos = {};
    // @computed get unfinishedTodoCount() {
    //     return this.todos.filter(todo => !todo.finished).length
    // }
    // @action changeTodos(t) {
    //     this.todos = t
    // }

    @action login() {
        this.isLogin = true;
        this.customLoginout = false
    }

    @computed get checkLoginOut() {

        return this.customLoginout && !localStorage.getItem('isLogin')
    }

    @action loginout() {
        this.isLogin = false;
        this.customLoginout = true;
    }

    @action setToken(t) {
        this.token = t
    }
}

const store = new AppData()

autorun((e) => {
    console.log('登入情况', store.isLogin)
    if (store.isLogin) {
        console.log("绝对登入")
        localStorage.setItem("isLogin", "true")
        store.token = localStorage.getItem("token")
        return
    } else {
        if (store.customLoginout) {
            console.log("手动登出")
            localStorage.removeItem("isLogin")
            localStorage.removeItem("token")
            store.token = ""
            return false
        }
        if (localStorage.getItem('isLogin')) {
            console.log("刷新导致的登入为false")
            store.isLogin = true
            localStorage.setItem("isLogin", "true")
            store.token = localStorage.getItem("token")
            return

        } else {
            console.log("本来就是登出状态")
        }
    }
})

// console.log(store)
export default store