import {observable, toJS} from "mobx";
import React from "react";
import service from "../http/http";
import {observer} from "mobx-react";

import {Popconfirm, Button, Table} from 'antd'

@observer
class CommonTable extends React.Component {
    @observable  columns = [
        ...this.props.tabledata.column,
        {
            title: "操作",
            dataIndex: "",
            key: "x",
            render: (text, record, index) => {
                const Id = record.cell;
                return <div>
                    <a onClick={() => this.props.editArticle(Id)} href="javascript:;">编辑</a>
                    <Popconfirm title="确定删除？" onConfirm={() => this.props.deleteArticle(Id)}>
                        <a style={{marginLeft: 12}} href="javascript:;">删除</a>
                    </Popconfirm>
                </div>
            }
        }


    ];


    componentDidMount() {
        console.log(this.props)
        // this.props.onRef(this)
        this.props.gettabledata()
    }


    onSelectChange = (selectedRowKeys, selectedRows) => {
        this.props.customSetData({
            selectedRowKeys: selectedRowKeys
        }, "tabledata")
    }
    //
    handleTableChange = (pagination, filters, sorter) => {
        // console.log(BannerManageStore.searchTitle)
        const pager = {...pagination};
        pager.current = pagination.current;
        this.props.customSetData({
            pagination: pager
        }, "tabledata")

        this.props.gettabledata({
            results: pagination.pageSize,
            page: pagination.current,
            sortField: sorter.field,
            sortOrder: sorter.order,
            title: this.props.tabledata.searchTitle.length > 0 ? this.props.tabledata.searchTitle : undefined,

            ...filters,
        })
    }
    handleAddArticle = () => {
        this.props.customSetData({
            modalTitle: "新增文章",
            modalVisible: true,
            modalLoading: false,
        }, "modalInfo")
    }

    render() {

        const selectedRowKeys = this.props.tabledata.selectedRowKeys;
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
        const {loading, pagination, data} = toJS(this.props.tabledata);
        return (
            <div className="commontable">
                <div style={{marginBottom: 12}}>
                    <Button type="primary" onClick={this.handleAddArticle} icon="plus">添加</Button>

                    {hasSelected ?
                        <Popconfirm title="确定删除？" onConfirm={() => this.props.deleteArticle(selectedRowKeys)}> <Button
                            style={{marginLeft: 20}} type="primary">批量删除</Button> </Popconfirm> : ''}
                </div>

                <Table loading={loading}
                       rowKey={record => record.cell}
                       rowSelection={rowSelection}
                       pagination={pagination}
                       dataSource={data.slice()}
                       columns={this.columns.slice()}
                       onChange={this.handleTableChange}
                ></Table>
            </div>
        )
    }
}

export default CommonTable
