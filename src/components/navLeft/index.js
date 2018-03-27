import React from 'react'
import {Link} from 'react-router'
import './index.less'
import {Menu} from 'antd'
import menuConfig from '../../constants/menuConfig'
const SubMenu = Menu.SubMenu

export default class NavLeft extends React.Component{

    componentWillMount () {
        this.setState({
            menuTreeNode:this.renderMenu(menuConfig)
        })
        
    }

    homeHandleClick = ()=> {

    };

    renderMenu = (data) => {
        return data.map((item) => {
            if (item.children) {
                return (
                    <SubMenu title={item.title} key={item.key}>
                        {this.renderMenu(item.children)}
                    </SubMenu>
                );
            }
            return <Menu.Item key={item.key} name={item.title}>{item.title}</Menu.Item>;
        });
    };

    render (){
        return (
            <div>
                <Link to="/home" onClick={this.homeHandleClick}>
                    <div className="logo">
                        松果大管家
                        {/* <img src="./logo-black.png" alt=""/> */}
                    </div>
                </Link>
                <Menu
                    // onClick={this.handleClick}
                    className="left-nav"
                    // openKeys={this.state.openKeys}
                    // onOpenChange={this.onOpenChange}
                    mode="inline"
                    theme='dark'
                    // selectedKeys={[this.state.currentKey]}
                    inlineIndent='20'
                >
                    { this.state.menuTreeNode }
                </Menu>
            </div>   
        )
    }
}