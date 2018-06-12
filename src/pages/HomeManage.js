import React from 'react';
import {Table, Button, Modal, Form, Input, Select, Popconfirm} from "antd";
import {observable, toJS} from "mobx";
import {observer} from "mobx-react";
import service from "../http/http";

import CustomTopFunctionForm from "../component/TopSearch"
import store from "../store";
import CustomLoading from '../component/CustomLoading'
import {commoncustomSetData} from "../util";

const FormItem = Form.Item;
const Option = Select.Option

class HomeManageData {
    @observable tabledata = {
        HomeBigList: [],
        HomeSmallList: [
            [
                {
                    "key": 0,
                    "name": "Screem0",
                    "type": "文章资讯0",
                    "index": 0
                },
                {
                    "key": 1,
                    "name": "Screem1",
                    "type": "文章资讯1",
                    "index": 1
                },
                {
                    "key": 2,
                    "name": "Screem2",
                    "type": "文章资讯2",
                    "index": 2
                }
            ],
            [
                {
                    "key": 0,
                    "name": "Screem0",
                    "type": "文章资讯3",
                    "index": 0
                },
                {
                    "key": 1,
                    "name": "Screem1",
                    "type": "文章资讯4",
                    "index": 1
                },
                {
                    "key": 2,
                    "name": "Screem2",
                    "type": "文章资讯5",
                    "index": 2
                }
            ],
            [
                {
                    "key": 0,
                    "name": "Screem0",
                    "type": "文章资讯6",
                    "index": 0
                },
                {
                    "key": 1,
                    "name": "Screem1",
                    "type": "文章资讯7",
                    "index": 1
                },
                {
                    "key": 2,
                    "name": "Screem2",
                    "type": "文章资讯8",
                    "index": 2
                }
            ],
        ],
        searchTitle: "",
        loading: false
        // pagination: {}
    }

    @observable modalInfo = {
        modalTitle: "",
        modalVisible: false,
        modalLoading: false,
        modalIsEdit: false,
        modalChildVisible: false
    }
    @observable FormData = {
        title: "",
        index: "",
        type: "",
    }
    @observable FormChildData = {
        childIndex: "",
        childIndexNumber: "",
    }
    @observable selectData = {
        selectType: [
            {
                id: "1",
                name: "草泥马"
            },
            {
                id: "2",
                name: "草泥马2"
            },
            {
                id: "3",
                name: "草泥马3"
            },
            {
                id: "4",
                name: "草泥马4"
            },
            {
                id: "5",
                name: "草泥马5"
            },
            {
                id: "6",
                name: "草泥马6"
            },
        ],
        childSelectData: [
            {
                id: "1",
                name: "草泥马"
            },
            {
                id: "2",
                name: "草泥马2"
            },
            {
                id: "3",
                name: "草泥马3"
            },
            {
                id: "4",
                name: "草泥马4"
            },
            {
                id: "5",
                name: "草泥马5"
            },
            {
                id: "6",
                name: "草泥马6"
            },
        ]
    }

    // @action initData = () => {
    //
    //     service.get('https://randomuser.me/api', {
    //         params: {}
    //     })
    //         .then(function (response) {
    //             console.log(response)
    //         })
    //         .catch(function (error) {
    //             console.log(error);
    //         });
    // }

}

const HomeManageStore = new HomeManageData()


@observer
class HomeManage extends React.Component {

    componentDidMount() {
        this.gettabledata()
    }

