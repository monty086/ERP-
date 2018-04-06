import React from 'react'
import {DatePicker ,Checkbox, Modal, Radio, Form, Select, Input, Button, Row, Col, Menu, Icon, Table} from 'antd'
import BaseService from '../../component/BaseServier'
import urls from '../../contants/urls'
// import './index.less'
import history from '../../history'
const FormItem = Form.Item;

export default class Login extends React.Component {
    state = {};

    loginReq = (val) => {
        const _this = this;
        BaseService.ajax({
            url: urls.login,
            data: val,
            isMock:true
        }).then((response)=> {
            if (response) {
                if (response.data.code == 0) {
                    history.push('/home');
                }else {
                    _this.refs.login.setFieldsValue({'password':''});
                    _this.setState({
                        errorMsg: "用户名或密码错误"
                    });
            }
        }    
        })
    };

    render() {
        return (
            <div className="login-page">

                <div className="login-content-wrap">

                    <div className="login-content">

                        <div className="word">珠峰培训 <br />ERP管理系统</div>

                        <div className="login-box">
                            {/* <div className="error-msg-wrap">
                                <div
                                    className={this.state.errorMsg?"show":""}>
                                    {this.state.errorMsg}
                                </div>
                            </div> */}
                            <div className="title">欢迎你</div>

                            <LoginForm ref="login" loginSubmit={this.loginReq}/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

class LoginForm extends React.Component {
    state = {};

    componentDidMount() {
        // document.onkeyup = (e)=> {
        //     var code = e.charCode || e.keyCode;
        //     if (code == 13) {
        //         this.loginSubmit();
        //     }
        // }
    }

    loginSubmit = (e)=> {
        // e && e.preventDefault();
        const _this = this;
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                var formValue = _this.props.form.getFieldsValue();
                _this.props.loginSubmit({
                    username: formValue.username,
                    password: formValue.password
                });
            }
        });
    };

    checkUsername = (rule, value, callback) => {
        var reg = /^1\d{10}$/;
        if (!value) {
            callback('请输入手机号!');
        } else if (!reg.test(value)) {
            callback('手机号输入错误!');
        } else {
            callback();
        }
    };

    checkPassword = (rule, value, callback) => {
        if (!value) {
            callback('请输入密码!');
        } else {
            callback();
        }
    };

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Form>
                <FormItem>
                    {getFieldDecorator('username', {
                        rules: [{validator: this.checkUsername}]
                    })(
                        <Input placeholder="用户名"/>
                    )}
                </FormItem>
                <FormItem>
                    {getFieldDecorator('password', {
                        initialValue:'',
                        rules: [{validator: this.checkPassword}]
                    })(
                        <Input type="password" autoComplete="off" placeholder="密码" 
                              ref={(inst) => this.pwd = inst }
                               />
                    )}
                </FormItem>
                <FormItem>
                    <Button type="primary" onClick={this.loginSubmit} className="login-form-button">
                        登录
                    </Button>
                </FormItem>
            </Form>
        )
    }
}
LoginForm = Form.create({})(LoginForm);

