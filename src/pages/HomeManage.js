import React from 'react';
import {Table, Badge, Menu, Dropdown, Icon} from "antd";
import {observable} from "mobx";
import {observer} from "mobx-react";
import service from "../http/http";

import CustomTopFunctionForm from "../component/TopSearch"

class HomeManageData {
    @observable tabledata = []
}

const HomeManageStore = new HomeManageData()

const menu = (
    <Menu>
        <Menu.Item>
            Action 1
        </Menu.Item>
        <Menu.Item>
            Action 2
        </Menu.Item>
    </Menu>
);

function NestedTable() {
    const expandedRowRender = () => {
        const columns = [
            {title: '标题', dataIndex: 'title', key: 'title'},
            {title: '类型', dataIndex: 'type', key: 'type'},
            {title: '顺序', dataIndex:'typeindex',key: 'typeindex',},
            {
                title: '操作',
                dataIndex: 'operation',
                key: 'operation',
                render: () => (
                    <span className="table-operation">
            <a href="javascript:;">编辑</a>
            <a href="javascript:;">删除</a>
          </span>
                ),
            },
        ];

        const data = [];
        for (let i = 0; i < 3; ++i) {
            data.push({
                key: i,
                title: '看看',
                type: 'This is production name',
                typeindex: 'Upgraded: 56',
            });
        }
        return (
            <Table
                columns={columns}
                dataSource={data}
                pagination={false}
            />
        );
    };

    const columns = [
        {title: 'Name', dataIndex: 'name', key: 'name'},
        {title: 'Platform', dataIndex: 'platform', key: 'platform'},
        {title: 'Version', dataIndex: 'version', key: 'version'},
        {title: 'Upgraded', dataIndex: 'upgradeNum', key: 'upgradeNum'},
        {title: 'Creator', dataIndex: 'creator', key: 'creator'},
        {title: 'Date', dataIndex: 'createdAt', key: 'createdAt'},
        {title: 'Action', key: 'operation', render: () => <a href="javascript:;">Publish</a>},
    ];

    const data = [];
    for (let i = 0; i < 3; ++i) {
        data.push({
            key: i,
            name: 'Screem',
            platform: 'iOS',
            version: '10.3.4.5654',
            upgradeNum: 500,
            creator: 'Jack',
            createdAt: '2014-12-24 23:12:00',
        });
    }

    return (
        <Table
            className="components-table-demo-nested"
            columns={columns}
            expandedRowRender={expandedRowRender}
            dataSource={data}
        />
    );
}

@observer
class HomeManage extends React.Component {

    customSetData = (parms = {}, key) => {
        for (let i in parms) {
            if (Object.prototype.toString.call(parms[i]) != "[object Object]") {
                HomeManageStore[key][i] = parms[i]

            }
            if (Object.prototype.toString.call(parms[i]) == '[object Object]') {
                for (let j in parms[i]) {
                    HomeManageStore[key][i][j] = parms[i][j]
                }
            }
        }
    }

    setSearchData = (parms = {}) => {
        console.log(parms)
        console.log("1")
        // this.child.gettabledata({...parms})
        // console.log(this.Ctabledata(parms)
    }
    editArticle = (id) => {
        console.log(id)
        let that = this;
        HomeManageStore.modalInfo = {
            modalTitle: "编辑文章",
            modalVisible: true,
            modalLoading: true,
            modalIsEdit: true
        }
        service.get('https://randomuser.me/api', {
            params: {}
        })
            .then(function (response) {
                HomeManageStore.modalInfo.modalLoading = false
                HomeManageStore.FormData = {
                    title: "草泥马2",
                    image: "https://ss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=1450940714,4183274114&fm=58",
                    type: "1",
                    typeIndex: "2",
                    index: "1"

                }
            })
            .catch(function (error) {
                console.log(error);
            });

    }
    deleteArticle = (Id) => {
        let that = this;
        // const pagination = {...this.props.tabledata.pagination}

        service.post('https://randomuser.me/api', {
            id: Id,
            // page: pagination.current,
            // results: pagination.pageSize,
            // title:that.props.
        })
            .then(function (res) {
                let pagination = {...HomeManageStore.tabledata.pagination}

                that.gettabledata({
                    results: pagination.pageSize,
                    page: pagination.current,
                    title: HomeManageStore.tabledata.searchTitle.length > 0 ? HomeManageStore.searchTitle : undefined,
                })
                that.customSetData({
                    selectedRowKeys: []
                }, "tabledata")
                // HomeManageStore.selectedRowKeys.length = 0

            })

    };

    render() {
        return (
            <div>
                <CustomTopFunctionForm tabledata={HomeManageStore.tabledata} onReciveData={this.setSearchData}/>
                <NestedTable></NestedTable>
            </div>
        )
    }
}

export default HomeManage