    customSetData = (parms = {}, key) => {
        // console.log(parms)
        // console.log(key)
        for (let i in parms) {
            if (Object.prototype.toString.call(parms[i]) != "[object Object]") {
                HomeManageStore[key][i] = parms[i]
                // console.log("cao", HomeManageStore[key][i])
            }
            if (Object.prototype.toString.call(parms[i]) == '[object Object]') {
                for (let j in parms[i]) {
                    HomeManageStore[key][i][j] = parms[i][j]
                }
            }
        }
    }
    customResetFormData = (key) => {
        for (let i in HomeManageStore[key]) {
            if (Object.prototype.toString.call(key[i]) != "[object Object]") {
                HomeManageStore[key][i] = ""
            }

        }
    }
    gettabledata = (params = {}) => {
        let that = this;
        // console.log(this)
        // console.log(params)
        this.customSetData({
            loading: true,
            // pagination: {current: params.page ? params.page : 1}
        }, "tabledata")

        if (params.title && params.title.length > 0) {
            this.customSetData({
                searchTitle: params.title
            }, "tabledata")
            delete params.title
        } else {
            this.customSetData({
                searchTitle: ""
            }, "tabledata")
            delete params.title
        }
        delete params.page

        service.get('https://randomuser.me/api', {
            params: {
                // results: 10,
                // page: 1,
                title: HomeManageStore.tabledata.searchTitle.length > 0 ? HomeManageStore.tabledata.searchTitle : undefined,
                ...params
            }
        })
            .then(function (response) {
                // console.log(response);
                // const pagination = {...HomeManageStore.tabledata.pagination}
                //
                // pagination.total = 200;
                // console.log(response)
                that.customSetData({
                    loading: false,
                    HomeBigList: response.results,
                    // pagination: pagination,
                }, "tabledata")

            })
            .catch(function (error) {
                console.log(error);
            });

        // console.log(HomeManageStore)
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
                    type: "1",
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
                // let pagination = {...HomeManageStore.tabledata.pagination}

                that.gettabledata({
                    // results: pagination.pageSize,
                    // page: pagination.current,
                    title: HomeManageStore.tabledata.searchTitle.length > 0 ? HomeManageStore.searchTitle : undefined,
                })
                that.customSetData({
                    selectedRowKeys: []
                }, "tabledata")
                // HomeManageStore.selectedRowKeys.length = 0

            })

    };
    handleAddArticle = () => {
        this.customSetData({
            modalTitle: "新增首页",
            modalVisible: true,
            modalLoading: false,
        }, "modalInfo")
    }
    handleAddChildArticle = () => {
        console.log("出现吧子集")
        this.customSetData({
            modalTitle: "新增子集",
            modalChildVisible: true,
            modalLoading: false,
        }, "modalInfo")
        console.log(HomeManageStore.modalInfo)
    }

    render() {
        return (
            <div>
                <CustomTopFunctionForm tabledata={HomeManageStore.tabledata}
                                       onReciveData={this.gettabledata}/>
                <div style={{marginBottom: 12}}>
                    <Button type="primary" onClick={this.handleAddArticle} icon="plus">添加</Button>
                </div>
                <CustomAddData data={HomeManageStore.modalInfo}
                               customSetData={this.customSetData}
                               customResetFormData={this.customResetFormData}
                               formData={HomeManageStore.FormData}
                               selectData={HomeManageStore.selectData}></CustomAddData>
                <CustomAddChildData data={HomeManageStore.modalInfo}
                                    customSetData={this.customSetData}
                                    customResetFormData={this.customResetFormData}
                                    formChildData={HomeManageStore.FormChildData}
                                    selectData={HomeManageStore.selectData}></CustomAddChildData>

                <NestedTable tabledata={HomeManageStore.tabledata} editArticle={this.editArticle}
                             handleAddChildArticle={this.handleAddChildArticle}
                             deleteArticle={this.deleteArticle}></NestedTable>
            </div>
        )
    }
}


@observer
class NestedTable extends React.Component {
    @observable  columns = [
        {title: '标题', dataIndex: 'name', key: 'name'},
        {title: '类型', dataIndex: 'type', key: 'type'},
        {title: '顺序', dataIndex: 'index', key: 'index'},
        {
            title: '操作', key: 'operation',
            render: (text, record, index) => {
                const Id = record.cell;
                return <span className="table-operation">
                        <a href="javascript:;" onClick={() => this.props.handleAddChildArticle()}>新增</a>
                        <a href="javascript:;" onClick={() => this.props.editArticle(Id)}>编辑</a>
                    <Popconfirm title="确定删除？" onConfirm={() => this.props.deleteArticle(Id)}>
                        <a href="javascript:;">删除</a>
                    </Popconfirm>
                    </span>
            }
        },
    ];

