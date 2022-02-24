import React, { Component } from 'react'
import { Menu } from 'antd'
import { Link } from 'react-router-dom'
import withRouter from '../../utils/withRouter'
import menuList from './../../config/menuConfig'
import logo from '../../assets/logo.png'
import './leftNav.less'

const { SubMenu } = Menu

class LeftNav extends Component {
    constructor(props){
        super(props)

        this.menuNodes = this.getMenuNodes(menuList)
    }
    // 根据menu的数据数组生成对应的标签数组
    // 使用map() + 递归调用
    getMenuNodes = (menuList) => {
        const path = this.props.router.location.pathname
        return menuList.map(           
            (item) => {
                if(!item.children){
                    return (
                        <Menu.Item key={item.key}>
                            <Link to={item.key}>
                                {item.icon}
                                <span>{item.title}</span>
                            </Link>
                        </Menu.Item>
                    )
                } else {
                    // 查找一个与当前请求路径匹配的子Item
                    const cItem = item.children.find(cItem => path.indexOf(cItem.key) === 0)
                    // 如果存在，说明当前item的子列表需要打开

                    if(cItem){
                        this.openKey = item.key
                    }
                    return (
                        <SubMenu key={item.key} 
                                icon={item.icon} 
                                title={item.title}>
                            {/* 递归调用生成动态列表 */}
                            {this.getMenuNodes(item.children)}
                        </SubMenu>
                    )
                }
            }
        )  
    }
    render() {
        // 得到当前请求的路由路径
        let path = this.props.router.location.pathname
        if(path.indexOf('/product') === 0) { // 当前请求的是商品或其子路由界面
            path = '/product'

        }

        // 得到需要打开菜单项的key
        const openKey = this.openKey

        return (
            <div className='leftNav'>
                <header className='leftNav-header'>
                    <img src={logo} alt="" />
                    <h1>后台</h1>
                </header>
                <Menu
                    selectedKeys={[path]}
                    defaultOpenKeys={[openKey]}
                    mode="inline"
                    theme="dark"
                    >
                    {
                        // this.getMenuNodes(menuList)
                        this.menuNodes
                    }                    
                </Menu>
            </div>
        )
    }
}

export default withRouter(LeftNav)


