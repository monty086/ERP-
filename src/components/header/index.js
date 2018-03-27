import React ,{Component}from 'react'
import {Link} from 'react-router'
import  { Row, Col, Icon ,Form,Select} from 'antd'
import "./index.less"
const FormItem = Form.Item;
export default class Header extends Component{
    render (){
        return (
            <Row className='header'>
                <Col span='12'>
                    <Form layout="inline">
                        <div className="page-func-row page-func-all">
                            <FormItem label="城市：">
                                <Select
                                    style={{ width: 102 }}
                                    // value={this.state.defaultCity}
                                    placeholder="全部"
                                    // onChange={this.handleSwitchCity}
                                >
                                    {/* {Utils.getCityList(true)} */}
                                </Select>
                            </FormItem>
                        </div>
                    </Form>
                </Col>
                <Col span='12'>
                    <div style={{ float: 'right', fontSize: 14 }}>
                        欢迎，<span className="user-name">{'xxx'}</span>
                        <a onClick={this.logout}>退出</a>
                    </div>
                </Col>
                {/* <Col span='18'>
                    <Link to='/home'>运营后台系统</Link>

                </Col>
                <Col span='6'>
                    <div style={{ float: 'right', fontSize: 14 }}>
                        <Icon type="smile-circle" />欢迎，{this.props.userName}
                        <a onClick={this.logout}>退出</a>
                    </div>
                </Col> */}
            </Row>  
        )
    }
}