    render() {
        const {loading, HomeBigList} = toJS(this.props.tabledata)

        return (
            <div>
                <Table
                    rowKey={record => record.cell}
                    loading={loading}
                    className="components-table-demo-nested"
                    columns={this.columns.slice()}
                    expandedRowRender={expandedRowRender}
                    dataSource={HomeBigList}
                    pagination={false}
                />
            </div>
        );
    }

}


const expandedRowRender = (e) => {
    console.log(e)
    const columns = [
        {title: '标题', dataIndex: 'name', key: 'name'},
        {title: '类型', dataIndex: 'type', key: 'type'},
        {title: '顺序', dataIndex: 'index', key: 'index'},
        {
            title: '操作',
            dataIndex: 'operation',
            key: 'operation',
            render: (text, record, index) => {
                console.log(record)
                const Id = record.index;
                return <span className="table-operation">
                        <a href="javascript:;" onClick={() => editChildArticle(Id)}>编辑</a>
                    <Popconfirm title="确定删除？" onConfirm={() => deleteChildArticle(Id)}>
                        <a href="javascript:;">删除</a>
                    </Popconfirm>
                    </span>
            },
        },
    ];
    const editChildArticle = (id) => {
        console.log("出现吧子集")
        commoncustomSetData({
            modalTitle: "编辑子集",
            modalChildVisible: true,
            modalLoading: true,
        }, HomeManageStore, "modalInfo")
        service.get('https://randomuser.me/api', {
            params: {}
        })
            .then(function (response) {
                HomeManageStore.modalInfo.modalLoading = false
                HomeManageStore.FormChildData = {
                    childIndex: "1",
                    childIndexNumber: "1"

                }
            })
            .catch(function (error) {
                console.log(error);
            });

    }
    const deleteChildArticle = (Id) => {
        let that = this;

        console.log(Id)
        service.post('https://randomuser.me/api', {
            id: Id,

        })
            .then(function (res) {
                // let pagination = {...HomeManageStore.tabledata.pagination}

                that.gettabledata({
                    // results: pagination.pageSize,
                    // page: pagination.current,
                    title: HomeManageStore.tabledata.searchTitle.length > 0 ? HomeManageStore.searchTitle : undefined,
                })
                that.customSetData({
                    selectedRowKeys: []
                }, "tabledata")
                // HomeManageStore.selectedRowKeys.length = 0

            })

    };

    return (
        <Table
            columns={columns}
            dataSource={HomeManageStore.tabledata.HomeSmallList[0].slice()}
            pagination={false}
            // rowKey={record => record.cell}
        />
    );
};


@observer
class AddData extends React.Component {
    handleReset = (e) => {
        this.props.customSetData({
            modalVisible: false
        }, "modalInfo")

        this.props.form.resetFields()

        this.props.customResetFormData("FormData")
    }

