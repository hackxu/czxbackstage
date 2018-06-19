import React from 'react'
import {Select, Form, DatePicker, message, Upload, Button, Modal} from "antd";
import {observable, toJS, action} from "mobx";
import {observer} from "mobx-react";

import store from "../store/index"

import ReactQuill, {Quill} from "react-quill";

import 'react-quill/dist/quill.snow.css'

import locale from 'antd/lib/date-picker/locale/zh_CN';
import moment from 'moment';


const FormItem = Form.Item;
const Option = Select.Option;
const {RangePicker} = DatePicker

const toolbarOptions = [
    [{'size': ['small', false, 'large', 'huge']}],  // custom dropdown
    [{'header': [1, 2, 3, 4, 5, 6, false]}],

    ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
    ['code'],

    [{'header': 1}, {'header': 2}],               // custom button values
    [{'list': 'ordered'}, {'list': 'bullet'}],
    // [{'script': 'sub'}, {'script': 'super'}],      // superscript/subscript
    [{'indent': '-1'}, {'indent': '+1'}],          // outdent/indent
    [{'direction': 'rtl'}],                         // text direction


    [{'color': []}, {'background': []}],          // dropdown with defaults from theme
    [{'align': []}],

    ['image'],
]
let Delta = Quill.import('delta')

class AttractionsInsertData {
    @observable insetShow = false;
    @observable insertData = {
        place: "",
        startTime: "",
        endTime: ""
    }
    @observable rangeIndex = 0;
    @action aInsetShow = () => {
        if (this.insetShow) {
            this.insetShow = false
        } else {
            this.insetShow = true
        }
    }
}

const AttractionsInsertStore = new AttractionsInsertData()

@observer
class RichText extends React.Component {
    constructor(props) {
        super(props)
        this.quillRef = null
        this.reactQuillRef = null
    }

    @observable SelectData = [
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
        {
            id: "7",
            name: "人"
        },
        {
            id: "8",
            name: "大帝"
        },
        {
            id: "9",
            name: "看天空"
        },
    ]
    @observable insertData = {
        place: "",
        startTime: "",
        endTime: ""
    }
    customSetData = (parms = {}, key) => {
        let that = this
        for (let i in parms) {
            if (Object.prototype.toString.call(parms[i]) !== "[object Object]") {
                that[key][i] = parms[i]

            }
            if (Object.prototype.toString.call(parms[i]) === '[object Object]') {
                for (let j in parms[i]) {
                    that[key][i][j] = parms[i][j]
                }
            }
        }
    }

    handleChange = (content) => {
        console.log(content)

    }

    handleUploadFn = (info) => {
        if (info.file.status !== 'uploading') {
            console.log(info.file, info.fileList);
        }
        console.log(this.quillRef.getSelection())

        if (info.file.status === 'done') {

            let quill = this.quillRef, res = info.file.response
            // 如果上传成功
            console.log(res)
            if (res.code === 200 && res.data !== null) {
                message.success(`${info.file.name} 上传成功`);

                // 获取光标所在位置
                let length = quill.getSelection().index;
                // 插入图片  res.info为服务器返回的图片地址
                quill.insertEmbed(length, 'image', res.data)
                // 调整光标到最后
                quill.setSelection(length + 1)
            } else {
                message.error(`${info.file.name} 上传失败.`);
            }
            // loading动画消失
        } else if (info.file.status === 'error') {
            message.error(`${info.file.name} 上传失败.`);
        }
    }


    componentDidMount() {
        this.attachQuillRefs()
    }

    componentDidUpdate() {
        this.attachQuillRefs()
    }

    attachQuillRefs = () => {
        if (typeof this.reactQuillRef.getEditor !== 'function') return;
        this.quillRef = this.reactQuillRef.getEditor();
    }

    onRef = (ref) => {
        this.child = ref
    }

    htmlContent = () => {
        return this.quillRef.getContents()
    }
    customGetSelection = () => {
        let range = this.quillRef.getSelection().index;
        AttractionsInsertStore.rangeIndex = range
    }
    insertText = () => {
        this.quillRef.insertText(AttractionsInsertStore.rangeIndex, AttractionsInsertStore.insertData.place, {code: true})
        this.quillRef.setSelection(AttractionsInsertStore.rangeIndex + 1)
    }

