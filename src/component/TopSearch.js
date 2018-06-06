import React from "react";
import {Form, Input, Button} from 'antd'
import {observable, } from 'mobx';
import {observer} from 'mobx-react';

const FormItem = Form.Item;

class TopFunctionForm extends React.Component {
    handleReset = (e) => {
        let that = this
        this.props.form.resetFields()
        const pagination = {...this.props.tabledata.pagination}
        console.log(pagination)

        // that.tabledata.pagination.current = 1
        // that.searchTitle = ""
        this.props.onReciveData({
            results: pagination.pageSize,
            page: 1,
            title: ""
        })
    }


    handleSubmit = (e) => {
        var that = this;

        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                // console.log('Received values of form: ', values);
                console.log(that.props.tabledata.pagination)
                const pagination = {...that.props.tabledata.pagination}

                that.props.onReciveData({
                    results: pagination.pageSize,
                    page: 1,
                    title: values.title
                })

            }
        });
    }

    render() {
        const {getFieldDecorator} = this.props.form;
        return (
            <div className="topfunction">

                <Form onSubmit={this.handleSubmit} onReset={this.handleReset}>
                    <FormItem label="标题">
                        {getFieldDecorator('title', {
                            rules: [{required: true, message: '请输入要搜索的标题'}],
                        })(
                            <Input placeholder="请输入标题"/>
                        )}

                    </FormItem>
                    <Button type="primary" htmlType="submit">查询</Button>
                    <Button type="default" htmlType="reset">重置</Button>
                </Form>

            </div>
        )
    }
}

const CustomTopFunctionForm = Form.create()(TopFunctionForm);

export default CustomTopFunctionForm