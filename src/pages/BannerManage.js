import React from 'react';
import {Form, Input, Button, Select, Modal} from 'antd'
import {observable} from 'mobx';
import {observer} from 'mobx-react';
// import store from '../store/index'
import service from '../http/http'

import UploadImg from '../component/UploadImg'
import CustomTopFunctionForm from '../component/TopSearch'
import CommonTable from '../component/CommonTable'
import CustomLoading from '../component/CustomLoading'

const FormItem = Form.Item;
const Option = Select.Option;

class BannerManageData {
    @observable tabledata = {
        selectedRowKeys: [],
        searchTitle: "",
        data: [],
        pagination: {
            pageSize: 10,
            total: 0,
            showSizeChanger: true,
            showQuickJumper: true,
            current: 1,
            showTotal: (total, range) => `${range[0]}-${range[1]}  共${total}条记录`

        },
        column: [{
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
        }],
        loading: false,
    }
    @observable modalInfo = {
        modalTitle: "",
        modalVisible: false,
        modalLoading: false,
        modalIsEdit: false,
    }
    @observable FormData = {
        title: "",
        index: "",
        image: "",
        type: "",
        typeIndex: "",
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
        selectTypeIndex: [
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
}

const BannerManageStore = new BannerManageData()

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
    // onRef = (ref) => {
    //     this.child = ref
    // }
    customResetFormData = (key) => {
        for (let i in BannerManageStore[key]) {
            if (Object.prototype.toString.call(key[i]) != "[object Object]") {
                BannerManageStore[key][i] = ""
            }
        }
    }

    customSetData = (parms = {}, key) => {
        for (let i in parms) {
            if (Object.prototype.toString.call(parms[i]) !== "[object Object]") {
                BannerManageStore[key][i] = parms[i]

            }
            if (Object.prototype.toString.call(parms[i]) === '[object Object]') {
                for (let j in parms[i]) {
                    BannerManageStore[key][i][j] = parms[i][j]
                }
            }
        }
    }

    setSearchData = (parms = {}) => {
        console.log(parms)
        this.gettabledata({...parms})
        // console.log(this.Ctabledata(parms)
    }
    gettabledata = (params = {}) => {
        let that = this;
        // console.log(this)
        console.log(params)
        this.customSetData({
            loading: true,
            pagination: {current: params.page ? params.page : 1}
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
        // console.log("caopropstitle", that.props.tabledata.searchTitle)

        service.get('https://randomuser.me/api', {
            params: {
                results: 10,
                page: 1,
                title: BannerManageStore.tabledata.searchTitle.length > 0 ? BannerManageStore.tabledata.searchTitle : undefined,
                ...params
            }
        })
            .then(function (response) {
                // console.log(response);
                const pagination = {...BannerManageStore.tabledata.pagination}

                pagination.total = 200;
                that.customSetData({
                    loading: false,
                    data: response.results,
                    pagination: pagination,
                }, "tabledata")

            })
            .catch(function (error) {
                console.log(error);
            });
    }

    editArticle = (id) => {
        console.log(id)
        // let that = this;
        BannerManageStore.modalInfo = {
            modalTitle: "编辑文章",
            modalVisible: true,
            modalLoading: true,
            modalIsEdit: true
        }
        service.get('https://randomuser.me/api', {
            params: {}
        })
            .then(function (response) {
                BannerManageStore.modalInfo.modalLoading = false
                BannerManageStore.FormData = {
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
                let pagination = {...BannerManageStore.tabledata.pagination}

                that.gettabledata({
                    results: pagination.pageSize,
                    page: pagination.current,
                    title: BannerManageStore.tabledata.searchTitle.length > 0 ? BannerManageStore.searchTitle : undefined,
                })
                that.customSetData({
                    selectedRowKeys: []
                }, "tabledata")
                // BannerManageStore.selectedRowKeys.length = 0

            })

    };


    render() {
        return (
            <div className="commontable">
                <CustomAddBanner data={BannerManageStore.modalInfo}
                                 customSetData={this.customSetData}
                                 customResetFormData={this.customResetFormData}
                                 formData={BannerManageStore.FormData}
                                 selectData={BannerManageStore.selectData}
                ></CustomAddBanner>
                <CustomTopFunctionForm tabledata={BannerManageStore.tabledata} onReciveData={this.setSearchData}/>
                <CommonTable tabledata={BannerManageStore.tabledata}
                             customSetData={this.customSetData} editArticle={this.editArticle}
                             deleteArticle={this.deleteArticle} gettabledata={this.gettabledata}
                ></CommonTable>
            </div>
        )
    }
}

@observer
class AddBanner extends React.Component {
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
            // console.log(values)

            if (!err) {
                console.log(values)

                setTimeout(() => {
                    that.props.customResetFormData("FormData")

                    that.props.customSetData({
                        modalVisible: false
                    }, "modalInfo")
                    console.log(that.props.formData)
                }, 2000)
            }
        })
    }
    handleChange = (e) => {
        console.log(`selected${e}`)
    }


    setUploadImgUrl = (e) => {
        this.props.customSetData({
            image: e
        }, "FormData")
        this.props.form.setFieldsValue({
            image: e
        })
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
        const {selectType, selectTypeIndex} = this.props.selectData;
        const {title, type, typeIndex, index, image} = this.props.formData
        return (
            <Modal title={modalTitle} visible={modalVisible}
                   onOk={this.handleSubmit}
                   onCancel={this.handleReset}
                // footer={null}
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
                    <FormItem label="类型编号">
                        {getFieldDecorator('typenumber', {
                            initialValue: typeIndex,
                            rules: [{required: true, message: '请选择类型编号'}]
                        })(
                            <Select style={{width: 175}} onChange={this.handleChange}>
                                {selectTypeIndex.map(item => <Option key={item.id}
                                                                     value={item.id}>{item.name}</Option>)}
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
                    <FormItem label="上传图片">
                        <UploadImg setImgUrl={this.setUploadImgUrl} image={image}></UploadImg>
                        {getFieldDecorator('image', {
                            initialValue: image,
                            rules: [{required: true, message: '请选择图片'}]
                        })(
                            <Input/>
                        )}
                    </FormItem>
                    {/*<FormItem className="addBannerBtn">*/}
                    {/*<Button type="primary" htmlType="submit">确定</Button>*/}
                    {/*<Button type="default" htmlType="reset">取消</Button>*/}
                    {/*</FormItem>*/}
                </Form>
            </Modal>
        )
    }
}

const CustomAddBanner = Form.create()(AddBanner)


export default BannerManage