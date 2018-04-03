import React from 'react';
import {Button,Tabs,Row,Col} from 'antd';
import Header from '../header'
import NavLeft from '../navLeft'
import menuList from '../../contants/menuConfig'
import './index.less'

const TabPane = Tabs.TabPane


export default class Home extends React.Component{
    state = {
        isAdmin:1,
        menuList
    }
    componentDidMount(){
        this.setState({
            isAdmin:1,
            menuList,
        })
    }

    render (){
        return (
            <div>
                <Header userName={'yuanmeng'}/>
                <Row className="welcome-page">
                    <Col span="3" className="nav-left">
                         <NavLeft isAdmin={this.state.isAdmin} menuList={this.state.menuList}/>
                    </Col>
                    <Col span="21" className="right-container">
                        {this.props.children}
                    </Col>
                </Row>
            </div>
        )
    }
}