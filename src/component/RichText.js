import React from 'react'
import {Select, Form, DatePicker, message} from "antd";
import {observable, toJS} from "mobx";
import {observer} from "mobx-react";

import store from "../store/index"

import BraftEditor from "braft-editor";
import "braft-editor/dist/braft.css"

import locale from 'antd/lib/date-picker/locale/zh_CN';
// import moment from 'moment';
// import 'moment/src/locale/zh-cn';

const FormItem = Form.Item;
const Option = Select.Option;
const {RangePicker} = DatePicker

@observer
class RichText extends React.Component {
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
        },]
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
        // this.editorInstance.insertMedias([{
        //     type: 'CUSTOM',
        //     name: 'CustomElement',
        // }]);
        this.props.customerSetContent(
            this.editorInstance.getHTMLContent()
        )
    }
    handleRawChange = (rawContent) => {
        // console.log(rawContent)
    }
    handleUploadFn = (param) => {
        const serverURL = 'https://admin.isuzhou.me/storage/uploadimage'
        const xhr = new XMLHttpRequest()
        const fd = new FormData()
        console.log(param.libraryId)

        const successFn = (response) => {
            console.log(response)
            param.success({
                url: JSON.parse(xhr.responseText).data,
                // meta: {
                //     id: "xxx",
                //     title: "xxx",
                //     alt: "xxx",
                //     loop: true,
                //     autoPlay: true,
                //     controls: true,
                //     poster: ""
                // }
            })
        }

        const progressFn = (event) => {
            param.progress(event.loaded / event.total * 100)
        }

        const errorFn = (response) => {
            // 上传发生错误时调用param.error
            param.error({
                msg: 'unable to upload.'
            })
        }

        xhr.upload.addEventListener("progress", progressFn, false)
        xhr.addEventListener("load", successFn, false)
        xhr.addEventListener("error", errorFn, false)
        xhr.addEventListener("abort", errorFn, false)

        fd.append('file', param.file)
        xhr.open('POST', serverURL, true)
        xhr.setRequestHeader("authorization", "Bearer " + store.token)

        xhr.send(fd)

    }
    // editorInstance = () => {
    //     console.log(this)
    // }

    componentDidMount() {
        // console.log(this.editorInstance)
    }

    onRef = (ref) => {
        this.child = ref
    }


    render() {
        console.log(this.props)
        const editorProps = {
            height: 500,
            contentFormat: 'html',
            initialContent: '',
            onChange: this.handleChange,
            onRawChange: this.handleRawChange,
            media: {
                allowPasteImage: true, // 是否允许直接粘贴剪贴板图片（例如QQ截图等）到编辑器
                image: true, // 开启图片插入功能
                video: false, // 开启视频插入功能
                audio: false, // 开启音频插入功能
                validateFn: null, // 指定本地校验函数，说明见下文
                uploadFn: this.handleUploadFn, // 指定上传函数，说明见下文
                removeConfirmFn: null, // 指定删除前的确认函数，说明见下文
                onRemove: null, // 指定媒体库文件被删除时的回调，参数为被删除的媒体文件列表(数组)
                onChange: null, // 指定媒体库文件列表发生变化时的回调，参数为媒体库文件列表(数组)
                onInsert: null, // 指定从媒体库插入文件到编辑器时的回调，参数为被插入的媒体文件列表(数组)
            },
            extendControls: [
                {
                    type: 'split'
                },
                {
                    type: 'modal',
                    text: '景点插入',
                    html: '<span>景点插入</span>',
                    hoverTitle: '景点插入',
                    modal: {
                        id: 'test-modal', // v1.4.0新增，必选
                        title: '景点插入',
                        showClose: true,
                        showCancel: true,
                        showConfirm: true,
                        confirmable: true,
                        onCreate: (modalInstance) => {
                        },
                        onConfirm: () => {
                            this.child.handleSubmit()
                            if (this.insertData.place.length != 0) {
                                let agoContent = this.editorInstance.getHTMLContent()
                                console.log(agoContent)
                                this.editorInstance.setContent(`${agoContent}<p><strong value="doScenic(0,${this.insertData.startTime},${this.insertData.endTime})">${this.insertData.place}</strong></p>`,)
                                this.customSetData({
                                    place: "",
                                    startTime: "",
                                    endTime: ""
                                }, "insertData")
                                this.props.customerSetContent(
                                    this.editorInstance.getHTMLContent()
                                )

                            }
                        },
                        onCancel: () => console.log(2),
                        onClose: () => console.log(3),
                        children: (
                            <div className="editor-CustomerForm"
                                 style={{width: 480, height: 320, padding: 30, display: "flex"}}>
                                <CustomAttractionsInsert onRef={this.onRef}
                                                         selectData={this.SelectData}
                                                         customSetData={this.customSetData}></CustomAttractionsInsert>
                            </div>
                        )
                    }
                }
            ]
        }
        return (
            <div>
                <BraftEditor contentFormat="html" ref={instance => this.editorInstance = instance}
                             excludeControls={['emoji',]} {...editorProps}></BraftEditor>
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
        // console.log("onOk:", value)
    }

    componentDidMount() {
        this.props.onRef(this)
    }

    handleSubmit = (e) => {
        var that = this;
        console.log(e)
        // e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            // console.log(values)

            if (!err) {
                // console.log(values)
                that.props.customSetData({
                    place: values.place,
                    startTime: Date.parse(values.dateTime[0]._d),
                    endTime: Date.parse(values.dateTime[1]._d)
                }, "insertData")
                // console.log(
                //     Date.parse(values.dateTime[0]._d)
                // )

            } else {
                message.error('景点插入失败');
            }
        })
    }

    render() {
        const {getFieldDecorator} = this.props.form
        return (
            <Form onSubmit={this.handleSubmit}>
                <FormItem label="景点选择">
                    {getFieldDecorator('place', {
                        // initialValue: title,
                        rules: [{required: true, message: '请选择景点'}]
                    })(
                        <Select style={{width: "175px"}} onChange={this.handleChange}>
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
                            onOk={this.handleOk}
                            locale={locale}
                            // defaultValue={moment('2015-01-01', 'YYYY-MM-DD HH:mm')}
                        />
                    )}

                </FormItem>
            </Form>
        )
    }
}

const CustomAttractionsInsert = Form.create()(AttractionsInsert)

export default RichText
