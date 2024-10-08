/*
 * @Author: yeyu98
 * @Date: 2024-09-12 16:14:27
 * @LastEditors: yeyu98
 * @LastEditTime: 2024-09-12 22:49:42
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
          title: '过滤器',
        },
      },
    ],
  },
]

export default createBrowserRouter(baseRoute)
