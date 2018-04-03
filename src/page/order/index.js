import React from 'react';
import {Radio,message,DatePicker ,Checkbox, Modal, Form, Select, Input, Button, Row, Col, Menu, Icon, Table} from 'antd'


export default class Order extends React.Component{
    render (){
        let columns = [
            {
                title:'模板Id',
                dataIndex:'template_id'
            },
            {
                title:'城市名称',
                dataIndex:'city_name'
            },
            {
                title:'用车模式',
                dataIndex:'model',
                render(text){
                    return text=='1'?'指定停车点':'禁停区'
                }
            },
            {
                title:'费用模版［指定停车点模式］',
                dataIndex:'parking_template_name'
            },
            {
                title:'费用模版［禁停区模式］',
                dataIndex:'npl_template_name'
            },
            {
                title:'操作时间',
                dataIndex:'operate_time',
                render: Utils.formatTime
            },
            {
                title:'操作人',
                dataIndex:'operate_user'
            }
        ];
        return (
            <div>
                <div className="card-wrap topFilterWrap">
                    <FilterForm
                        filterSubmit={this.filterSubmit}
                        feeTempList={this.state.feeTempList}
                    />
                </div>
                <div className="operation-buttons">
                    
                    <Button type="primary" onClick={this.openSetFeeModal}>订单详情</Button>

                    <Button type="primary" onClick={this.openBatchSetFeeModal}>批量设置费用模板</Button>
                        
                    <Button style={{float:"right"}} type="primary" onClick={this.requestList}>刷新</Button>
                </div>

                <Table
                    updateSelectedItem={Utils.updateSelectedItem.bind(this)}
                    selectedRowKeys={this.state.selectedRowKeys}
                    pagination={this.state.pagination}
                    dataSource={this.state.items}
                    columns={columns}
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

class FilterForm extends React.Component{
    render(){
        return (
            <div>123</div> 
        )
    }
}