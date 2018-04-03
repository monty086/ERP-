import React from 'react';
import {Button} from 'antd';
import history from '../../history'

export default class Login extends React.Component{

    handleClick(){
        history.push('/home')
    }
    render (){
        return (
            <div>login登录
                <Button onClick={this.handleClick}>我的登录按钮</Button>
            </div>
        )
    }
}