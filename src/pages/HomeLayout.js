import React from 'react';
import {Layout, Menu, Icon} from 'antd';
import {observer} from 'mobx-react';
import {observable} from 'mobx';
import {Link, withRouter} from 'react-router-dom';
import store from '../store/index'

const {Header, Sider, Content} = Layout;

const SubMenu = Menu.SubMenu;
let NavChildArr = {}
store.NavList.map((item, index) =>
    item.children.map((citem, cindex) => {

        NavChildArr[citem.routepath] = citem.pathname
        return true
    })
)

@observer
class HomeIndexLayout extends React.Component {

    @observable collapsed = false;

    toggle = () => {
        this.collapsed = !this.collapsed;
    }
    loginout = () => {
        store.loginout()
        this.props.history.push('/login')
    }

    render() {
        const {children} = this.props;
        return (
            <Layout className="">
                <Sider
                    className="NavList"
                    trigger={null}
                    collapsible
                    collapsed={this.collapsed}
                    style={{overflow: 'auto', height: '100vh', zIndex: '12', position: 'fixed', left: 0}}
                >
                    <div className="logo">穿藏线后台</div>
                    <CustomSiderMenuWithRouter/>

                </Sider>
                <Layout>
                    <Header theme="dark" style={{padding: 0, position: 'fixed', zIndex: 11, width: '100%'}}>
                        <div className="accountInfo">
                            <div className="accountname">admin</div>
                            <span>|</span>
                            <div className="close" onClick={this.loginout}>退出</div>
                        </div>
                    </Header>
                    <Content style={{margin: '88px 16px 24px 216px ', padding: 24, background: '#fff', minHeight: 280}}>
                        <h3 className="pagetitle">{NavChildArr[this.props.history.location.pathname]}</h3>
                        {children}
                    </Content>
                </Layout>
            </Layout>
        );
    }
}


@observer
class CustomSiderMenu extends React.Component {
    rootSubmenKeys = store.NavList.map((item, index) => index.toString())
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

    componentDidMount() {
        let that = this;
        store.RouterChildList.map((item, index) => {
            item.map((citem, cindex) => {
                if (citem.key === that.props.history.location.pathname) {
                    that.openKeys = [index.toString()]
                    console.log(that.openKeys)
                }
            })
        })
    }

    onOpenChange = (openKeys) => {
        const latestOpenKey = openKeys.find(key => this.openKeys.indexOf(key) === -1);
        console.log(latestOpenKey)

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
                    store.NavList.map((item, index) =>
                        <SubMenu key={index} title={<span><Icon type={item.icon}/><span>{item.pathname}</span></span>}>

                            {item.children.map((citem, cindex) =>
                                <Menu.Item key={citem.key}><Link
                                    to={citem.routepath}>{citem.pathname}</Link></Menu.Item>
                            )}

                        </SubMenu>
                    )}

            </Menu>
        )
    }

}

const CustomSiderMenuWithRouter = withRouter(CustomSiderMenu)


export default HomeIndexLayout