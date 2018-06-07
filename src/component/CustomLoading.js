import {Spin} from "antd";
import React from 'react'

class CustomLoading extends React.Component {
    render() {
        return (
            <div className="CustomLoading">
                <Spin></Spin>
            </div>
        )
    }
}
export default CustomLoading