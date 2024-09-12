/*
 * @Author: yeyu98
 * @Date: 2024-09-12 16:14:27
 * @LastEditors: yeyu98
 * @LastEditTime: 2024-09-12 21:33:13
 * @FilePath: \tick-to-do\src\router\index.tsx
 * @Description:
 */
import { lazy, Suspense } from 'react'
import FullScreenLoading from '@/components/FullScreenLoading'
import { createBrowserRouter, Navigate } from 'react-router-dom'

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

const baseRoute = [
  {
    element: SuspenseComponent(App),
    children: [
      {
        path: '/',
        element: <Navigate to="/today" />,
        children: [
          {
            path: 'today',
            element: SuspenseComponent(Today),
            meta: {
              title: '今天',
            },
          },
          {
            path: 'filter',
            element: SuspenseComponent(Filter),
            meta: {
              title: '过滤器',
            },
          },
        ],
      },
    ],
  },
]

export default createBrowserRouter(baseRoute)
