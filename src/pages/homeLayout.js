import React from 'react';
import { Layout, Menu, Icon } from 'antd';
import { observer } from 'mobx-react';
import { observable } from 'mobx';
import { Link, withRouter } from 'react-router-dom';
import store from '../store/index'
const { Header, Sider, Content } = Layout;

const SubMenu = Menu.SubMenu;
const NavList = [
    {
        routepath: "",
        icon: "home",
        pathname: "首页管理",
        key: "",
        children: [
            {
                routepath: "/h/bannerManage",
                icon: "",
                pathname: "Banner管理",
                key: "/h/bannerManage"
            },
            {
                routepath: "/h/homeManage",
                icon: "",
                pathname: "首页管理",
                key: "/h/homeManage"
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
                routepath: "",
                icon: "",
                pathname: "资讯管理",
                key: ""
            },
            {
                routepath: "",
                icon: "",
                pathname: "百科管理",
                key: ""
            },
            {
                routepath: "",
                icon: "",
                pathname: "活动管理",
                key: ""
            },
            {
                routepath: "",
                icon: "",
                pathname: "藏历管理",
                key: ""
            },
            {
                routepath: "",
                icon: "",
                pathname: "热搜管理",
                key: ""
            },
            {
                routepath: "",
                icon: "",
                pathname: "车队管理",
                key: ""
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
                routepath: "",
                icon: "",
                pathname: "西藏区域",
                key: ""
            },
            {
                routepath: "",
                icon: "",
                pathname: "景点",
                key: ""
            },
            {
                routepath: "",
                icon: "",
                pathname: "景点距离",
                key: ""
            },
            {
                routepath: "",
                icon: "",
                pathname: "区域耗时",
                key: ""
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
                routepath: "",
                icon: "",
                pathname: "推荐攻略",
                key: ""
            },
            {
                routepath: "",
                icon: "",
                pathname: "推荐游记",
                key: ""
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
                routepath: "",
                icon: "",
                pathname: "系统配置",
                key: ""
            },
            {
                routepath: "",
                icon: "",
                pathname: "欢迎界面",
                key: ""
            },
            {
                routepath: "",
                icon: "",
                pathname: "APP版本",
                key: ""
            },
            {
                routepath: "",
                icon: "",
                pathname: "用户反馈",
                key: ""
            },
        ]
    }, {
        routepath: "",
        icon: "user",
        pathname: "客户信息浏览",
        key: "",
        children: [
            {
                routepath: "",
                icon: "",
                pathname: "客户行程",
                key: ""
            },
            {
                routepath: "",
                icon: "",
                pathname: "分配车队",
                key: ""
            },
            {
                routepath: "",
                icon: "",
                pathname: "客户管理",
                key: ""
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
                routepath: "",
                icon: "",
                pathname: "评论表",
                key: ""
            },
            {
                routepath: "",
                icon: "",
                pathname: "客户收藏表",
                key: ""
            }
        ]
    },
]
let NavChildArr = {}
NavList.map((item, index) =>
    item.children.map((citem, cindex) => {

        NavChildArr[citem.routepath] = citem.pathname
        return true
    })
)
@observer class HomeIndexLayout extends React.Component {

    @observable collapsed = false;

    toggle = () => {
        this.collapsed = !this.collapsed;
    }
    loginout = () => {
        store.loginout()
        this.props.history.push('/login')
    }
    render() {
        const { children } = this.props;
        return (
            <Layout className="">
                <Sider
                    className="NavList"
                    trigger={null}
                    collapsible
                    collapsed={this.collapsed}
                    style={{ overflow: 'auto', height: '100vh', zIndex: '2', position: 'fixed', left: 0 }}
                >
                    <div className="logo" >穿藏线后台</div>
                    <CustomSiderMenuWithRouter />

                </Sider>
                <Layout>
                    <Header theme="dark" style={{ padding: 0, position: 'fixed', zIndex: 1, width: '100%' }}>
                        <div className="accountInfo">
                            <div className="accountname">admin</div>
                            <span>|</span>
                            <div className="close" onClick={this.loginout}>退出</div>
                        </div>
                    </Header>
                    <Content style={{ margin: '88px 16px 24px 216px ', padding: 24, background: '#fff', minHeight: 280 }}>
                        <h3 className="pagetitle">{NavChildArr[this.props.history.location.pathname]}</h3>
                    {children}
                    </Content>
            </Layout>
            </Layout >
        );
    }
}


@observer class CustomSiderMenu extends React.Component {
    rootSubmenKeys = NavList.map((item, index) => index.toString())
    @observable openKeys = ["0"];
    // @observable selectedKeys = [this.props.history.pathname];

    // onSelect = (item) => {
    //     console.log(item)

    //     this.selectedKeys = item.keyPath
    // }
    componentWillReceiveProps() {
        // console.log(NavChildArr)
        // console.log(this.props.history)
    }
    onOpenChange = (openKeys) => {
        const latestOpenKey = openKeys.find(key => this.openKeys.indexOf(key) === -1);
        if (this.rootSubmenKeys.indexOf(latestOpenKey) === -1) {
            if (this.openKeys.length === 1 && latestOpenKey) {
                this.openKeys[this.openKeys.length] = latestOpenKey
            } else {
                this.openKeys.length = 1
            }

        } else {
            this.openKeys = latestOpenKey ? [latestOpenKey] : []
        }
    }
    render() {
        // console.log(NavList)

        return (

            <Menu
                theme="dark"
                mode="inline"
                openKeys={this.openKeys.slice()}
                onOpenChange={this.onOpenChange}
                selectedKeys={[this.props.history.location.pathname]}
            // defaultSelectedKeys={NavCountChildKey + 1}
            >
                {
                    NavList.map((item, index) =>
                        <SubMenu key={index} title={<span><Icon type={item.icon} /><span>{item.pathname}</span></span>}>

                            {item.children.map((citem, cindex) =>
                                <Menu.Item key={citem.key}><Link to={citem.routepath}>{citem.pathname}</Link></Menu.Item>
                            )}

                        </SubMenu>

                    )}

            </Menu>
        )
    }

}
const CustomSiderMenuWithRouter = withRouter(CustomSiderMenu)


export default HomeIndexLayout