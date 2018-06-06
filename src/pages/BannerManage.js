import React from 'react';
import {Form, Input, Button, Table, Popconfirm, Select, Modal} from 'antd'
import {observable, toJS} from 'mobx';
import {observer} from 'mobx-react';
// import store from '../store/index'
import service from '../http/http'

import UploadImg from '../component/UploadImg'
import CustomTopFunctionForm from '../component/TopSearch'
const FormItem = Form.Item;
const Option = Select.Option;

class BannerManageData {
    @observable tabledata = {
        data: [],
        pagination: {
            pageSize: 10,
            total: 0,
            showSizeChanger: true,
            showQuickJumper: true,
            current: 1
        },
        loading: false
    }
    @observable selectedRowKeys = []
    @observable searchTitle = ""
    @observable modalInfo = {
        modalTitle: "",
        modalVisible: false,
        modalLoading: false
    }
}

const BannerManageStore = new BannerManageData()

const deleteArticle = (Id) => {
    // console.log({ id: [Id] })
    // console.log({ id: Id })
    // BannerManageStore.tabledata.loading = true

    service.post('https://randomuser.me/api', {
        params: {
            id: Id
        }
    })
        .then(function (res) {
            let BannerManagef = new BannerManage()
            let pagination = {...BannerManageStore.tabledata.pagination}

            BannerManagef.gettabledata({
                results: pagination.pageSize,
                page: pagination.current,
                title: BannerManageStore.searchTitle.length > 0 ? BannerManageStore.searchTitle : undefined,
            })
            BannerManageStore.selectedRowKeys.length = 0

        })

};


const columns = [
    {
        title: 'Name',
        dataIndex: 'name',
        sorter: true,
        render: name => `${name.first} ${name.last}`,
        width: '20%',
    }, {
        title: 'Gender',
        dataIndex: 'gender',
        filters: [
            {text: 'Male', value: 'male'},
            {text: 'Female', value: 'female'},
        ],
        width: '20%',
    }, {
        title: 'Email',
        dataIndex: 'email',
    },
    {
        title: "操作",
        dataIndex: "",
        key: "x",
        render: (text, record, index) => {
            const Id = record.cell
            return <div>
                <a href="javascript:;">编辑</a>
                <Popconfirm title="确定删除？" onConfirm={() => deleteArticle(Id)}>
                    <a style={{marginLeft: 12}} href="#">删除</a>
                </Popconfirm>
            </div>
        }
    }

];
// const columnss = [
//     {
//         title: '标题',
//         dataIndex: 'title',
//         key: 'title',
//     },
//     {
//         title: '类型标题',
//         dataIndex: 'typetitle',
//         key: 'typetitle',
//     },
//     {
//         title: '类型',
//         dataIndex: 'type',
//         key: 'type',
//     },
//     {
//         title: '顺序',
//         dataIndex: 'index',
//         key: 'index',
//     },
//     {
//         title: '背景图',
//         dataIndex: 'backgroundimg',
//         key: 'backgroundimg',
//         width: "120px",
//         render: (e) => <img src={e}/>
//     },
//     {
//         title: "操作",
//         dataIndex: "",
//         key: "x",
//         render: () => (<div><a href="javascript:;">编辑</a> <a href="javascript:;">删除</a></div>)
//     }
// ];


@observer
class BannerManage extends React.Component {
    gettabledata = (params = {}) => {
        BannerManageStore.tabledata.loading = true
        BannerManageStore.tabledata.pagination.current = params.page
        console.log(params.title)
        if (params.title && params.title.length > 0) {
            BannerManageStore.searchTitle = params.title
            delete params.title
        } else {
            BannerManageStore.searchTitle = ""
            delete params.title

        }
        service.get('https://randomuser.me/api', {
            params: {
                results: 10,
                page: 1,
                title: BannerManageStore.searchTitle.length > 0 ? BannerManageStore.searchTitle : undefined,
                ...params
            }
        })
            .then(function (response) {
                // console.log(response);
                const pagination = {...BannerManageStore.tabledata.pagination}
                // console.log(pagination)
                // pagination.total = response.data.total;
                pagination.total = 200;
                BannerManageStore.tabledata = {
                    loading: false,
                    data: response.results,
                    pagination: pagination,

                }


            })
            .catch(function (error) {
                console.log(error);
            });
    }

    componentDidMount() {
        // console.log(this)

        this.gettabledata()
    }

