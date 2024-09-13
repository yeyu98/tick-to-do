import { useMemo, useState } from 'react'
import { Layout, Menu } from 'antd'
import { Outlet, useNavigate, useLocation } from 'react-router'
import useCurrentMatch from './hooks/useCurrentMatch'

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
  const { pathname } = useLocation()
  const [collapsed, setCollapsed] = useState(false)
  const { getCurrentHandle } = useCurrentMatch<unknown, { title: string }>()
  const title = getCurrentHandle()?.title

  const currentRoute = useMemo(
    () => (pathname ? pathname.replace(/\//, '') : ''),
    [pathname],
  )

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
            defaultSelectedKeys={[currentRoute || 'today']}
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
            <h1>{title}</h1>
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </>
  )
}

export default App
