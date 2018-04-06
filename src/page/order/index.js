import React from 'react';
import {Radio,message,DatePicker ,Checkbox, Modal, Form, Select, Input, Button, Row, Col, Menu, Icon, Table} from 'antd'
import BaseService from '../../component/BaseServier'
import urls from '../../contants/urls'
import Utils from '../../contants/utils'
const FormItem = Form.Item;
const Option = Select.Option;
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
                    message.success('请求列表成功!')
                }
            }
        })
    }
    onSelectChange = (selectedRowKeys, selectedRows) => {
        this.setState({
            selectedRowKeys,
            selectedItem: selectedRows[0]
        });
    };

    //处理行点击事件
    onRowClick = (record, index) => {
        const selectKey = [index];
        this.setState({
            selectedRowKeys: selectKey,
            selectedItem: (this.state.items[index] || {})
        });
    };

    handleFilterSubmit=(value)=>{
        this.params = value;
        debugger
        this.requestList()
    }

    openSetFeeModal=()=>{
        this.setState({
            setFeeModalVisible:true
        })
    }

    closeModelForm=()=>{
        this.setState({
            setFeeModalVisible:false
        })
    }

    render (){
        const { selectedRowKeys } = this.state;
        const rowSelection = {
            type: 'radio',
            selectedRowKeys,
            onChange: this.onSelectChange
        }
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
                         handleFilterSubmit={this.handleFilterSubmit}
                    />
                </div>
                <div className="operation-buttons">
                    <Button type="primary" onClick={this.openSetFeeModal}>订单详情</Button>
                    <Button style={{float:"right"}} type="primary" onClick={this.requestList}>刷新</Button>
                </div>
                <Table
                    pagination={this.state.pagination}
                    dataSource={this.state.items}
                    columns={columns}
                    className="card-wrap"
                    bordered
                    rowSelection={rowSelection}
                    onRowClick={this.onRowClick}
                />
                <Modal
                    title="设置费用模板"
                    visible={this.state.setFeeModalVisible}
                    onOk={this.modelFormSubmit}
                    onCancel={this.closeModelForm}
                    width={600}
                    okText='确定'
                    cancelText='取消'
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

    handleFilterSubmit=()=>{
        var fieldsValue = this.props.form.getFieldsValue();
        this.props.handleFilterSubmit(fieldsValue)
    }
    reset = () => {
        this.props.form.resetFields();
        // this.props.form.setFieldsValue({"begin_time": "", "end_time": ""})
    };
    
    render() {
        const {getFieldDecorator} = this.props.form; 
        return (
            <Form layout="inline">
                <div className="page-func-row page-func-all">
                    <FormItem label="城市">
                        {getFieldDecorator('city',{initialValue:''})(
                        <Select
                            style={{ width: 150 }}
                        >
                            <Option value="">全部</Option>
                            <Option value="1">北京</Option>
                            <Option value="2">上海</Option>
                            <Option value="3">天津</Option>
                        </Select>
                        )}
                    </FormItem>
                    <FormItem label="时间查询">
                        {
                            getFieldDecorator('begin_time')(
                                <DatePicker placeholder="选择开始时间" showTime={true} format="YYYY-MM-DD HH:mm:ss" />
                            )
                        }
                    </FormItem>
                    <FormItem label="~" colon={false}>
                        {getFieldDecorator('end_time')(
                            <DatePicker placeholder="请选择结束时间" showTime={true} format="YYYY-MM-DD HH:mm:ss" />
                        )}
                    </FormItem>
                    <FormItem label='信息查询'>
                        {
                            getFieldDecorator('search_info')(
                                <Input placeholder='请输入你要搜索的内容' style={{width:200}}/>
                            )
                        }
                    </FormItem>
                    <FormItem>
                        {
                            getFieldDecorator('time_out_fee',{ valuePropName: 'checked',
                            })(
                                <Checkbox> 短时订单 </Checkbox>
                            )
                        }
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