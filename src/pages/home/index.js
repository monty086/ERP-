import React from 'react'
import {Row,Col} from 'antd'
import NavLeft from '../../components/navLeft'
import Header from '../../components/header'

import '../../style/common.less'

export default class Home extends React.Component{
    render(){
        return (
            <Row className="body-container">
                <Col span="3" className="nav-left">
                    <NavLeft/>
                </Col>
                {
                    <Col span="21" className="main">
                        <Header/>
                        <Row className="content">
                            {this.props.children}
                        </Row>
                        {/* <Footer/> */}
                    </Col>
                }
            </Row>
        )
    }
}