    render() {
        let that = this
        const RichTextOption = {
            modules: {
                toolbar: {
                    container: toolbarOptions,  // 工具栏
                    handlers: {
                        'image': function (value) {
                            if (value) {
                                document.querySelector('.customerRichTextUploadImg').click()
                            } else {
                                console.log("金了")
                                this.quill.format('image', false);
                            }
                        },
                        'code': function (value) {
                            if (value) {
                                that.customGetSelection()
                                AttractionsInsertStore.aInsetShow()
                            } else {
                                this.quill.format('code', false);

                            }
                        }
                    }
                }
            },
            formats: [
                // 'header',
                // 'bold', 'italic', 'underline', 'strike', 'blockquote',
                // 'list', 'bullet', 'indent',
                // 'link', 'image'
            ]
        }
        console.log(this.props)
        return (
            <div>
                <Upload action="https://admin.isuzhou.me/storage/uploadimage"
                        accept="image/jpeg,image/jpg,image/png"
                        headers={{authorization: "Bearer " + store.token}}
                        onChange={this.handleUploadFn}
                        style={{display: "none"}}
                        showUploadList={false}
                >
                    <Button className="customerRichTextUploadImg">
                        Click to Upload
                    </Button>
                </Upload>
                <CustomAttractionsInsert onRef={this.onRef} insetAttractions={this.insertText}
                                         selectData={this.SelectData}></CustomAttractionsInsert>
                <ReactQuill
                    ref={(el) => {
                        this.reactQuillRef = el
                    }}
                    theme={'snow'}
                    modules={RichTextOption.modules}
                    onChange={this.handleChange}>
                    <div className="my-editing-area"></div>
                </ReactQuill>
                <button onClick={this.insertText}>Insert Text</button>
                {/*<AttractionsInsert></AttractionsInsert>*/}
            </div>
        )

    }
}

@observer
class AttractionsInsert extends React.Component {

    handleChange = (e) => {
        console.log(e)
    }

    handleRangeChange = (value, dateString) => {
        // console.log('Selected Time: ', value);
        // console.log('Formatted Selected Time: ', dateString);
    }
    handleOk = (value) => {
        // e.preventDefault();
        this.props.form.validateFields((err, values) => {
            console.log(values)
            if (!err) {
                AttractionsInsertStore.insertData.place = values.place
                AttractionsInsertStore.insertData.startTime = Date.parse(values.dateTime[0]._d)
                AttractionsInsertStore.insertData.endTime = Date.parse(values.dateTime[1]._d)
                this.props.insetAttractions()
            }

        })
        // console.log(this.props.quillRef)

        AttractionsInsertStore.aInsetShow()
        this.props.form.resetFields()
    }
    handleCanel = (value) => {
        AttractionsInsertStore.aInsetShow()
        this.props.form.resetFields()
    }

    componentDidMount() {
        this.props.onRef(this)
    }

    // handleSubmit = (e) => {
    //     var that = this;
    //     console.log(e)
    //     // e.preventDefault();
    //     this.props.form.validateFieldsAndScroll((err, values) => {
    //         // console.log(values)
    //
    //         if (!err) {
    //             // console.log(values)
    //             // that.props.customSetData({
    //             //     place: values.place,
    //             //     startTime: Date.parse(values.dateTime[0]._d),
    //             //     endTime: Date.parse(values.dateTime[1]._d)
    //             // }, "insertData")
    //             // console.log(
    //             //     Date.parse(values.dateTime[0]._d)
    //             // )
    //
    //         } else {
    //             message.error('景点插入失败');
    //         }
    //     })
    // }

    render() {
        const {getFieldDecorator} = this.props.form
        return (
            <Modal title="插入景点" visible={AttractionsInsertStore.insetShow} onOk={this.handleOk}
                   onCancel={this.handleCanel}>
                <Form>
                    <FormItem label="景点选择">
                        {getFieldDecorator('place', {
                            // initialValue: title,
                            rules: [{required: true, message: '请选择景点'}]
                        })(
                            <Select style={{width: "175px"}} onChange={this.handleChange} showSearch
                                    filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}>
                                {this.props.selectData.map(item =>
                                    <Option key={item.id} value={item.id}>{item.name}</Option>
                                )}
                            </Select>
                        )}

                    </FormItem>
                    <FormItem label="日期选择">
                        {getFieldDecorator('dateTime', {
                            // initialValue: title,
                            rules: [{required: true, message: '请选择时间'}]
                        })(
                            <RangePicker
                                showTime={{format: 'HH:mm'}}
                                format="YYYY-MM-DD HH:mm"
                                placeholder={['开始时间', '结束时间']}
                                onChange={this.handleRangeChange}
                                // onOk={this.handleOk}
                                locale={locale}
                            />
                        )}

                    </FormItem>
                </Form>
            </Modal>
        )
    }
}

const CustomAttractionsInsert = Form.create()(AttractionsInsert)

export default RichText
