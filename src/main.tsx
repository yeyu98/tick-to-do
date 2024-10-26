/*
 * @Author: yeyu98
 * @Date: 2024-09-12 10:35:05
 * @LastEditors: yeyu98
 * @LastEditTime: 2024-10-26 14:52:26
 * @FilePath: \tick-to-do\src\main.tsx
 * @Description:
 */
import ReactDOM from 'react-dom/client'
import router from '@/router/index'
import { ConfigProvider } from 'antd'
import { RouterProvider } from 'react-router'
import dayjs from 'dayjs'
import locale from 'antd/locale/zh_CN'
import theme from './themeConfig'
import './index.less'
import 'dayjs/locale/zh-cn'

const rootElement = document.getElementById('root') as HTMLElement
const root = ReactDOM.createRoot(rootElement)
dayjs.locale('zh-cn')

const ConfigApp: React.FC = () => (
  <ConfigProvider theme={theme} locale={locale}>
    <RouterProvider router={router} />
  </ConfigProvider>
)

root.render(<ConfigApp />)
