/*
 * @Author: yeyu98
 * @Date: 2024-09-12 16:14:27
 * @LastEditors: yeyu98
 * @LastEditTime: 2024-09-12 17:04:04
 * @FilePath: \tick-to-do\src\router\index.tsx
 * @Description:
 */
import { Children, lazy, Suspense } from 'react'
import FullScreenLoading from '@/components/FullScreenLoading'
import { createBrowserRouter, redirect } from 'react-router-dom'

const SuspenseComponent = (
  Component: React.LazyExoticComponent<() => JSX.Element>,
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
    path: '/',
    element: SuspenseComponent(App),
    redirect: '/today',
    children: [
      {
        path: 'today',
        element: SuspenseComponent(Today),
      },
      {
        path: 'filter',
        element: SuspenseComponent(Filter),
      },
    ],
  },
]

export default createBrowserRouter(baseRoute)
