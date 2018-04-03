import React from 'react';
import {Button} from 'antd';
import history from '../../history'

export default class Bike extends React.Component{
    
    render (){
        return (
            <div>用车页面
                <Button onClick={this.handleClick}>我是用车页面</Button>
            </div>
        )
    }
}