import React from 'react';
import {Button,Tabs,Row,Col} from 'antd';
import Header from '../header'
import NavLeft from '../navLeft'
import menuList from '../../contants/menuConfig'
// import './index.less'

export default class Home extends React.Component{
    state={
    }
    componentDidMount(){
        this.setState({
            menuList,
        })
    }
    render (){
        return (
            <div>
                <Header userName={'珠峰培训'}/>
                <Row className="welcome-page">
                    <Col span="3" className="nav-left">
                         <NavLeft menuList={this.state.menuList}/>
                    </Col>
                    <Col span="21" className="right-container">
                        {this.props.children}
                    </Col>
                </Row>
            </div>
        )
    }
}