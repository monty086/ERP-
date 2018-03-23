import React from 'react'
import {hashHistory} from 'react-router'
import {DatePicker ,Checkbox, Modal, Radio, Form, Select, Input, Button, Row, Col, Menu, Icon, Table} from 'antd'
import BaseService from '../../http/BaseService'
// import constants from '../../constants/constants'
// import Footer from '../../components/Footer'
import urls from '../../urls/urls'
// import Utils from '../../utils/Util'
// import Store from '../../utils/Store'
// import City from '../../constants/city'
import './index.less'
const FormItem = Form.Item;

export default class Login extends React.Component {
    state = {};

    componentDidMount() {//每次进入登录页清除之前的登录信息
        // Store.save("username", "");
        // window.eventsController.clear();
    }

    loginReq = (val) => {
        const _this = this;
        BaseService.ajax({
            url: urls.login,
            data: {
                params: val,
                isShowErrorModal:false,//不显示错误弹框
                isShowLoading:false//是否显示loading
            },
            isMock:true
        }).then((data)=> {
            if (data) {
                if (data.code == 0) {
                    // Store.save("username", data.result.username);
                    // City.getOpenCity(()=> {//获取城市列表
                        hashHistory.push('/home');
                    // });
                } else {
                    _this.refs.login.setFieldsValue({'password':''});
                    _this.refs.login.instances.password.refs.input.type = 'password';
                    _this.setState({
                        errorMsg: data.error.message
                    });
                }
            } else {
                _this.refs.login.setFieldsValue({'password':''});
                _this.setState({
                    errorMsg: "请求失败"
                });
            }
        })
    };

    render() {
        return (
            <div className="login-page">
                <div className="login-header">
                    <div className="logo">
                        <img src="./logo-yellow.png" alt="松果运营中心"/>
                    </div>
                </div>
                <div className="login-content-wrap">
                    <div className="login-content">
                        <div className="word">共享出行 <br />引领城市新经济</div>
                        <div className="login-box">
                            <div className="error-msg-wrap">
                                <div
                                    className={this.state.errorMsg?"show":""}>
                                    {this.state.errorMsg}
                                </div>
                            </div>
                            <div className="title">欢迎你</div>
                            <LoginForm ref="login" loginSubmit={this.loginReq}/>
                        </div>
                    </div>
                </div>
                {/* <Footer/> */}
            </div>
        )
    }
}

class LoginForm extends React.Component {
    state = {};

    componentDidMount() {
        document.onkeyup = (e)=> {
            var code = e.charCode || e.keyCode;
            if (code == 13) {
                this.loginSubmit();
            }
        }
    }

    loginSubmit = (e)=> {
        e && e.preventDefault();
        const _this = this;
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                var formValue = _this.props.form.getFieldsValue();
                // 提交时清空内容，更换类型未text，阻止浏览器记住密码
                // const pwdInput = _this.pwd.refs.input;
                // const pwd = '•'.repeat(formValue.password && formValue.password.length);
                // _this.props.form.setFieldsValue({"password": pwd});
                //  pwdInput.type = 'text';
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

    handleFocus = ()=> {
        if(this.pwd.refs.input )this.pwd.refs.input.type = 'password';
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Form className="login-form">
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
                        <Input type="password" autoComplete="off" placeholder="密码" ref={(inst) => this.pwd = inst }
                               onFocus={this.handleFocus}/>
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
