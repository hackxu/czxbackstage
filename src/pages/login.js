import React, {Component} from 'react';
import {Form, Icon, Input, Button} from 'antd';
// import { BrowserHistory } from 'history';
import service from '../http/http';
import store from '../store/index'
import {md5} from '../util/index'

const FormItem = Form.Item;

class NormalLoginForm extends Component {
    handleSubmit = (e) => {
        var that = this
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                values.Password = md5(values.Password)
                // console.log(that.props)
                service.post('/login/token', values)
                    .then(function (response) {
                        console.log(response);
                        localStorage.setItem("token", response)
                        store.login()
                        that.props.history.push("/")

                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            }
        });
    }

    render() {
        const {getFieldDecorator} = this.props.form;
        return (
            <div className="loginForm">
                <Form onSubmit={this.handleSubmit} className="login-form">
                    <FormItem>
                        {getFieldDecorator('Name', {
                            rules: [{required: true, min: 3, message: '请输入账户'}],
                        })(
                            <Input prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                   placeholder="Username"/>
                        )}
                    </FormItem>
                    <FormItem>
                        {getFieldDecorator('Password', {
                            rules: [{required: true, min: 3, message: '请输入密码'}],
                        })(
                            <Input prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>} type="password"
                                   placeholder="Password"/>
                        )}
                    </FormItem>
                    <FormItem>


                        <Button type="primary" htmlType="submit" className="login-form-button">
                            登录</Button>

                    </FormItem>
                </Form>
            </div>
        );
    }
}

const LoginForm = Form.create()(NormalLoginForm);

export default LoginForm