    componentDidMount() {
        service.get('https://randomuser.me/api', {
            params: {}
        })
            .then(function (response) {

                // console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    handleSubmit = (e) => {
        var that = this;

        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {

            console.log(err)
            if (!err) {
                console.log(values);
                setTimeout(() => {
                    that.props.customResetFormData("FormData")
                    that.props.customSetData({
                        modalVisible: false
                    }, "modalInfo")
                    // console.log(this.props.formData)
                }, 2000)
            }
        })
    }

    handleChange = (e) => {
        console.log(`selected${e}`)
    }


    handleConfirmIndex = (rule, value, callback) => {
        console.log(value)
        if (value < 0) {
            callback('请检查顺序')
        }
        callback()
    }


    render() {
        // console.log(this.props.data)
        const {getFieldDecorator} = this.props.form;
        const {modalTitle, modalVisible, modalLoading} = this.props.data;
        const {selectType} = this.props.selectData;
        const {title, type, index} = this.props.formData
        return (
            <Modal title={modalTitle} visible={modalVisible}
                   onOk={this.handleSubmit}
                   onCancel={this.handleReset}
                   destroyOnClose={true}
                   className="AddBanner">
                {modalLoading ? <CustomLoading></CustomLoading> : ""}
                <Form onSubmit={this.handleSubmit} onReset={this.handleReset}>
                    <FormItem label="标题">
                        {getFieldDecorator('title', {
                            initialValue: title,
                            rules: [{required: true, message: '请输入标题'}]
                        })(
                            <Input placeholder="请输入标题"/>
                        )}
                    </FormItem>
                    <FormItem label="类型">
                        {getFieldDecorator('type', {
                            initialValue: type,
                            rules: [{required: true, message: '请选择类型'}]
                        })(
                            <Select style={{width: 175}} onChange={this.handleChange}>
                                {selectType.map(item => <Option key={item.id} value={item.id}>{item.name}</Option>)}
                            </Select>
                        )}
                    </FormItem>

                    <FormItem label="顺序">
                        {getFieldDecorator('index', {
                            initialValue: index,
                            rules: [{required: true, message: '请选择顺序'}, {validator: this.handleConfirmIndex}]
                        })(
                            <Input type="number" min="0"/>
                        )}
                    </FormItem>
                </Form>


            </Modal>
        )
    }
}

const CustomAddData = Form.create()(AddData)

@observer
class AddChildData extends React.Component {
    handleReset = (e) => {
        this.props.customSetData({
            modalChildVisible: false
        }, "modalInfo")

        this.props.form.resetFields()

        this.props.customResetFormData("FormChildData")
    }

    componentDidMount() {
        console.log("kaishi")
        service.get('https://randomuser.me/api', {
            params: {}
        })
            .then(function (response) {

                // console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    handleSubmit = (e) => {
        var that = this;

        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {

            console.log(err)
            if (!err) {
                console.log(values);
                setTimeout(() => {
                    that.props.customResetFormData("FormChildData")
                    that.props.customSetData({
                        modalChildVisible: false
                    }, "modalInfo")
                    console.log(HomeManageStore.modalInfo)
                    // console.log(this.props.formData)
                }, 2000)
            }
        })
    }

    handleChange = (e) => {
        console.log(`selected${e}`)
    }


    handleConfirmIndex = (rule, value, callback) => {
        console.log(value);
        if (value < 0) {
            callback('请检查顺序')
        }
        callback()
    }

    render() {
        // console.log(this.props.data)
        const {getFieldDecorator} = this.props.form;
        const {modalTitle, modalChildVisible, modalLoading} = this.props.data;
        const {selectType} = this.props.selectData;
        const {childIndexNumber, childIndex} = this.props.formChildData

        return (
            <Modal title={modalTitle} visible={modalChildVisible}
                   onOk={this.handleSubmit}
                   onCancel={this.handleReset}
                   destroyOnClose={true}
                   className="AddBanner">
                {modalLoading ? <CustomLoading></CustomLoading> : ""}
                <Form onSubmit={this.handleSubmit} onReset={this.handleReset}>
                    <FormItem label="类型">
                        {getFieldDecorator('type', {
                            initialValue: childIndexNumber,
                            rules: [{required: true, message: '请选择类型'}]
                        })(
                            <Select style={{width: 175}} onChange={this.handleChange}>
                                {selectType.map(item => <Option key={item.id} value={item.id}>{item.name}</Option>)}
                            </Select>
                        )}
                    </FormItem>

                    <FormItem label="顺序">
                        {getFieldDecorator('index', {
                            initialValue: childIndex,
                            rules: [{required: true, message: '请选择顺序'}, {validator: this.handleConfirmIndex}]
                        })(
                            <Input type="number" min="0"/>
                        )}
                    </FormItem>
                </Form>
            </Modal>
        )
    }
}

const CustomAddChildData = Form.create()(AddChildData)


export default HomeManage