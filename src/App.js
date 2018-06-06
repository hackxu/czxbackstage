import React, { Component } from 'react';
// import TodoListView from './pages/todoList'
// import store from './store/index'
import RouterDiv from './router/router';
import "./App.less";
import { LocaleProvider } from "antd"
import zhCN from 'antd/lib/locale-provider/zh_CN';

class App extends Component {
    render() {
        return (
            <LocaleProvider locale={zhCN}>
                <RouterDiv></RouterDiv>
            </LocaleProvider>
        );
    }
}

export default App;
