
import React from 'react'
import { Link } from 'react-router-dom'
import {Row, Col,Icon} from 'antd'
import './index.less'
export default class Header extends React.Component {

    logout = () => {
        window.location.href = constants.urls.logoutUrl;
    };

    render = ()=> {
        return (
            <Row className="header">
                <Col span="18">
                    <Link to='/home'>运营管理系统</Link>
                    {window.navigator.userAgent.toLowerCase().indexOf('chrome') > -1 ? '' : (
                        <span className="browser-notice">(建议使用chrome浏览器查看)</span>
                    )}
                </Col>
                <Col span="6">
                    <div style={{float: 'right', fontSize: 14}}>
                        <Icon type="smile-circle"/>欢迎，{this.props.userName}
                        <a onClick={this.logout}>退出</a>
                    </div>
                </Col>
            </Row>
        )
    }
}
