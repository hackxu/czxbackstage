import React, { Component } from 'react';
import { Form, Icon, Input, Button } from 'antd';
// import { BrowserHistory } from 'history';
import axios from '../http/http';
import store from '../store/index'
const FormItem = Form.Item;

class NormalLoginForm extends Component {
    handleSubmit = (e) => {
        var that = this
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                // console.log(that.props)
                store.login()
                localStorage.setItem("token","Bearer eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiMSIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IlN1cGVyQWRtaW4iLCJ1aWQiOiIxIiwibmJmIjoiMTUyODI1NjQwMiIsImV4cCI6IjE1MjgzNDI4MDIifQ.SX5uxTMuFPVl_Y5c1PCK5PLtumAH_5cXKa7d0yPa1EY")
                store.setToken(localStorage.getItem("token"))
                that.props.history.push("/")
                // axios.post('/login/token', {
                //     firstName: 'Fred',
                //     lastName: 'Flintstone'
                // })
                //     .then(function (response) {
                //         console.log(response);
                //     })
                //     .catch(function (error) {
                //         console.log(error);
                //     });
            }
        });
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div className="loginForm">
                <Form onSubmit={this.handleSubmit} className="login-form">
                    <FormItem>
                        {getFieldDecorator('userName', {
                            rules: [{ required: true, min: 3, message: '请输入账户' }],
                        })(
                            <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
                        )}
                    </FormItem>
                    <FormItem>
                        {getFieldDecorator('password', {
                            rules: [{ required: true, min: 3, message: '请输入密码' }],
                        })(
                            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
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


