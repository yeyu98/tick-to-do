/*
 * @Author: yeyu98
 * @Date: 2024-09-12 10:35:05
 * @LastEditors: yeyu98
 * @LastEditTime: 2024-09-12 16:19:14
 * @FilePath: \tick-to-do\src\main.tsx
 * @Description:
 */
import ReactDOM from 'react-dom/client'
import router from '@/router/index'
import { ConfigProvider } from 'antd'
import { RouterProvider } from 'react-router'
import theme from './themeConfig'
import './index.less'

const rootElement = document.getElementById('root') as HTMLElement
const root = ReactDOM.createRoot(rootElement)

const ConfigApp: React.FC = () => (
  <ConfigProvider theme={theme}>
    <RouterProvider router={router} />
  </ConfigProvider>
)

root.render(<ConfigApp />)
