import React from 'react';
import {Radio,message,DatePicker ,Checkbox, Modal, Form, Select, Input, Button, Row, Col, Menu, Icon, Table} from 'antd'
import BaseService from '../../component/BaseServier'
import urls from '../../contants/urls'
import Utils from '../../contants/utils'
const FormItem = Form.Item;
import './index.less'
export default class Order extends React.Component{
    state={}
    params={
        "params":''
    }

    componentWillMount(){
        this.requestList()
    }

    requestList = () => {
        BaseService.ajax({
            url: urls.order_list,
            data: this.params,
            isMock:true,
        }).then((response) => {
            if (response) {
                if (response.result) {
                    let data = response.result
                    var i = 0
                    this.setState({
                        items: data.item_list.map(function (item){
                            item.key = i++;
                            return item
                        }),
                        pagination: {
                            onChange: (current) => {
                                this.params.page = current;
                                this.requestList()
                            },
                            current: data.page,
                            pageSize: data.page_size,
                            total: data.total_count,
                            showTotal: () => {
                                return '共' + data.total_count + '条'
                            },
                            showQuickJumper: true,
                            selectedRowKeys: [],
                        }
                    })
                }
            }
        })
    }
    render (){
        this.state;
        let columns = [
            {
                title:'订单编号',
                dataIndex:'id'
            },
            {
                title:'车辆编号',
                dataIndex:'bike_id'
            },
            {
                title:'用户姓名',
                dataIndex:'name',
            },
            {
                title:'手机号码',
                dataIndex:'number'
            },
            {
                title:'订单结束状态',
                dataIndex:'status',
                render(text){
                    if(text==1){
                        return '正常结束'
                    }else if(text ==2){
                        return '异常结束'
                    }
                }
            },
            {
                title:'开始时间',
                dataIndex:'begin_time',
                render: Utils.formatTime
            },
            {
                title:'跟进状态',
                dataIndex:'follow_status',
                render(text){
                    if(text==1){
                        return '跟进中'
                    }else if(text ==2){
                        return '结束跟进'
                    }
                }
            }
        ];
        return (
            <div>
                <div className="card-wrap topFilterWrap">
                    <FilterForm
                        // filterSubmit={this.filterSubmit}
                        // feeTempList={this.state.feeTempList}
                    />
                </div>
                <div className="operation-buttons">
                    
                    <Button type="primary" onClick={this.openSetFeeModal}>订单详情</Button>
                    <Button style={{float:"right"}} type="primary" onClick={this.requestList}>刷新</Button>
                </div>
                <Table
                    // updateSelectedItem={Utils.updateSelectedItem.bind(this)}
                    // selectedRowKeys={this.state.selectedRowKeys}
                    pagination={this.state.pagination}
                    dataSource={this.state.items}
                    columns={columns}
                    className="card-wrap"
                    bordered
                />
                <Modal
                    title="设置费用模板"
                    visible={this.state.setFeeModalVisible}
                    onCancel={this.closeModelForm}
                    onOk={this.modelFormSubmit}
                    width={600}
                >
                    <div>
                        <SetFeeModelForm
                            ref="setFeeModelForm"
                            selectedItem={this.state.selectedItem}
                            feeTempList={this.state.feeTempList}
                        />
                    </div>
                </Modal>

            </div>
        )
    }
}

class FilterForm extends React.Component{
    render() {
        const { getFieldProps } = this.props.form;
        const feeTempList = this.props.feeTempList || [];
        var templateList = [];
        feeTempList.forEach((item,index)=>{
            var option = <Option key={item.id} value={item.id}>{item.name}</Option>;
            templateList.push(option);
        });
        return (
            <Form layout="inline">
                <div className="page-func-row page-func-all">
                    <FormItem
                        label="用车模式：">
                        <Select
                            style={{ width: 150 }}
                            placeholder="全部"
                            defaultValue=""
                            {...getFieldProps('mode')}
                        >
                            <Option value="">全部</Option>
                            <Option value="1">指定停车点模式</Option>
                            <Option value="2">禁停区模式</Option>
                        </Select>
                    </FormItem>
                    <FormItem
                        label="费用模版：">
                        <Select
                            style={{ width: 200 }}
                            {...getFieldProps('template_id')}
                            placeholder="全部"
                            defaultValue=""
                        >
                            <Option value="">全部</Option>
                            {templateList}
                        </Select>
                    </FormItem>
                    <FormItem>
                        <Button type="primary" onClick={this.handleFilterSubmit}>查询</Button>
                        <Button type="ghost" onClick={this.reset }>重置</Button>
                    </FormItem>
                </div>
            </Form>
        )
    }
}

FilterForm = Form.create({})(FilterForm);

class SetFeeModelForm extends React.Component{
    render(){
        return (
            <div>123</div> 
        )
    }
}
SetFeeModelForm = Form.create({})(SetFeeModelForm);