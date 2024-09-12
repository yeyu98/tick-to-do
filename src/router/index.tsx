/*
 * @Author: yeyu98
 * @Date: 2024-09-12 16:14:27
 * @LastEditors: yeyu98
 * @LastEditTime: 2024-09-12 22:27:00
 * @FilePath: \tick-to-do\src\router\index.tsx
 * @Description:
 */
import { lazy, Suspense } from 'react'
import FullScreenLoading from '@/components/FullScreenLoading'
import { createBrowserRouter, Navigate } from 'react-router-dom'
import type { RouteObject } from 'react-router-dom'

const SuspenseComponent = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Component: React.LazyExoticComponent<(props?: any) => JSX.Element>,
) => {
  return (
    <Suspense fallback={<FullScreenLoading immediatelyTrigger={true} />}>
      <Component />
    </Suspense>
  )
}

const App = lazy(() => import('@/App'))
const Today = lazy(() => import('@/pages/Today/Today'))
const Filter = lazy(() => import('@/pages/Filter/Filter'))
// 如果动态配置title或者一些自定义的参数呢，类似vue-router中的meta
// 通过在配置的时候在组件的props里传入
// 通过react-router里的handle，传入之后通过useMatches来获取，只能在createBrowserRouter中使用
const baseRoute: RouteObject[] = [
  {
    path: '/',
    element: SuspenseComponent(App),
    children: [
      {
        index: true, // 默认重定向
        element: <Navigate to={'/today'} />,
      },
      {
        path: 'today',
        element: SuspenseComponent(Today),
        handle: {
          title: '今天',
        },
      },
      {
        path: 'filter',
        element: SuspenseComponent(Filter),
        handle: {
          title: '今天',
        },
      },
    ],
  },
]

export default createBrowserRouter(baseRoute)
