import { useState } from 'react'
import { Layout, Menu } from 'antd'
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
    key: '1',
    icon: <CalendarOutlined />,
    label: '今天',
  },
  {
    key: '2',
    icon: <AppstoreOutlined />,
    label: '过滤器',
  },
]
const App = () => {
  const [collapsed, setCollapsed] = useState(false)

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
            defaultSelectedKeys={['1']}
            items={menu}
          />
        </Sider>
        <Layout>
          <Header className={styles['content-header']}>
            {collapsed ? (
              <MenuUnfoldOutlined onClick={() => setCollapsed(false)} />
            ) : null}
          </Header>
          <Content className={styles.content}></Content>
        </Layout>
      </Layout>
    </>
  )
}

export default App
