import React from 'react'
import { Form, Input, Button, message } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import { useNavigate, Navigate } from 'react-router-dom'
import { reqLogin } from '../../api/index'
import memoryUtils from '../../utils/memoryUtils'
import storageUtils from '../../utils/storageUtils'

import './login.less'
import logo from '../../assets/logo.png'
/* 
登陆路由组件
 */

export default function Login() {
    const navigate = useNavigate()
    const user = memoryUtils.user
    if(user && user._id) {
       return <Navigate to='/home'/>
    }
    const onFinish = (async (values) => {
            const { username, password } = values
            const result = await reqLogin(username, password)
    
            // 提示登录成功
            if(result.status === 0){
                message.success('登录成功')
            
            // 保存user
                const user = result.data
                memoryUtils.user = user  // 保存在内存中
                storageUtils.saveUser(user) // 保存在localStorage中
    
            // 跳转到管理界面
                navigate('/home', {replace:true})

            } else {
                message.error(result.msg)
            }
    })
    return (
        <div className='login'>
            <header className='login-header'>
                <img src={ logo } alt="logo" />
                <h1>后台管理</h1>
            </header>
            <div className='login-content'>
                <h2>用户登陆</h2>
                <Form
                    name="normal_login"
                    className="login-form"
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={onFinish}
                >
                    <Form.Item
                        name="username"
                        // 声明式验证
                        rules={[
                            {
                                required: true,
                                whitespace: true,
                                message: '用户名不能为空!'
                            },
                            {
                                min: 4,
                                message: '用户名至少4位!'
                            },
                            {
                                max: 12,
                                message: '用户名至多12位!'
                            },
                            {
                                pattern: /^[a-zA-Z0-9_]+$/,
                                message: '用户名必须由数字字母下划线组成!'
                            }
                        ]}
                    >
                        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        rules={[
                            {
                                required: true,
                                whitespace: true,
                                message: '密码不能为空!'
                            },
                            {
                                min: 4,
                                message: '密码至少4位!'
                            },
                            {
                                max: 12,
                                message: '密码至多12位!'
                            }
                        ]}
                    >
                        <Input
                        prefix={<LockOutlined className="site-form-item-icon" />}
                        type="password"
                        placeholder="Password"
                        />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="login-form-button">
                            Log in
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    )
}
