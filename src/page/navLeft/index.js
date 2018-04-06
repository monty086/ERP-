"use strict"

import React from 'react'
import {Link} from 'react-router-dom'
import { Row, Col, Menu, Icon, Table ,Tabs} from 'antd'
import menuConfig from '../../contants/menuConfig'
import './index.less'
// import './index.less'
const SubMenu = Menu.SubMenu;
const TabPane = Tabs.TabPane;
const keyPath = {};
export default class NavLeft extends React.Component {
    // 菜单的点击事件
    handleClick = (e) => {
        this.setState({
            currentKey: e.key
        });
    };

    // 生成菜单树结构
    createLimitObject = (type, data, roleLimitList)=> {
        let menuKeys = type == 'platform' ? this.menuPlatformList : type == 'bike' ? this.menuBikeList : this.menuCarList || [];
        if (menuKeys && menuKeys.length == 0) {
            roleLimitList = [];
            return false;
        }
        data.forEach((item, i)=> {
            if (item.children) {
                /**
                 * menuKeys是一个数组，只能精确匹配到每一个菜单
                 * 比如：menuKeys = ['/maintenance','/maintenance/monitor/monitor_bike-btn-query']
                 * 通过indexOf搜索/maintenance/monitor 无法搜索出来。
                 * 所以还需要通过filterMenuList进行再次循环匹配
                 */
                menuKeys = menuKeys.replace(/#/g, '');
                let key = i == 0 ? item.key : '_' + item.key;
                if (menuKeys.indexOf(key) > -1) {
                    let children = [];
                    roleLimitList.push({
                        title: item.title,
                        key: item.key,
                        children: children
                    })
                    this.createLimitObject(type, item.children, children);
                }
            } else {
                if (menuKeys.indexOf(item.key) > -1) {
                    roleLimitList.push({
                        title: item.title,
                        key: item.key,
                    })
                }
            }
        })
    }

    // 生成keyList 
    getLimitKeys = (data, btnKeys, key = '')=> {
        data.forEach((item)=> {
            let parentKey = key + item.key;
            if (item.children) {
                this.getLimitKeys(item.children, btnKeys, parentKey);
            } else {
                item.btnList.forEach((btnItem)=> {
                    btnKeys.push(parentKey + '-btn-' + btnItem.key);
                });
            }
        })
    };

    componentWillMount() {

        let that = this;
        let btnKeys = [];
        let isAdmin = this.props.isAdmin;
        
        // if (isAdmin == undefined) {
        //     return false;
        // }
        // isAdmin = 1;
        // 0：普通用户、1：管理员
        if (isAdmin == 1) {
            // 直接将menuBikeConfig当做完整的菜单树
            that.menuConfig = menuConfig;

            //根据结构生成keyList，每个页面需要根据btnKeys来进行按钮权限判断
            that.getLimitKeys(menuConfig, btnKeys);

            // 系统管理员直接将车辆详情的按钮权限分配进去
            // btnKeys = btnKeys.concat(commonBikeBtnList.map((item)=>(item.key)));

        } else if (isAdmin == 0) {
            // 生成的树结构菜单会保存到rolePermissionList里面去
            // that.rolePermissionList = [];
            // that.rolePermissionListCar = [];
            that.rolePermissionListPlatform = [];

            // 接口把平台、电单车、汽车三套菜单一起进行返回，此处通过关键字进行筛选过滤，后期希望做成动态的
            let menuList = this.props.menuList;

            this.menuList = menuList;//全局保存，上面构建树结构需要使用

            let i = menuList.indexOf('platform') == -1 ? 0 : menuList.indexOf('platform');
            // let j = menuList.indexOf('car') == -1 ? menuList.length : menuList.indexOf('car');
            this.menuPlatformList = menuList.slice(0, i).join('_');
            // this.menuBikeList = menuList.slice(i, j).join('_');
            // this.menuCarList = menuList.slice(j).join('_');
            // to-do 接口需要返回3个字段，分别对应平台、电单车、汽车的菜单数据
            that.createLimitObject('platform', menuPlatformConfig, that.rolePermissionListPlatform);
            // that.createLimitObject('bike', menuBikeConfig, that.rolePermissionList);
            // that.createLimitObject('car', menuCarConfig, that.rolePermissionListCar);
            btnKeys = menuList.filter((item)=> {
                return item.indexOf('btn') > -1;
            })
        }

        btnKeys = JSON.parse(JSON.stringify(btnKeys).replace(/#/g, ''));//替换老数据


        // Store.save('btnKeys', btnKeys);
        // Store.save('bikeDetailBtnKeys', commonBikeBtnList.map((item)=>(item.key)));

        // 遍历菜单，生成TreeNode对象 ,菜单工厂的入口
        const menuTreeNode = that.renderMenu(that.menuConfig);
        // 获取当前页面对应的菜单路由Hash值
        let _key = window.location.hash.replace(/#|\?[^\?]*$/g, '');

        // 将最终遍历的openKey保存到state中，Menu组件将根据此openKeys进行设置当前打开的菜单
        that.setState({
            currentKey: _key,
            menuTreeNode,//电单车
            // menuCarTreeNode,//汽车
            // menuPlatformTreeNode//平台
        })
    }

    tabClick = (activeKey) => {
        this.setState({
            activeKey: activeKey
        });
        // window.sessionStorage.setItem("menuTabKey", activeKey);
    };

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