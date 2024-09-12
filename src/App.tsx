import { useState } from 'react'
import { Layout, Menu } from 'antd'
import { Outlet, useNavigate } from 'react-router'
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  AppstoreOutlined,
  CalendarOutlined,
} from '@ant-design/icons'
import styles from './App.module.less'

const { Sider, Content, Header } = Layout

const menu = [
  {
    key: 'today',
    icon: <CalendarOutlined />,
    label: '今天',
  },
  {
    key: 'filter',
    icon: <AppstoreOutlined />,
    label: '过滤器',
  },
]

const App = () => {
  const navigate = useNavigate()

  const [collapsed, setCollapsed] = useState(false)

  const handleSelect = (item: any) => {
    navigate(`/${item.key}`)
  }

  return (
    <>
      <Layout>
        <Sider
          trigger={null}
          className={styles.sider}
          theme="light"
          collapsedWidth={0}
          collapsible
          collapsed={collapsed}
        >
          <Header className={styles['sider-header']}>
            <span>To-Do-List</span>
            <MenuFoldOutlined onClick={() => setCollapsed(true)} />
          </Header>
          <Menu
            theme="light"
            mode="inline"
            defaultSelectedKeys={['today']}
            items={menu}
            onSelect={handleSelect}
          />
        </Sider>
        <Layout>
          <Header className={styles['content-header']}>
            {collapsed ? (
              <MenuUnfoldOutlined onClick={() => setCollapsed(false)} />
            ) : null}
          </Header>
          <Content className={styles.content}>
            {/* <h3>{navigation.}</h3> */}
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </>
  )
}

export default App
