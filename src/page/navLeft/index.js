"use strict"

import React from 'react'
import {Link} from 'react-router-dom'
import { Row, Col, Menu, Icon, Table ,Tabs} from 'antd'
import menuConfig from '../../contants/menuConfig'
// import './index.less'
const SubMenu = Menu.SubMenu;
const keyPath = {};
export default class NavLeft extends React.Component {
    // 菜单的点击事件
    handleClick = (e) => {
        console.log(e.key)
        this.setState({
            currentKey: e.key
        });
    };

    componentWillMount=()=> {
        let that = this;

        // 遍历菜单，生成TreeNode对象 ,菜单工厂的入口
        const menuTreeNode = that.renderMenu(menuConfig);
        
        // 获取当前页面对应的菜单路由Hash值
        let _key = window.location.hash.replace(/#|\?[^\?]*$/g, '');

        that.setState({
            currentKey: _key,
            menuTreeNode,
        })
    }

    // 菜单递归渲染
    renderMenu = (data, key = '') => {
        return data.map((item) => {
            if (item.children) {
                return (
                    <SubMenu title={item.title} key={key + item.key}>
                        {this.renderMenu(item.children, key + item.key)}
                    </SubMenu>
                );
            }
            return <Menu.Item key={key+item.key} name={item.title}><Link
                to={key+item.key}>{item.title}</Link></Menu.Item>;
        });
    };

    renderMenu2 = (data,key='')=>{
        return data.map((item)=>{
            if(item.children){
                return (
                    <SubMenu key={key+item.key} title='item.title'>
                        {this.renderMenu2(item.children,key+item.key)}
                    </SubMenu>
                )
            }
            return 
                <Menu.Item key={key+item.key} name={item.title}>
                <Link to={key+item.key}>{item.title}</Link>
                </Menu.Item>
            
        })
    }

    render = () => {
        return (
            <div>
                <Menu
                    // theme='dark'
                    onClick={this.handleClick}
                    className="left-nav"
                    mode="inline" // vertical  
                    selectedKeys={[this.state.currentKey]}
                >
                    {this.state.menuTreeNode}
                </Menu>
            </div>
        )
    }
}