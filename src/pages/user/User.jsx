import React, { useState, useEffect } from 'react'
import {  
  Card,
  Button,
  Table,
  Modal
} from 'antd'
import { formateDate } from './../../utils/dataUtils'
import LinkButton from './../../components/linkButton/LinkButton'
import { reqUsers } from './../../api/index'


/* 用户管理路由 */
export default function User() {
  const [users, setUsers] = useState([])
  const [isShow, setIsShow] = useState(false)
  const [roles, setRoles] = useState([])

  const addOrUpdateUser = () => {
    
  }

  const getUsers = async () => {
    const result = await reqUsers()
    if(result.status === 0) {
      const { users, roles } = result.data
      setUsers(users)
      setRoles(roles)
    }
  }

  useEffect(() => {
    getUsers()
  }, [])

  const title = (
    <Button type='primary'>创建用户</Button>
  )
  const columns = [
    {
      title: '用户名',
      dataIndex: 'username'
    },
    {
      title: '邮箱',
      dataIndex: 'email'
    },
    {
      title: '电话',
      dataIndex: 'phone'
    },
    {
      title: '注册时间',
      dataIndex: 'create_time',
      render: formateDate
    },
    {
      title: '所属角色',
      dataIndex: 'role_id',
      render: (role_id) => (roles.find(role => role_id === role._id) || {}).name
      // 从roles中查找与用户中role_id属性相等的role,并取出name属性
    },
    {
      title: '操作',
      render: (user) => (
        <span>
          <LinkButton>修改</LinkButton>
          <LinkButton>删除</LinkButton>
        </span>
      ) 
    },
  ]
  return (
    <Card title={title}>
      <Table
        bordered
        rowKey='_id'
        dataSource={users}
        columns={columns}
        pagination={{defaultPageSize: 5, showQuickJumper: true}}
        >  
        <Modal
          title='添加用户'
          visible={isShow}
          onOk={addOrUpdateUser}
          onCancel={() => setIsShow(false)}
          >
            <div>添加/更新界面</div>
        </Modal>
      </Table>
    </Card>
  )
}