    onSelectChange = (selectedRowKeys, selectedRows) => {
        BannerManageStore.selectedRowKeys = selectedRowKeys;
        console.log(BannerManageStore.selectedRowKeys)
        // console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    }

    handleTableChange = (pagination, filters, sorter) => {
        console.log(BannerManageStore.searchTitle)
        const pager = {...pagination};
        pager.current = pagination.current;
        BannerManageStore.tabledata.pagination = pager;
        // console.log(BannerManageStore.tabledata.pagination)
        // console.log(BannerManageStore.inSearch)
        this.gettabledata({
            results: pagination.pageSize,
            page: pagination.current,
            sortField: sorter.field,
            sortOrder: sorter.order,
            title: BannerManageStore.searchTitle.length > 0 ? BannerManageStore.searchTitle : undefined,

            ...filters,
        })
    }
    handleAddArticle = () => {
        BannerManageStore.modalInfo = {
            modalTitle: "新增文章",
            modalVisible: true
        }
    }

    render() {

        const selectedRowKeys = BannerManageStore.selectedRowKeys.slice();
        // console.log(selectedRowKeys)
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
            // getCheckboxProps: record => (

            //     {
            //         disabled: record.name === 'Disabled User', // Column configuration not to be checked
            //         name: record.name,
            //     }),
        };

        const hasSelected = selectedRowKeys.length > 0;

        return (
            <div className="commontable">
                <CustomAddBanner></CustomAddBanner>
                <CustomTopFunctionForm tabledata={BannerManageStore.tabledata} onReciveData={this.gettabledata}/>
                <div style={{marginBottom: 12}}>
                    <Button type="primary" onClick={this.handleAddArticle} icon="plus">添加</Button>
                    {hasSelected ? <Popconfirm title="确定删除？" onConfirm={() => deleteArticle(selectedRowKeys)}> <Button
                        style={{marginLeft: 20}} type="primary">批量删除</Button> </Popconfirm> : ''}
                </div>
                <Table loading={BannerManageStore.tabledata.loading}
                       rowKey={record => record.cell}
                       rowSelection={rowSelection}
                       pagination={BannerManageStore.tabledata.pagination}
                       dataSource={BannerManageStore.tabledata.data.slice()}
                       columns={columns}
                       onChange={this.handleTableChange}

                ></Table>
            </div>
        )
    }
}




@observer
class AddBanner extends React.Component {
    handleReset = (e) => {
        BannerManageStore.modalInfo.modalVisible = false

        this.props.form.resetFields()
    }

    handleSubmit = (e) => {
        var that = this;

        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            console.log(values)

            if (!err) {
                console.log(values)

                setTimeout(() => {
                    BannerManageStore.modalInfo.modalVisible = false;
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
        const {getFieldDecorator} = this.props.form;
        return (
            <Modal title={BannerManageStore.modalInfo.modalTitle} visible={BannerManageStore.modalInfo.modalVisible}
                   onOk={this.handleOk}
                   onCancel={this.handleReset}

                   footer={null}
                   className="AddBanner">
                <Form onSubmit={this.handleSubmit} onReset={this.handleReset}>
                    <FormItem label="标题">
                        {getFieldDecorator('title', {
                            rules: [{required: true, message: '请输入标题'}]
                        })(
                            <Input placeholder="请输入标题"/>
                        )}
                    </FormItem>
                    <FormItem label="类型">
                        {getFieldDecorator('type', {
                            initialValue: "jack",
                            rules: [{required: true, message: '请选择类型'}]
                        })(
                            <Select style={{width: 175}} onChange={this.handleChange}>
                                <Option value="jack">Jack</Option>
                                <Option value="lucy">Lucy</Option>
                                <Option value="disabled">Disabled</Option>
                                <Option value="Yiminghe">yiminghe</Option>
                            </Select>
                        )}
                    </FormItem>
                    <FormItem label="类型编号">
                        {getFieldDecorator('typenumber', {
                            initialValue: "jack",
                            rules: [{required: true, message: '请选择类型编号'}]
                        })(
                            <Select style={{width: 175}} onChange={this.handleChange}>
                                <Option value="jack">Jack</Option>
                                <Option value="lucy">Lucy</Option>
                                <Option value="disabled">Disabled</Option>
                                <Option value="Yiminghe">yiminghe</Option>
                            </Select>
                        )}
                    </FormItem>
                    <FormItem label="顺序">
                        {getFieldDecorator('index', {
                            rules: [{required: true, message: '请选择顺序'}, {validator: this.handleConfirmIndex}]
                        })(
                            <Input type="number" min="0"/>
                        )}
                    </FormItem>
                    <FormItem label="上传图片">
                        {getFieldDecorator('image', {
                            rules: [{required: true, message: '请选择图片'}, {validator: this.handleConfirmIndex}]
                        })(
                            <UploadImg></UploadImg>
                        )}
                    </FormItem>
                    <FormItem className="addBannerBtn">
                        <Button type="primary" htmlType="submit">确定</Button>
                        <Button type="default" htmlType="reset">取消</Button>
                    </FormItem>
                </Form>
            </Modal>
        )
    }
}

const CustomAddBanner = Form.create()(AddBanner)


export default BannerManage